import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Palette, Users, Leaf, Gamepad2, Waves,
  ArrowRight, Heart, TrendingUp, MapPin, Clock, Star
} from 'lucide-react';

interface UserStory {
  id: string;
  name: string;
  business: string;
  location: string;
  story: string;
  achievement: string;
  tokenSymbol: string;
  holders: number;
  impact: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  gradient: string;
  category: string;
}

const userStories: UserStory[] = [
  {
    id: '1',
    name: 'Maria Santos',
    business: 'Brew & Bloom Café',
    location: 'Portland, Oregon',
    story: 'Maria transformed her small neighborhood café into a thriving community hub by launching the BBC token. Customers now earn tokens for every visit, creating loyalty like never before. The token powers local events, supports community gardens, and helps fund art installations.',
    achievement: 'Increased customer retention by 340% and funded 5 community projects',
    tokenSymbol: 'BBC',
    holders: 1250,
    impact: 'Community Garden Program',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    gradient: 'from-amber-400 to-orange-500',
    category: 'Local Business'
  },
  {
    id: '2',
    name: 'Maya Patel',
    business: 'Maya\'s Art Studio',
    location: 'Brooklyn, New York',
    story: 'As a digital artist, Maya wanted to build a sustainable community around her art. The MAS token connects collectors, provides early access to new pieces, and funds collaborative projects with other artists. Token holders vote on upcoming themes and get exclusive NFT drops.',
    achievement: 'Built a 890-member artist collective and sold $180K in digital art',
    tokenSymbol: 'MAS',
    holders: 890,
    impact: 'Artist Support Network',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
    gradient: 'from-purple-400 to-pink-500',
    category: 'Creative Arts'
  },
  {
    id: '3',
    name: 'Jake Rodriguez',
    business: 'Sunset Skate Community',
    location: 'Venice Beach, California',
    story: 'Jake united local skateboarders through the SSC token, creating a decentralized skate community. Members earn tokens for organizing events, teaching newcomers, and maintaining skate spots. The community now funds equipment for kids and organizes competitions.',
    achievement: 'Organized 25+ events and provided free equipment to 200+ young skaters',
    tokenSymbol: 'SSC',
    holders: 650,
    impact: 'Youth Skateboarding Program',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    gradient: 'from-blue-400 to-cyan-500',
    category: 'Community Sports'
  },
  {
    id: '4',
    name: 'Emma Chen',
    business: 'The Greenhouse Collective',
    location: 'Seattle, Washington',
    story: 'Emma\'s urban gardening initiative bloomed into a city-wide movement with the TGC token. Members earn tokens for participating in community gardens, sharing growing tips, and hosting workshops. The token funds seed libraries and sustainable farming equipment.',
    achievement: 'Established 12 community gardens and taught 500+ people urban farming',
    tokenSymbol: 'TGC',
    holders: 1580,
    impact: 'Sustainable Food Initiative',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    gradient: 'from-green-400 to-emerald-500',
    category: 'Environmental'
  },
  {
    id: '5',
    name: 'Alex Kim',
    business: 'Neon Nights Gaming',
    location: 'Austin, Texas',
    story: 'Alex transformed his gaming café into an esports hub using the NNG token. Players earn tokens for tournament participation, streaming, and mentoring. The community funds gaming equipment, sponsors local tournaments, and supports indie game developers.',
    achievement: 'Hosted 50+ tournaments and supported 15 indie game projects',
    tokenSymbol: 'NNG',
    holders: 2100,
    impact: 'Indie Game Development Fund',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
    gradient: 'from-indigo-400 to-purple-500',
    category: 'Gaming & Esports'
  },
  {
    id: '6',
    name: 'Sofia Martinez',
    business: 'Coastal Cleanup Crew',
    location: 'San Diego, California',
    story: 'Sofia mobilized ocean lovers through the CCC token to protect coastal waters. Volunteers earn tokens for beach cleanups, data collection, and education programs. The token funds cleanup equipment, marine research, and plastic reduction initiatives.',
    achievement: 'Removed 15,000 lbs of ocean debris and educated 2,000+ people',
    tokenSymbol: 'CCC',
    holders: 780,
    impact: 'Ocean Conservation Program',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    gradient: 'from-cyan-400 to-blue-500',
    category: 'Environmental'
  }
];

const StoryCard: React.FC<{ story: UserStory; index: number; isActive: boolean; onClick: () => void }> = ({ 
  story, index, isActive, onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-105' : 'hover:scale-102'
      }`}
      onClick={onClick}
    >
      <Card className={`glassmorphism-strong border-white/20 hover:border-white/40 overflow-hidden ${
        isActive ? 'ring-2 ring-white/30' : ''
      }`}>
        <div className="relative">
          <img 
            src={story.image} 
            alt={story.business}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`bg-gradient-to-r ${story.gradient} text-white border-0`}>
              <story.icon className="w-3 h-3 mr-1" />
              {story.category}
            </Badge>
          </div>

          {/* Location */}
          <div className="absolute top-3 right-3">
            <div className="glassmorphism-strong rounded-full px-3 py-1 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300">{story.location}</span>
            </div>
          </div>

          {/* Name & Business */}
          <div className="absolute bottom-3 left-3">
            <h3 className="text-lg font-bold text-white">{story.name}</h3>
            <p className="text-sm text-gray-200">{story.business}</p>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="glassmorphism-subtle rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">{story.holders.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Token Holders</div>
            </div>
            <div className="glassmorphism-subtle rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-white">${story.tokenSymbol}</div>
              <div className="text-xs text-gray-400">Community Token</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-300">{story.impact}</span>
            </div>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
              isActive ? 'text-white translate-x-1' : 'text-gray-400'
            }`} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DetailedStoryView: React.FC<{ story: UserStory }> = ({ story }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism-strong rounded-2xl p-8 border border-white/20"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${story.gradient} shadow-lg`}>
              <story.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{story.name}</h3>
              <p className="text-gray-300">{story.business}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              {story.story}
            </p>

            <div className="glassmorphism-subtle rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">Achievement</span>
              </div>
              <p className="text-green-300 font-medium">{story.achievement}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{story.holders.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">${story.tokenSymbol}</div>
                  <div className="text-xs text-gray-400">Token Symbol</div>
                </div>
              </div>
              
              <Button className={`neo-brutal bg-gradient-to-r ${story.gradient} hover:scale-105 transition-transform`}>
                <Star className="w-4 h-4 mr-2" />
                View Token
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={story.image} 
              alt={story.business}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Floating metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-4 -right-4 glassmorphism-strong rounded-xl p-4"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${story.gradient} animate-pulse`} />
              <span className="text-sm text-white font-medium">{story.impact}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const UserJourneyStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % userStories.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Stories.
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent ml-3">
              Real Impact.
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the entrepreneurs, artists, and community leaders who transformed 
            their passions into thriving token-powered ecosystems.
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {userStories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              isActive={activeStory === index}
              onClick={() => {
                setActiveStory(index);
                setAutoPlay(false);
                setTimeout(() => setAutoPlay(true), 15000);
              }}
            />
          ))}
        </div>

        {/* Detailed Story View */}
        <AnimatePresence mode="wait">
          <motion.div key={activeStory}>
            <DetailedStoryView story={userStories[activeStory]} />
          </motion.div>
        </AnimatePresence>

        {/* Story Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <div className="glassmorphism-strong rounded-full p-2 flex space-x-1">
            {userStories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveStory(index);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 15000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStory === index
                    ? 'bg-white scale-125'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Auto-advancing stories</span>
            <div className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
          </div>
        </div>
      </div>
    </section>
  );
};