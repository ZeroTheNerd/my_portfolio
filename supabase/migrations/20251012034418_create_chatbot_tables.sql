/*
  # Create Chatbot Tables

  1. New Tables
    - `chat_sessions`
      - `id` (uuid, primary key)
      - `session_id` (text, unique) - Browser session identifier
      - `created_at` (timestamptz)
      - `last_message_at` (timestamptz)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key to chat_sessions)
      - `role` (text) - 'user' or 'assistant'
      - `content` (text) - Message content
      - `created_at` (timestamptz)
    
    - `contact_leads`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `name` (text)
      - `notes` (text)
      - `session_id` (uuid, foreign key to chat_sessions)
      - `created_at` (timestamptz)
    
    - `unknown_questions`
      - `id` (uuid, primary key)
      - `question` (text, not null)
      - `session_id` (uuid, foreign key to chat_sessions)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read/write access for chat functionality (no auth required for website visitors)

  3. Notes
    - Chat sessions track visitor conversations
    - Contact leads capture interested visitors' information
    - Unknown questions help improve the chatbot
*/

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text DEFAULT '',
  notes text DEFAULT '',
  session_id uuid REFERENCES chat_sessions(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS unknown_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  session_id uuid REFERENCES chat_sessions(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE unknown_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create chat sessions"
  ON chat_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read chat sessions"
  ON chat_sessions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to update chat sessions"
  ON chat_sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to create messages"
  ON chat_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read messages"
  ON chat_messages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to create leads"
  ON contact_leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to create unknown questions"
  ON unknown_questions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);
