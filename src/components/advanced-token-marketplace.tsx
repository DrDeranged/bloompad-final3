import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Star, Zap, Users, DollarSign, 
  Filter, Search, BarChart3, Activity, Shield, Globe, 
  Clock, CheckCircle, AlertTriangle, Flag, ThumbsUp, Award
} from 'lucide-react';

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  description: string;
  category: string;
  security: 'A+' | 'A' | 'B+' | 'B';
  image: string;
  verified: boolean;
  trending: boolean;
  apy?: number;
  lockPeriod: string;
  daoVerified: boolean;
  communityRating: number;
  flagCount: number;
  companyType: 'real' | 'community' | 'unverified';
}

const mockTokens: TokenData[] = [
  {
    id: '1',
    name: 'Brew & Bloom Café',
    symbol: 'BBC',
    price: 2.45,
    change24h: 12.8,
    marketCap: 450000,
    volume24h: 85000,
    holders: 1250,
    description: 'Community-driven café loyalty and rewards token',
    category: 'Community',
    security: 'A+',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    verified: true,
    trending: true,
    apy: 8.5,
    lockPeriod: '3 months',
    daoVerified: true,
    communityRating: 4.8,
    flagCount: 0,
    companyType: 'real'
  },
  {
    id: '2',
    name: 'Maya\'s Art Studio',
    symbol: 'MAS',
    price: 1.89,
    change24h: -3.2,
    marketCap: 320000,
    volume24h: 42000,
    holders: 890,
    description: 'Digital art collective and NFT marketplace token',
    category: 'Art',
    security: 'A',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    verified: true,
    trending: false,
    apy: 6.2,
    lockPeriod: '3 months',
    daoVerified: true,
    communityRating: 4.6,
    flagCount: 0,
    companyType: 'real'
  },
  {
    id: '3',
    name: 'Sunset Skate Community',
    symbol: 'SSC',
    price: 0.95,
    change24h: 25.4,
    marketCap: 180000,
    volume24h: 28000,
    holders: 650,
    description: 'Skateboarding community and event coordination',
    category: 'Sports',
    security: 'A+',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    verified: false,
    trending: true,
    apy: 12.3,
    lockPeriod: '3 months',
    daoVerified: false,
    communityRating: 4.2,
    flagCount: 1,
    companyType: 'community'
  },
  {
    id: '4',
    name: 'The Greenhouse Collective',
    symbol: 'TGC',
    price: 3.21,
    change24h: 8.7,
    marketCap: 680000,
    volume24h: 95000,
    holders: 1580,
    description: 'Urban gardening and sustainable living community',
    category: 'Environmental',
    security: 'A+',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    verified: true,
    trending: false,
    apy: 7.8,
    lockPeriod: '3 months',
    daoVerified: true,
    communityRating: 4.9,
    flagCount: 0,
    companyType: 'real'
  },
  {
    id: '5',
    name: 'Neon Nights Gaming',
    symbol: 'NNG',
    price: 4.56,
    change24h: -8.1,
    marketCap: 950000,
    volume24h: 125000,
    holders: 2100,
    description: 'Gaming guild and esports tournament platform',
    category: 'Gaming',
    security: 'A',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    verified: true,
    trending: false,
    apy: 15.2,
    lockPeriod: '3 months',
    daoVerified: false,
    communityRating: 3.8,
    flagCount: 2,
    companyType: 'unverified'
  },
  {
    id: '6',
    name: 'Coastal Cleanup Crew',
    symbol: 'CCC',
    price: 1.67,
    change24h: 18.9,
    marketCap: 240000,
    volume24h: 38000,
    holders: 780,
    description: 'Ocean conservation and beach cleanup initiatives',
    category: 'Environmental',
    security: 'A+',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    verified: true,
    trending: true,
    apy: 9.4,
    lockPeriod: '3 months',
    daoVerified: true,
    communityRating: 4.7,
    flagCount: 0,
    companyType: 'real'
  }
];

const categories = ['All', 'Community', 'Art', 'Sports', 'Environmental', 'Gaming'];

const TokenCard: React.FC<{ token: TokenData; index: number }> = ({ token, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="glassmorphism-strong border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img 
            src={token.image} 
            alt={token.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {token.verified && (
              <Badge className="bg-green-500/90 text-white border-0 backdrop-blur-sm">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {token.trending && (
              <Badge className="bg-orange-500/90 text-white border-0 backdrop-blur-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>

          {/* Security Score */}
          <div className="absolute top-3 right-3">
            <div className="glassmorphism-strong rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{token.security}</span>
            </div>
          </div>

          {/* Price Change Indicator */}
          <div className="absolute bottom-3 right-3">
            <div className={`glassmorphism-strong rounded-full px-3 py-1 flex items-center space-x-1 ${
              token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {token.change24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-bold">
                {Math.abs(token.change24h).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{token.name}</h3>
              <p className="text-sm text-gray-400">${token.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">${token.price}</p>
              <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                {token.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {token.description}
          </p>

          {/* Advanced Metrics */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
            <div className="glassmorphism-subtle rounded-lg p-2 sm:p-3">
              <div className="flex items-center space-x-2 mb-1">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Market Cap</span>
              </div>
              <p className="text-sm font-semibold text-white">
                ${formatNumber(token.marketCap)}
              </p>
            </div>

            <div className="glassmorphism-subtle rounded-lg p-2 sm:p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">24h Volume</span>
              </div>
              <p className="text-sm font-semibold text-white">
                ${formatNumber(token.volume24h)}
              </p>
            </div>

            <div className="glassmorphism-subtle rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Holders</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {formatNumber(token.holders)}
              </p>
            </div>
            
            {/* Safety Features Row */}
            <div className="glassmorphism-subtle rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Lock Period</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {token.lockPeriod}
              </p>
            </div>

            <div className="glassmorphism-subtle rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-400">Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-white">
                  {token.communityRating.toFixed(1)}
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(token.communityRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glassmorphism-subtle rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-400">APY</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {token.apy?.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Company Verification Status */}
          <div className="mb-4">
            <div className={`glassmorphism-subtle rounded-lg p-3 border-l-4 ${
              token.companyType === 'real' ? 'border-green-500' :
              token.companyType === 'community' ? 'border-blue-500' : 'border-yellow-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {token.daoVerified ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {token.companyType === 'real' ? 'Verified Company' :
                     token.companyType === 'community' ? 'Community Project' : 'Unverified'}
                  </span>
                  {token.daoVerified && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      DAO Verified
                    </Badge>
                  )}
                </div>
                {token.flagCount > 0 && (
                  <div className="flex items-center space-x-1 text-red-400">
                    <Flag className="w-3 h-3" />
                    <span className="text-xs">{token.flagCount} flags</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              className="flex-1 neo-brutal bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm"
              onClick={() => {
                // Simulate token purchase
                const event = new CustomEvent('token-purchase', { 
                  detail: { token: token.symbol, price: token.price } 
                });
                window.dispatchEvent(event);
              }}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Buy Token
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="glassmorphism border-white/20 hover:border-white/40 text-white"
              onClick={() => {
                // Simulate rating
                const event = new CustomEvent('token-rate', { 
                  detail: { token: token.symbol } 
                });
                window.dispatchEvent(event);
              }}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="glassmorphism border-red-500/20 hover:border-red-500/40 text-red-400"
              onClick={() => {
                // Simulate flagging
                const event = new CustomEvent('token-flag', { 
                  detail: { token: token.symbol } 
                });
                window.dispatchEvent(event);
              }}
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hover Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const AdvancedTokenMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [filteredTokens, setFilteredTokens] = useState(mockTokens);

  useEffect(() => {
    let filtered = mockTokens;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(token => token.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(token => 
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'change24h': return b.change24h - a.change24h;
        case 'volume24h': return b.volume24h - a.volume24h;
        case 'holders': return b.holders - a.holders;
        default: return b.marketCap - a.marketCap;
      }
    });

    setFilteredTokens(filtered);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="marketplace" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            Token
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-2 sm:ml-3">
              Marketplace
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
            Discover community-driven tokens with real-time analytics, 
            security scoring, and powerful trading tools.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism-strong rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md lg:max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 sm:py-4 glassmorphism-subtle rounded-lg text-white placeholder-gray-400 border border-white/10 focus:border-white/30 focus:outline-none transition-all duration-300 text-base sm:text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category
                      ? 'neo-brutal bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'glassmorphism-subtle border-white/20 text-gray-300 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glassmorphism-subtle rounded-lg px-3 py-2 text-white border border-white/10 focus:border-white/30 focus:outline-none bg-gray-800"
              >
                <option value="marketCap" className="bg-gray-800 text-white">Market Cap</option>
                <option value="price" className="bg-gray-800 text-white">Price</option>
                <option value="change24h" className="bg-gray-800 text-white">24h Change</option>
                <option value="volume24h" className="bg-gray-800 text-white">Volume</option>
                <option value="holders" className="bg-gray-800 text-white">Holders</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Token Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredTokens.map((token, index) => (
            <TokenCard key={token.id} token={token} index={index} />
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="neo-brutal bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            onClick={() => {
              // Simulate loading more tokens
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Globe className="w-5 h-5 mr-2" />
            Explore More Tokens
          </Button>
        </motion.div>
      </div>
    </section>
  );
};