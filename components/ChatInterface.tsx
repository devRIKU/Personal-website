import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageSquare } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hey! I'm Sanniva's AI twin. Ask me anything about her projects, grades, or random rocket facts!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Convert internal message format to Gemini history format
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(history, userMsg.text);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[90vw] bg-white border-4 border-black shadow-neo-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-neo-yellow border-b-4 border-black p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-editorial font-bold text-lg">Chat with Sanniva AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white p-1 border-2 border-transparent hover:border-black transition-all rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4 font-grotesk text-sm"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`max-w-[85%] p-3 border-2 border-black shadow-neo-sm ${
                  msg.role === 'user' 
                    ? 'self-end bg-neo-blue text-black rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                    : 'self-start bg-white text-black rounded-tr-lg rounded-bl-lg rounded-br-lg'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="self-start bg-white p-3 border-2 border-black shadow-neo-sm rounded-tr-lg rounded-bl-lg rounded-br-lg">
                <span className="animate-pulse">Typing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t-4 border-black flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
              className="flex-1 font-ui border-2 border-black p-2 focus:outline-none focus:bg-neo-yellow transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="bg-black text-white p-2 border-2 border-black hover:bg-white hover:text-black active:shadow-none shadow-neo-sm transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 border-4 border-black shadow-neo-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${isOpen ? 'bg-neo-pink text-white' : 'bg-neo-yellow text-black'}`}
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </button>
    </div>
  );
};

export default ChatInterface;