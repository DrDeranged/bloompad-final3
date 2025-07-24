import React, { useState } from 'react';
// Note: Player component can be imported when VITE_LIVEPEER_API_KEY is configured
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Play, 
  Square, 
  Video, 
  Eye, 
  Users, 
  Copy, 
  Check,
  Settings,
  Radio,
  Cast,
  Monitor
} from 'lucide-react';
import { mockStreams, type StreamData, LIVEPEER_GATEWAY_URL } from '@/lib/livepeer';
import { useToast } from '@/hooks/use-toast';

interface LivepeerStreamingProps {
  tokenId?: string;
  creatorName?: string;
}

export function LivepeerStreaming({ tokenId, creatorName }: LivepeerStreamingProps) {
  const [activeTab, setActiveTab] = useState('viewer');
  const [streams, setStreams] = useState<StreamData[]>(mockStreams);
  const [selectedStream, setSelectedStream] = useState<StreamData | null>(mockStreams[0]);
  const [streamName, setStreamName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Livepeer API integration
  const createLivepeerStream = async (name: string) => {
    const apiKey = import.meta.env.VITE_LIVEPEER_API_KEY;
    if (!apiKey) {
      // Demo mode - create mock stream
      return {
        id: `stream-${Date.now()}`,
        name,
        playbackId: `demo-playback-${Date.now()}`,
        streamKey: `demo-key-${Date.now()}`,
        isActive: false,
        createdAt: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`${LIVEPEER_GATEWAY_URL}/stream`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          profiles: [
            {
              name: '720p',
              bitrate: 2000000,
              fps: 30,
              width: 1280,
              height: 720,
            },
            {
              name: '480p', 
              bitrate: 1000000,
              fps: 30,
              width: 854,
              height: 480,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create stream');
      }

      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        playbackId: data.playbackId,
        streamKey: data.streamKey,
        isActive: false,
        createdAt: data.createdAt
      };
    } catch (error) {
      console.error('Error creating stream:', error);
      throw error;
    }
  };

  const handleCreateStream = async () => {
    if (!streamName.trim()) {
      toast({
        title: 'Stream name required',
        description: 'Please enter a name for your stream',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    try {
      const newStream = await createLivepeerStream(streamName);
      setStreams(prev => [...prev, newStream]);
      setStreamName('');
      toast({
        title: 'Stream created',
        description: `${newStream.name} is ready to stream`,
      });
    } catch (error) {
      toast({
        title: 'Error creating stream',
        description: 'Please try again or check your API configuration',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied!',
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Please copy manually',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="glassmorphism-strong rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Live Streaming</h2>
              <p className="text-gray-400 text-sm">Powered by Livepeer Network</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Decentralized Video
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Cast className="w-3 h-3 mr-1" />
              Web3 Native
            </Badge>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glassmorphism-strong grid w-full grid-cols-3">
          <TabsTrigger value="viewer" className="data-[state=active]:bg-white/20">
            <Eye className="w-4 h-4 mr-2" />
            Watch Streams
          </TabsTrigger>
          <TabsTrigger value="creator" className="data-[state=active]:bg-white/20">
            <Video className="w-4 h-4 mr-2" />
            Create Stream
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
            <Monitor className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Stream Viewer */}
        <TabsContent value="viewer" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glassmorphism-strong border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Play className="w-5 h-5 text-red-500" />
                  <span>Live Streams</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stream Selection */}
                <div className="grid gap-3">
                  {streams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      whileHover={{ scale: 1.02 }}
                      className={`glassmorphism-subtle rounded-lg p-4 cursor-pointer border transition-all ${
                        selectedStream?.id === stream.id 
                          ? 'border-red-500/50 bg-red-500/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setSelectedStream(stream)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${stream.isActive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                          <div>
                            <h4 className="text-white font-medium">{stream.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {stream.isActive ? 'Live Now' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {stream.isActive && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <Radio className="w-3 h-3 mr-1" />
                              LIVE
                            </Badge>
                          )}
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">
                            {Math.floor(Math.random() * 150) + 10}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Video Player */}
                {selectedStream && (
                  <div className="space-y-4">
                    <div className="glassmorphism-subtle rounded-lg p-4">
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {selectedStream.playbackId && import.meta.env.VITE_LIVEPEER_API_KEY ? (
                          <video
                            src={`https://lp-playback.com/hls/${selectedStream.playbackId}/index.m3u8`}
                            autoPlay
                            muted
                            controls
                            className="w-full h-full rounded-lg"
                            poster="/api/placeholder/640/360"
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{selectedStream.name}</h3>
                            <p className="text-sm">
                              {selectedStream.isActive 
                                ? 'Live stream demo - Connect Livepeer API for real playback' 
                                : 'Stream is offline'}
                            </p>
                            {selectedStream.isActive && (
                              <div className="mt-4 animate-pulse">
                                <div className="w-full h-2 bg-red-500/30 rounded-full overflow-hidden">
                                  <div className="w-1/3 h-full bg-red-500 animate-pulse"></div>
                                </div>
                                <p className="text-xs text-red-400 mt-2">Simulated live content</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{selectedStream.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {selectedStream.isActive ? 'Started' : 'Created'} {new Date(selectedStream.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="glassmorphism border-white/20 text-white hover:text-white"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Join Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Stream Creator */}
        <TabsContent value="creator" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glassmorphism-strong border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-500" />
                  <span>Create New Stream</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create Stream Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Stream Name</label>
                    <Input
                      value={streamName}
                      onChange={(e) => setStreamName(e.target.value)}
                      placeholder="Enter stream name..."
                      className="glassmorphism border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <Button
                    onClick={handleCreateStream}
                    disabled={isCreating || !streamName.trim()}
                    className="w-full neo-brutal bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Stream...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Create Stream
                      </>
                    )}
                  </Button>
                </div>

                {/* Existing Streams */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Your Streams</h4>
                  {streams.length > 0 ? (
                    <div className="space-y-3">
                      {streams.map((stream) => (
                        <div
                          key={stream.id}
                          className="glassmorphism-subtle rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${stream.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                              <span className="text-white font-medium">{stream.name}</span>
                            </div>
                            <Badge className={stream.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                              {stream.isActive ? 'Live' : 'Offline'}
                            </Badge>
                          </div>
                          
                          {stream.streamKey && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-gray-400 text-sm">Stream Key</label>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(stream.streamKey!, 'Stream key')}
                                  className="text-gray-400 hover:text-white h-6 px-2"
                                >
                                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </Button>
                              </div>
                              <Input
                                value={stream.streamKey}
                                readOnly
                                className="glassmorphism border-white/10 text-gray-300 text-sm font-mono"
                              />
                            </div>
                          )}
                          
                          {stream.playbackId && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-gray-400 text-sm">Playback ID</label>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(stream.playbackId!, 'Playback ID')}
                                  className="text-gray-400 hover:text-white h-6 px-2"
                                >
                                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </Button>
                              </div>
                              <Input
                                value={stream.playbackId}
                                readOnly
                                className="glassmorphism border-white/10 text-gray-300 text-sm font-mono"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No streams created yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glassmorphism-strong border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Monitor className="w-5 h-5 text-green-500" />
                  <span>Stream Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      label: 'Live Viewers',
                      value: '247',
                      change: '+12%',
                      color: 'text-green-400'
                    },
                    {
                      label: 'Total Streams',
                      value: '12',
                      change: '+3',
                      color: 'text-blue-400'
                    },
                    {
                      label: 'Watch Time',
                      value: '1.2K hrs',
                      change: '+25%',
                      color: 'text-purple-400'
                    }
                  ].map((metric, index) => (
                    <div key={metric.label} className="glassmorphism-subtle rounded-lg p-4 text-center">
                      <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                      <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
                      <div className="text-green-400 text-xs">{metric.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glassmorphism-subtle rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <div>
              <h4 className="text-white font-medium">Livepeer Integration</h4>
              <p className="text-gray-400 text-sm">
                {import.meta.env.VITE_LIVEPEER_API_KEY 
                  ? 'Connected to Livepeer Studio' 
                  : 'Demo mode - Add VITE_LIVEPEER_API_KEY for live streaming'}
              </p>
            </div>
          </div>
          <Badge className={import.meta.env.VITE_LIVEPEER_API_KEY ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
            {import.meta.env.VITE_LIVEPEER_API_KEY ? 'Connected' : 'Demo Mode'}
          </Badge>
        </div>
      </motion.div>
    </div>
  );
}