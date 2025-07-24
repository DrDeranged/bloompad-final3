import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendChatMessage } from '@/lib/openai';
import { Bot, X, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export function BloomBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: (message: string) => sendChatMessage(message, sessionId),
    onSuccess: (data) => {
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        content: data.response,
        isBot: true,
        timestamp: new Date(),
        suggestions: data.suggestions,
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        content: "I'm having trouble right now. Please try again!",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Hi! I'm BloomBot 🤖 I can help you brainstorm token names, write descriptions, and plan your token launch strategy. What would you like to create?",
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          "Help me name my token",
          "Write a Twitter pitch for my brand",
          "Suggest community perks",
          "Create a token description"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div id="bloombot-chat" className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-96 glassmorphism rounded-xl border border-gray-700 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-[var(--electric)]" size={16} />
                </div>
                <span className="font-semibold">BloomBot</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 p-1"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-[var(--dark-secondary)] overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg p-3 max-w-xs ${message.isBot ? 'bg-gray-700' : 'bg-[var(--electric)]'}`}>
                  <p className="text-sm">{message.content}</p>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-400">Suggestions:</p>
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block text-xs bg-gray-600 hover:bg-gray-500 rounded px-2 py-1 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask BloomBot anything..."
                className="flex-1 bg-gray-800 border-gray-700 text-sm focus:border-[var(--electric)]"
                disabled={chatMutation.isPending}
              />
              <Button 
                type="submit"
                className="bg-[var(--electric)] hover:opacity-90 transition-opacity px-4 py-2"
                disabled={chatMutation.isPending || !inputValue.trim()}
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
      >
        <Bot className="text-white" size={20} />
      </Button>
    </div>
  );
}
