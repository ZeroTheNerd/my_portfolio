import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let storedSessionId = sessionStorage.getItem('chatSessionId');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('chatSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: "Hi! I'm Zach's AI assistant. Feel free to ask me anything about Zach's experience, skills, or projects!"
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(
        `${supabase.supabaseUrl}/functions/v1/chatbot`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabase.supabaseKey}`,
          },
          body: JSON.stringify({
            message: userMessage,
            sessionId: sessionId,
            history: history
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact Zach directly at zachmartim101@gmail.com"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat with Zach's AI</h3>
            <button
              className="chat-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.role}`}>
                <div className="message-bubble">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <form className="chat-input-form" onSubmit={sendMessage}>
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chat-send-button"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className="chat-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;
