import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Wallet, TrendingUp, Settings, Menu, X, 
  Zap, Shield, Globe, Code, Database, Activity, Radio 
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  status?: 'live' | 'beta' | 'new';
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, href: '#dashboard' },
  { label: 'Wallet', icon: Wallet, href: '#wallet', status: 'live' },
  { label: 'Analytics', icon: TrendingUp, href: '#analytics', status: 'beta' },
  { label: 'Streaming', icon: Radio, href: '/streaming', status: 'new' },
  { label: 'Settings', icon: Settings, href: '#settings' },
];

const techStats = [
  { label: 'Active Networks', value: '15+', icon: Globe },
  { label: 'Smart Contracts', value: '47', icon: Code },
  { label: 'Security Score', value: 'A+', icon: Shield },
  { label: 'Uptime', value: '99.98%', icon: Activity },
];

export const AdvancedNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const colors = {
      live: 'bg-green-500 text-green-100',
      beta: 'bg-yellow-500 text-yellow-100',
      new: 'bg-blue-500 text-blue-100',
    };

    return (
      <span className={`px-1.5 py-0.5 text-xs rounded-full ${colors[status as keyof typeof colors]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glassmorphism-strong backdrop-blur-25' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto py-4 md:py-5 px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Bloompad</h1>
                <p className="text-xs text-gray-400">Web3 Launchpad</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'glassmorphism-strong text-white'
                      : 'text-gray-300 hover:text-white hover:glassmorphism'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.href.slice(1))}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.status && <StatusBadge status={item.status} />}
                </motion.a>
              ))}
            </div>

            {/* Tech Stats */}
            <div className="hidden xl:flex items-center space-x-6">
              {techStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glassmorphism-subtle rounded-lg px-3 py-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2">
                    <stat.icon className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connect Wallet Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block"
            >
              <Button 
                className="neo-brutal bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="sm"
                id="wallet-connect-button"
                onClick={() => {
                  // Simulate wallet connection
                  const event = new CustomEvent('wallet-connect');
                  window.dispatchEvent(event);
                }}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden glassmorphism p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glassmorphism-strong border-t border-white/10"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg glassmorphism-subtle hover:glassmorphism-strong transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setActiveSection(item.href.slice(1));
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">{item.label}</span>
                      </div>
                      {item.status && <StatusBadge status={item.status} />}
                    </motion.a>
                  ))}

                  {/* Mobile Wallet Connect */}
                  <Button 
                    className="w-full neo-brutal bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4"
                    onClick={() => {
                      const event = new CustomEvent('wallet-connect');
                      window.dispatchEvent(event);
                      setIsOpen(false);
                    }}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>

                  {/* Mobile Tech Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {techStats.map((stat) => (
                      <div key={stat.label} className="glassmorphism-subtle rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="text-sm font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Network Status Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-20 right-6 z-40 glassmorphism-subtle rounded-full px-4 py-2 hidden lg:flex items-center space-x-2"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-300">Base Network</span>
        <span className="text-xs text-green-400 font-medium">Connected</span>
      </motion.div>
    </>
  );
};