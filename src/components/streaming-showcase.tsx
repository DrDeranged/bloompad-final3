import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Radio, 
  Play, 
  Users, 
  Eye, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  Cast,
  Zap
} from 'lucide-react';
import { Link } from 'wouter';

const liveStreams = [
  {
    id: 1,
    title: 'Brew & Bloom Café Live',
    creator: 'Sarah Chen',
    viewers: 247,
    thumbnail: '/api/placeholder/320/180',
    isLive: true,
    category: 'Business'
  },
  {
    id: 2,
    title: 'Maya\'s Art Studio Workshop',
    creator: 'Maya Rodriguez',
    viewers: 156,
    thumbnail: '/api/placeholder/320/180',
    isLive: true,
    category: 'Creative'
  },
  {
    id: 3,
    title: 'Sunset Skate Community',
    creator: 'Jake Thompson',
    viewers: 89,
    thumbnail: '/api/placeholder/320/180',
    isLive: false,
    category: 'Community'
  }
];

const streamingStats = [
  { label: 'Live Streams', value: '34', icon: Radio, change: '+12%' },
  { label: 'Total Viewers', value: '2.4K', icon: Eye, change: '+18%' },
  { label: 'Creators', value: '127', icon: Users, change: '+8%' },
  { label: 'Hours Streamed', value: '1.2K', icon: TrendingUp, change: '+25%' }
];

export function StreamingShowcase() {
  return (
    <section className="py-20 relative overflow-hidden" id="streaming">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="glassmorphism-strong rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Live Streaming</h2>
                <p className="text-gray-400">Decentralized video powered by Livepeer</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Web3 Native
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                <Cast className="w-4 h-4 mr-2" />
                Decentralized
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Low Latency
              </Badge>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Empower your community with professional live streaming. Token-gated content, 
              monetized broadcasts, and direct creator-to-audience connections.
            </p>
          </div>
        </motion.div>

        {/* Streaming Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {streamingStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glassmorphism-strong rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
              <div className="text-green-400 text-xs">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Streams Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {liveStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="glassmorphism-strong border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300">
                <div className="relative">
                  <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20"></div>
                    <div className="text-center text-gray-400 z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm">{stream.title}</p>
                      {stream.isLive && (
                        <div className="mt-2 animate-pulse">
                          <div className="w-full h-1 bg-red-500/30 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-red-500 animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {stream.isLive && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white border-0 animate-pulse">
                        <Radio className="w-3 h-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4">
                    <div className="glassmorphism-strong rounded-full px-3 py-1 flex items-center space-x-1">
                      <Eye className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-medium">{stream.viewers}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      {stream.title}
                    </h3>
                    <Badge variant="outline" className="border-white/20 text-gray-400">
                      {stream.category}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">by {stream.creator}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="glassmorphism-strong rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Your Live Stream Journey
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the decentralized streaming revolution. Create token-gated content, 
              monetize your broadcasts, and build stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/streaming">
                <Button 
                  size="lg"
                  className="neo-brutal bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8"
                >
                  <Radio className="w-5 h-5 mr-2" />
                  Explore Streaming
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="glassmorphism border-white/20 hover:border-white/40 text-white hover:text-white px-8"
              >
                <Globe className="w-5 h-5 mr-2" />
                Learn About Livepeer
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}