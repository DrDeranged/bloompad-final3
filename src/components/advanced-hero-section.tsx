import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cpu, Database, Globe, TrendingUp, Shield, Code, Rocket, Users } from 'lucide-react';

interface TechMetric {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const techMetrics: TechMetric[] = [
  { label: 'Gas Optimization', value: '99.2%', icon: Zap, gradient: 'from-yellow-400 to-orange-500' },
  { label: 'Smart Contracts', value: '47+', icon: Code, gradient: 'from-blue-400 to-cyan-500' },
  { label: 'TPS Capacity', value: '50K+', icon: Cpu, gradient: 'from-purple-400 to-pink-500' },
  { label: 'Security Score', value: 'A+', icon: Shield, gradient: 'from-green-400 to-emerald-500' },
  { label: 'Uptime', value: '99.98%', icon: TrendingUp, gradient: 'from-red-400 to-pink-500' },
  { label: 'Networks', value: '15+', icon: Globe, gradient: 'from-indigo-400 to-purple-500' },
];

const ParticleField: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -40, -60, -40, -20],
            opacity: [0.3, 0.8, 1, 0.6, 0.3],
            scale: [0.5, 1, 1.2, 1, 0.5],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const DataStream: React.FC = () => {
  const [streams, setStreams] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    const newStreams = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"
          style={{
            width: '200px',
            top: `${10 + stream.id * 12}%`,
          }}
          animate={{
            x: [-200, window.innerWidth + 200],
          }}
          transition={{
            duration: 6,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const TechMetricCard: React.FC<{ metric: TechMetric; index: number }> = ({ metric, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative"
    >
      <div className="glassmorphism-strong rounded-xl p-4 hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.gradient} text-white shadow-lg`}>
            <metric.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <div className="text-sm text-gray-300">{metric.label}</div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const TokenLaunchPreview: React.FC = () => {
  const [currentToken, setCurrentToken] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);

  const tokenExamples = [
    {
      name: "Brew & Bloom Café",
      symbol: "BBC",
      type: "Loyalty Rewards",
      holders: 1247,
      volume: 52800,
      growth: "+23%",
      color: "from-amber-400 to-orange-500",
      icon: "☕",
      description: "Coffee shop loyalty program"
    },
    {
      name: "Maya's Art Studio",
      symbol: "MAS", 
      type: "Creator Token",
      holders: 892,
      volume: 34200,
      growth: "+41%",
      color: "from-purple-400 to-pink-500",
      icon: "🎨",
      description: "Artist community token"
    },
    {
      name: "Sunset Skate Crew",
      symbol: "SSC",
      type: "Community",
      holders: 673,
      volume: 28900,
      growth: "+15%",
      color: "from-cyan-400 to-blue-500",
      icon: "🛹",
      description: "Skateboarding community"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToken((prev) => (prev + 1) % tokenExamples.length);
      setAnimatedValue(0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(tokenExamples[currentToken].volume);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentToken]);

  const currentTokenData = tokenExamples[currentToken];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="glassmorphism-strong rounded-xl p-4 md:p-6 space-y-4 md:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${currentTokenData.color} flex items-center justify-center text-lg sm:text-xl shadow-lg`}>
            {currentTokenData.icon}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">{currentTokenData.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{currentTokenData.description}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm font-medium text-white">${currentTokenData.symbol}</div>
          <div className="text-xs text-gray-400">{currentTokenData.type}</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-white">
            {currentTokenData.holders.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Token Holders</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-white">
            ${animatedValue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">24h Volume</div>
        </div>
        <div className="text-center">
          <div className={`text-lg sm:text-2xl font-bold ${currentTokenData.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {currentTokenData.growth}
          </div>
          <div className="text-xs text-gray-400">Growth</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Community Growth</span>
          <span className="text-cyan-400">85%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className={`h-2 rounded-full bg-gradient-to-r ${currentTokenData.color}`}
          />
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400 font-medium">Live on Base Network</span>
      </div>
    </motion.div>
  );
};

export const AdvancedHeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient"></div>
      <ParticleField />
      <DataStream />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="outline" className="glassmorphism text-cyan-400 border-cyan-400/30 px-4 py-2">
                  <Rocket className="w-4 h-4 mr-2" />
                  Web3 Token Launchpad
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
                    Plant Your Idea.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-holographic">
                    Bloom Your Brand.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  Empowering creators, communities, and local businesses to transform 
                  their ideas into thriving token economies. Simple, secure, and built 
                  for everyone to succeed together.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  className="neo-brutal bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Launch Interactive Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glassmorphism-strong border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 text-lg"
                  onClick={() => window.open('https://calendly.com/arslan-founder-bloompad', '_blank')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Book Private Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Tech Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Token Launch Preview */}
              <TokenLaunchPreview />

              {/* Tech Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {techMetrics.map((metric, index) => (
                  <TechMetricCard key={metric.label} metric={metric} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Advanced Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="glassmorphism-subtle rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Modern Technical Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'TypeScript', 'React 18', 'Next.js', 'Solidity', 'Hardhat',
                  'Ethers.js', 'Web3Auth', 'IPFS', 'The Graph', 'Chainlink',
                  'OpenZeppelin', 'Tenderly'
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="glassmorphism border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};