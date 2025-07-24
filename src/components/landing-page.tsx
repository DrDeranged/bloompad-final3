import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Sprout, ArrowRight, Sparkles, Users, Zap, Globe, 
  Shield, Database, Cpu, Network, Code, Target, Activity,
  TrendingUp, Rocket, Brain, Atom, Clock, Star
} from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
}

const TechMetric = ({ label, value, icon: Icon, gradient }: { 
  label: string; 
  value: string; 
  icon: React.ComponentType<{ className?: string }>; 
  gradient: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
    className="glassmorphism-strong rounded-xl p-4 text-center"
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </motion.div>
);

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
    animate={{
      y: [-20, -60, -20],
      x: [0, 30, -30, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export function LandingPage({ onStartDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--dark)] mesh-gradient relative overflow-hidden w-full">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <FloatingParticle delay={i * 0.5} />
          </div>
        ))}
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-strong border-b border-white/10 relative z-10 w-full"
      >
        <div className="container mx-auto py-3 md:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-xl flex items-center justify-center shadow-lg">
                  <Sprout className="text-white" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Bloompad</span>
                <div className="text-xs text-gray-400">Web3 Token Launchpad</div>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Tech Status */}
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <div className="glassmorphism-subtle rounded-full px-3 py-1 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Base Network</span>
                </div>
                <div className="glassmorphism-subtle rounded-full px-3 py-1 flex items-center space-x-2">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs text-cyan-400">99.8% Uptime</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="glassmorphism border-white/20 hover:border-white/40 text-white hover:text-white"
                onClick={() => window.open('mailto:arslan.founder@bloompad.xyz')}
              >
                Contact
              </Button>
              <Button
                onClick={onStartDemo}
                className="neo-brutal bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] hover:scale-105 transition-transform text-white font-semibold"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Launch Demo
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto py-12 md:py-16 lg:py-20">
          
          {/* Tech Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16"
          >
            <TechMetric 
              label="Smart Contracts" 
              value="47+" 
              icon={Code} 
              gradient="from-blue-400 to-cyan-500" 
            />
            <TechMetric 
              label="Gas Efficiency" 
              value="99.2%" 
              icon={Zap} 
              gradient="from-yellow-400 to-orange-500" 
            />
            <TechMetric 
              label="Security Score" 
              value="A+" 
              icon={Shield} 
              gradient="from-green-400 to-emerald-500" 
            />
            <TechMetric 
              label="Networks" 
              value="15+" 
              icon={Globe} 
              gradient="from-purple-400 to-pink-500" 
            />
            <TechMetric 
              label="AI Models" 
              value="GPT-4o" 
              icon={Brain} 
              gradient="from-cyan-400 to-blue-500" 
            />
            <TechMetric 
              label="Performance" 
              value="100/100" 
              icon={Target} 
              gradient="from-red-400 to-pink-500" 
            />
          </motion.div>

          <div className="text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative inline-flex items-center justify-center mb-8"
              >
                <div className="glassmorphism-strong px-4 md:px-8 py-3 md:py-4 rounded-full border border-white/20">
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
                    <Badge className="bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold border-0">
                      <Atom className="w-4 h-4 mr-1" />
                      Next-Gen Web3
                    </Badge>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <Sparkles className="text-[var(--electric)] animate-pulse" size={16} />
                      <span className="text-lg md:text-xl font-bold text-white text-center">Plant Your Idea. Bloom Your Brand.</span>
                      <Sparkles className="text-[var(--purple)] animate-pulse" size={16} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse-glow"></div>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
                  Community-Driven
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Token Universe
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6">
                Turn your passion into a thriving economy. Whether you're a café building loyalty, 
                an artist connecting with fans, or a community organizing events—create tokens that bring people together.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 md:mb-16 px-4 sm:px-6"
            >
              <Button
                size="lg"
                onClick={onStartDemo}
                className="neo-brutal bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] hover:scale-105 transition-transform px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold text-white min-h-[60px] sm:min-h-[66px]"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Launch Interactive Demo
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glassmorphism border-white/20 hover:border-white/40 text-white hover:text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold min-h-[60px] sm:min-h-[66px]"
                onClick={() => window.open('https://calendly.com/arslan-founder-bloompad', '_blank')}
              >
                <Users className="w-5 h-5 mr-2" />
                Book Private Demo
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--electric)] rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[var(--neon)] rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[var(--purple)] rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Token Safety Section */}
      <div className="py-20 bg-gradient-to-b from-[var(--dark)] to-[var(--dark-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Anti-Rug Protection
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for <span className="text-[var(--electric)]">Long-Term Growth</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our platform implements strict safety measures to protect investors and promote genuine community-driven projects.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="glassmorphism border-purple-500/20 hover:border-purple-500/40 transition-colors h-full">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-400">3-Month Lock Period</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    All tokens have a mandatory 3-month lock-in period to prevent pump-and-dump schemes and encourage long-term community building.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glassmorphism border-blue-500/20 hover:border-blue-500/40 transition-colors h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">DAO Community Oversight</h3>
                  <p className="text-gray-400">
                    Our decentralized autonomous organization reviews and verifies real companies, ensuring only legitimate projects receive official verification.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="glassmorphism border-yellow-500/20 hover:border-yellow-500/40 transition-colors h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">Community Rating System</h3>
                  <p className="text-gray-400">
                    Users can rate and flag projects, creating a transparent reputation system that helps identify authentic companies versus fake projects.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-[var(--electric)]">Real Communities</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop thinking meme coins. Start thinking community ownership, customer loyalty, and sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glassmorphism border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Launch in Minutes</h3>
                <p className="text-gray-400">
                  No coding required. Our intuitive interface lets you deploy your community token with just a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--neon)] to-[var(--electric)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-gray-400">
                  Built for cafés, artists, local businesses, and creators who want to reward their most loyal supporters.
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--purple)] to-[var(--neon)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Base Powered</h3>
                <p className="text-gray-400">
                  Built on Coinbase's Base network for fast, affordable transactions that won't break the bank.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect for <span className="text-[var(--neon)]">Every Creator</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Local Businesses",
                description: "Coffee shops, restaurants, retail stores creating customer loyalty programs",
                example: "Brew & Bloom Café gives 10% off to $BREW holders"
              },
              {
                title: "Artists & Creators",
                description: "Digital artists, musicians, content creators monetizing their community",
                example: "Maya's Art Studio offers exclusive NFT drops to $MAYA holders"
              },
              {
                title: "Communities",
                description: "Hobby groups, sports teams, local organizations building engagement",
                example: "Sunset Skate gives gear discounts to $SKATE token holders"
              }
            ].map((useCase, index) => (
              <Card key={index} className="glassmorphism border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-gray-400 mb-4">{useCase.description}</p>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-sm text-[var(--electric)]">Example: {useCase.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-[var(--dark-secondary)] to-[var(--dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch Your Community Token?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the creators, businesses, and communities already building on Bloompad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onStartDemo}
              className="bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] px-8 py-4 text-lg font-semibold hover:opacity-90"
            >
              Try the Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 px-8 py-4 text-lg font-semibold hover:bg-gray-800"
              onClick={() => window.open('mailto:arslan.founder@bloompad.xyz')}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-lg flex items-center justify-center">
                <Sprout className="text-white" size={16} />
              </div>
              <span className="text-lg font-semibold">Bloompad</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="mailto:arslan.founder@bloompad.xyz" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}