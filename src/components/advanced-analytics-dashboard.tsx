import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Activity, Users, DollarSign, 
  BarChart3, PieChart, LineChart, Zap, Globe, Shield,
  ArrowUpRight, ArrowDownRight, Eye, Clock, Target
} from 'lucide-react';

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

interface ChartDataPoint {
  timestamp: string;
  value: number;
  volume?: number;
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: 'Total Value Locked',
    value: '$2.4M',
    change: 18.5,
    icon: DollarSign,
    color: 'from-green-400 to-emerald-500',
    trend: 'up'
  },
  {
    label: 'Active Users',
    value: '15,847',
    change: 12.3,
    icon: Users,
    color: 'from-blue-400 to-cyan-500',
    trend: 'up'
  },
  {
    label: 'Transaction Volume',
    value: '$890K',
    change: -5.2,
    icon: Activity,
    color: 'from-purple-400 to-pink-500',
    trend: 'down'
  },
  {
    label: 'Network Fees',
    value: '$2.1K',
    change: 24.7,
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    trend: 'up'
  },
  {
    label: 'Security Score',
    value: '98.5%',
    change: 0.8,
    icon: Shield,
    color: 'from-red-400 to-rose-500',
    trend: 'up'
  },
  {
    label: 'Global Reach',
    value: '47 Countries',
    change: 15.2,
    icon: Globe,
    color: 'from-indigo-400 to-purple-500',
    trend: 'up'
  }
];

const generateChartData = (days: number): ChartDataPoint[] => {
  return Array.from({ length: days }, (_, i) => ({
    timestamp: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: 1000 + Math.random() * 1500 + i * 50,
    volume: 500 + Math.random() * 800
  }));
};

const AnalyticsCard: React.FC<{ metric: AnalyticsMetric; index: number }> = ({ metric, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <Card className="glassmorphism-strong border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10`} />
        </div>
        
        <CardHeader className="pb-2 relative z-10">
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} shadow-lg`}>
              <metric.icon className="w-5 h-5 text-white" />
            </div>
            <Badge 
              variant="outline" 
              className={`border-0 text-xs ${
                metric.trend === 'up' 
                  ? 'bg-green-500/20 text-green-400' 
                  : metric.trend === 'down'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {metric.trend === 'up' ? (
                <ArrowUpRight className="w-3 h-3 mr-1" />
              ) : metric.trend === 'down' ? (
                <ArrowDownRight className="w-3 h-3 mr-1" />
              ) : null}
              {Math.abs(metric.change).toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{metric.value}</p>
            <p className="text-sm text-gray-300">{metric.label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MiniChart: React.FC<{ data: ChartDataPoint[]; color: string }> = ({ data, color }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((maxValue - d.value) / (maxValue - minValue)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-16 w-full relative overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
        />
      </svg>
    </div>
  );
};

const RealTimeActivity: React.FC = () => {
  const [activities, setActivities] = useState<Array<{
    id: string;
    type: 'trade' | 'stake' | 'launch' | 'governance';
    user: string;
    amount: string;
    token: string;
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    const types = ['trade', 'stake', 'launch', 'governance'] as const;
    const tokens = ['BBC', 'MAS', 'SSC', 'TGC', 'NNG', 'CCC'];
    
    const generateActivity = () => ({
      id: Math.random().toString(36).substr(2, 9),
      type: types[Math.floor(Math.random() * types.length)],
      user: `0x${Math.random().toString(16).substr(2, 8)}`,
      amount: `${(Math.random() * 1000).toFixed(2)}`,
      token: tokens[Math.floor(Math.random() * tokens.length)],
      timestamp: new Date()
    });

    // Initial activities
    setActivities(Array.from({ length: 5 }, generateActivity));

    // Add new activity every 3 seconds
    const interval = setInterval(() => {
      setActivities(prev => [generateActivity(), ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trade': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'stake': return <Target className="w-4 h-4 text-green-400" />;
      case 'launch': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'governance': return <Users className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="glassmorphism-strong border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Eye className="w-5 h-5 text-green-400" />
          <span>Real-Time Activity</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3 p-3 glassmorphism-subtle rounded-lg"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-400 ml-1">
                      {activity.type === 'trade' ? 'traded' : 
                       activity.type === 'stake' ? 'staked' :
                       activity.type === 'launch' ? 'launched' : 'voted on'}
                    </span>
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>${activity.amount} {activity.token}</span>
                    <span>•</span>
                    <span>{activity.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    setChartData(generateChartData(days));
  }, [timeframe]);

  return (
    <section id="analytics" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Platform
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ml-3">
              Analytics
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time insights with professional analytics, predictive modeling, 
            and comprehensive performance metrics.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4 md:px-0">
          {analyticsMetrics.map((metric, index) => (
            <AnalyticsCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4 md:px-0">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glassmorphism-strong border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-400" />
                    <span>Performance Overview</span>
                  </CardTitle>
                  <div className="flex space-x-1">
                    {(['24h', '7d', '30d', '90d'] as const).map((period) => (
                      <Button
                        key={period}
                        size="sm"
                        variant={timeframe === period ? "default" : "outline"}
                        onClick={() => setTimeframe(period)}
                        className={`text-xs ${
                          timeframe === period
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                            : 'glassmorphism-subtle border-white/20 text-gray-300 hover:text-white'
                        }`}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <MiniChart data={chartData} color="#3b82f6" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="text-center text-gray-400">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Interactive Chart Simulation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Real-time Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <RealTimeActivity />
          </motion.div>
        </div>

        {/* Core Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0"
        >
          {[
            {
              title: 'AI Predictions',
              description: 'Machine learning price forecasts',
              icon: TrendingUp,
              gradient: 'from-purple-400 to-pink-500'
            },
            {
              title: 'Risk Analysis',
              description: 'Professional portfolio risk metrics',
              icon: Shield,
              gradient: 'from-red-400 to-orange-500'
            },
            {
              title: 'Market Intelligence',
              description: 'Cross-chain market insights',
              icon: Globe,
              gradient: 'from-green-400 to-cyan-500'
            },
            {
              title: 'Performance Optimization',
              description: 'Gas optimization recommendations',
              icon: Zap,
              gradient: 'from-yellow-400 to-orange-500'
            }
          ].map((feature, index) => (
            <Card key={feature.title} className="glassmorphism-strong border-white/20 hover:border-white/40 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glassmorphism-strong rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Complete Analytics Suite
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Unlock powerful analytics capabilities with custom dashboards, 
              API integrations, and professional solutions.
            </p>
            <Button 
              size="lg"
              className="neo-brutal bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8"
            >
              <PieChart className="w-5 h-5 mr-2" />
              Explore Analytics
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};