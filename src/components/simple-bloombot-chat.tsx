import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Lightbulb, TrendingUp, Users, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const presetPrompts = [
  { icon: Lightbulb, text: "Help me name my token", category: "Creative" },
  { icon: TrendingUp, text: "What makes a token successful?", category: "Strategy" },
  { icon: Users, text: "How do I build a community?", category: "Community" },
  { icon: Zap, text: "Launch timeline suggestions", category: "Planning" }
];

const responses = {
  "Help me name my token": "Great question! For a memorable token name, consider your community's values and mission. Think about words that represent growth, connection, or your specific niche. For example: 'BloomCoin' for growth, 'ConnectToken' for community, or '[YourBrand]Coin' for recognition.",
  "What makes a token successful?": "Successful tokens have: 1) Strong community engagement, 2) Clear utility and purpose, 3) Transparent team and roadmap, 4) Regular updates and development, 5) Fair tokenomics and distribution. Focus on solving real problems for your community!",
  "How do I build a community?": "Building community takes time and authenticity: 1) Start with social media (Twitter, Discord), 2) Share your journey regularly, 3) Engage with your audience daily, 4) Create valuable content, 5) Host events and AMAs, 6) Reward early supporters.",
  "Launch timeline suggestions": "Typical launch timeline: Week 1-2: Finalize concept and team, Week 3-4: Build community and social presence, Week 5-6: Create token and test platform, Week 7-8: Marketing push and launch preparation, Week 9: Go live! Remember, community building should start early."
};

export function BloomBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addMessage = (content: string, isBot: boolean = false) => {
    const message: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      content,
      isBot,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const handlePresetClick = (prompt: string) => {
    addMessage(prompt, false);
    setTimeout(() => {
      const response = responses[prompt as keyof typeof responses] || 
        "That's a great question! I'd recommend discussing this with the Bloompad community or checking our documentation for more specific guidance.";
      addMessage(response, true);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, false);
    setInputValue('');
    
    setTimeout(() => {
      addMessage("Thanks for your question! I'm here to help with token creation, community building, and launch strategies. Feel free to use the preset prompts for common guidance!", true);
    }, 500);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] shadow-lg hover:scale-105 transition-transform z-50"
      >
        <MessageCircle size={24} />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900/95 border-gray-700 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-full flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">BloomBot</h3>
            <p className="text-xs text-gray-400">Token Launch Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Hi! I'm BloomBot. I can help you with token creation and launch strategies.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Preset Prompts */}
      {messages.length === 0 && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Quick suggestions:</p>
          <div className="grid grid-cols-2 gap-2">
            {presetPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(prompt.text)}
                className="text-xs h-auto p-2 border-gray-600 hover:border-[var(--electric)] hover:bg-gray-800 flex items-center space-x-1"
              >
                <prompt.icon size={12} />
                <span className="truncate">{prompt.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about tokens, community building..."
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button type="submit" size="sm" className="bg-[var(--electric)] hover:bg-[var(--electric)]/80">
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
}