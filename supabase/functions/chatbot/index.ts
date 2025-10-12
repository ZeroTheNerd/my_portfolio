import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const SUMMARY = `
Zach Martim is a passionate Student Software Engineer currently working on the ServiceNow platform at the University of Utah.
He is pursuing a degree in Computer Science with an expected graduation date of December 2026.
Driven by curiosity and creativity, he loves building tools, collaborating on innovative projects, and finding simple solutions.
He gets excited about tackling coding challenges, participating in hackathons, game jams, and CTF challenges.
He strives for great teamwork and collaboration, learning from others and finding motivation through peers.
Outside of coding, he enjoys hanging out with friends, listening to music, and spending time with his partner.
`;

const LINKEDIN_INFO = `
Zach Martim
Student Software Engineer at University of Utah
Salt Lake City, UT
Computer Science Student
Expected Graduation: December 2026
`;

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  message: string;
  sessionId: string;
  history?: Message[];
}

interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  };
}

const tools = [
  {
    type: "function",
    function: {
      name: "record_user_details",
      description:
        "Use this tool to record that a user is interested in being in touch and provided an email address",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "The email address of this user",
          },
          name: {
            type: "string",
            description: "The user's name, if they provided it",
          },
          notes: {
            type: "string",
            description:
              "Any additional information about the conversation that's worth recording to give context",
          },
        },
        required: ["email"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "record_unknown_question",
      description:
        "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
      parameters: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The question that couldn't be answered",
          },
        },
        required: ["question"],
      },
    },
  },
];

function getSystemPrompt(): string {
  const name = "Zach Martim";
  return `You are acting as ${name}. You are answering questions on ${name}'s website, particularly questions related to ${name}'s career, background, skills and experience. Your responsibility is to represent ${name} for interactions on the website as faithfully as possible. You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions. Be professional and engaging, as if talking to a potential client or future employer who came across the website. If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool.

## Summary:
${SUMMARY}

## LinkedIn Profile:
${LINKEDIN_INFO}

With this context, please chat with the user, always staying in character as ${name}.`;
}

async function recordUserDetails(
  email: string,
  name: string,
  notes: string,
  sessionId: string,
  supabase: any
) {
  try {
    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    await supabase.from("contact_leads").insert({
      email,
      name: name || "Name not provided",
      notes: notes || "not provided",
      session_id: session?.id || null,
    });

    console.log(`Recording ${name} with email ${email} and notes ${notes}`);
    return { recorded: "ok" };
  } catch (error) {
    console.error("Error recording user details:", error);
    return { recorded: "error" };
  }
}

async function recordUnknownQuestion(
  question: string,
  sessionId: string,
  supabase: any
) {
  try {
    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    await supabase.from("unknown_questions").insert({
      question,
      session_id: session?.id || null,
    });

    console.log(`Recording unknown question: ${question}`);
    return { recorded: "ok" };
  } catch (error) {
    console.error("Error recording unknown question:", error);
    return { recorded: "error" };
  }
}

async function handleToolCalls(
  toolCalls: ToolCall[],
  sessionId: string,
  supabase: any
) {
  const results = [];

  for (const toolCall of toolCalls) {
    const toolName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    let result;
    if (toolName === "record_user_details") {
      result = await recordUserDetails(
        args.email,
        args.name || "Name not provided",
        args.notes || "not provided",
        sessionId,
        supabase
      );
    } else if (toolName === "record_unknown_question") {
      result = await recordUnknownQuestion(args.question, sessionId, supabase);
    } else {
      result = {};
    }

    results.push({
      role: "tool",
      content: JSON.stringify(result),
      tool_call_id: toolCall.id,
    });
  }

  return results;
}

async function chat(
  message: string,
  history: Message[],
  sessionId: string,
  supabase: any
) {
  const messages = [
    { role: "system", content: getSystemPrompt() },
    ...history,
    { role: "user", content: message },
  ];

  let done = false;
  let conversationMessages = [...messages];

  while (!done) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: conversationMessages,
        tools: tools,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const choice = data.choices[0];

    if (choice.finish_reason === "tool_calls") {
      const assistantMessage = choice.message;
      const toolCalls = assistantMessage.tool_calls;
      const toolResults = await handleToolCalls(toolCalls, sessionId, supabase);

      conversationMessages.push(assistantMessage);
      conversationMessages.push(...toolResults);
    } else {
      done = true;
      return choice.message.content;
    }
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { message, sessionId, history = [] }: ChatRequest = await req.json();

    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    let dbSessionId;
    if (!session) {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({ session_id: sessionId })
        .select()
        .single();
      dbSessionId = newSession?.id;
    } else {
      dbSessionId = session.id;
      await supabase
        .from("chat_sessions")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", dbSessionId);
    }

    await supabase.from("chat_messages").insert({
      session_id: dbSessionId,
      role: "user",
      content: message,
    });

    const response = await chat(message, history, sessionId, supabase);

    await supabase.from("chat_messages").insert({
      session_id: dbSessionId,
      role: "assistant",
      content: response,
    });

    return new Response(JSON.stringify({ response }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
