import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Terminal, Database, Zap, Shield, Globe, 
  GitBranch, Settings, Play, Copy, Check 
} from 'lucide-react';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
  category: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Gas-Optimized Token Factory',
    language: 'solidity',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BloompadTokenFactory is ReentrancyGuard, Ownable {
    struct TokenParams {
        string name;
        string symbol;
        uint256 initialSupply;
        address creator;
        uint8 decimals;
    }
    
    mapping(address => address[]) public creatorTokens;
    address[] public allTokens;
    
    event TokenCreated(
        address indexed token,
        address indexed creator,
        string name,
        string symbol
    );
    
    function createToken(
        TokenParams calldata params
    ) external nonReentrant returns (address) {
        BloomToken token = new BloomToken{
            salt: keccak256(abi.encode(params.creator, block.timestamp))
        }(params);
        
        address tokenAddress = address(token);
        creatorTokens[params.creator].push(tokenAddress);
        allTokens.push(tokenAddress);
        
        emit TokenCreated(tokenAddress, params.creator, params.name, params.symbol);
        return tokenAddress;
    }
}`,
    description: 'Professional-grade smart contract with gas optimization and security features',
    category: 'Smart Contracts'
  },
  {
    title: 'Advanced Web3 Integration',
    language: 'typescript',
    code: `import { ethers } from 'ethers';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';

interface TokenCreationParams {
  name: string;
  symbol: string;
  initialSupply: bigint;
  decimals: number;
}

export const useTokenFactory = () => {
  const { address } = useAccount();
  
  const { data, write, error, isLoading } = useContractWrite({
    address: TOKEN_FACTORY_ADDRESS,
    abi: tokenFactoryAbi,
    functionName: 'createToken',
    onSuccess: (data) => {
      toast.success('Token creation initiated!');
    },
    onError: (error) => {
      toast.error(\`Error: \${error.message}\`);
    }
  });

  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast.success('Token created successfully!');
      queryClient.invalidateQueries(['user-tokens', address]);
    }
  });

  const createToken = async (params: TokenCreationParams) => {
    if (!address) throw new Error('Wallet not connected');
    
    const optimizedParams = {
      ...params,
      creator: address,
      initialSupply: ethers.parseUnits(params.initialSupply.toString(), params.decimals)
    };
    
    write({ args: [optimizedParams] });
  };

  return { createToken, isLoading: isLoading || isWaiting, isSuccess, error };
};`,
    description: 'Type-safe Web3 hooks with error handling and transaction management',
    category: 'Frontend'
  },
  {
    title: 'Real-Time Analytics Engine',
    language: 'typescript',
    code: `import { WebSocket } from 'ws';
import { Redis } from 'ioredis';
import { EventEmitter } from 'events';

class AnalyticsEngine extends EventEmitter {
  private ws: WebSocket;
  private redis: Redis;
  private metrics: Map<string, number> = new Map();

  constructor() {
    super();
    this.redis = new Redis(process.env.REDIS_URL);
    this.initWebSocket();
    this.startMetricsCollection();
  }

  private initWebSocket() {
    this.ws = new WebSocket('wss://api.base.org/ws');
    
    this.ws.on('message', async (data) => {
      const event = JSON.parse(data.toString());
      await this.processBlockchainEvent(event);
    });
  }

  private async processBlockchainEvent(event: any) {
    const { type, data } = event;
    
    switch (type) {
      case 'token_transfer':
        this.updateMetric('total_volume', data.value);
        this.updateMetric('active_users', data.from, data.to);
        break;
      case 'token_created':
        this.updateMetric('tokens_launched', 1);
        this.emit('token_created', data);
        break;
    }

    // Cache metrics in Redis
    await this.redis.setex(
      \`metrics:\${Date.now()}\`,
      3600,
      JSON.stringify(Object.fromEntries(this.metrics))
    );
  }

  public getMetrics() {
    return {
      totalVolume: this.metrics.get('total_volume') || 0,
      activeUsers: this.metrics.get('active_users') || 0,
      tokensLaunched: this.metrics.get('tokens_launched') || 0,
      timestamp: Date.now()
    };
  }
}`,
    description: 'High-performance analytics with WebSocket integration and Redis caching',
    category: 'Backend'
  }
];

const CodeShowcase: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Code
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent ml-3">
              Architecture
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Production-ready code with advanced patterns, optimization techniques, 
            and enterprise-grade architecture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Code Categories */}
          <div className="lg:col-span-1">
            <Card className="glassmorphism-strong border-white/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-400" />
                  <span>Code Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {codeSnippets.map((snippet, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSnippet(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        activeSnippet === index
                          ? 'glassmorphism-strong text-white border border-white/20'
                          : 'glassmorphism-subtle text-gray-300 hover:text-white hover:glassmorphism'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{snippet.title}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-white/20">
                          {snippet.language}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-white/20">
                          {snippet.category}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSnippet}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glassmorphism-strong border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {codeSnippets[activeSnippet].title}.{codeSnippets[activeSnippet].language}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(codeSnippets[activeSnippet].code, activeSnippet)}
                          className="glassmorphism-subtle border-white/20 text-gray-300 hover:text-white"
                        >
                          {copiedIndex === activeSnippet ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={simulateTyping}
                          className="glassmorphism-subtle border-white/20 text-gray-300 hover:text-white"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm">
                        {codeSnippets[activeSnippet].description}
                      </p>
                    </div>
                    <div className="relative">
                      <pre className={`text-sm leading-relaxed overflow-x-auto p-4 glassmorphism-subtle rounded-lg ${
                        isTyping ? 'animate-pulse' : ''
                      }`}>
                        <code className="text-green-400">
                          {codeSnippets[activeSnippet].code}
                        </code>
                      </pre>
                      {isTyping && (
                        <div className="absolute bottom-4 right-4">
                          <div className="flex items-center space-x-2 text-xs text-cyan-400">
                            <Terminal className="w-4 h-4 animate-pulse" />
                            <span>Compiling...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Technical Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { label: 'Code Quality', value: 'A+', icon: Shield },
                { label: 'Gas Efficiency', value: '99.2%', icon: Zap },
                { label: 'Test Coverage', value: '98.5%', icon: Database },
                { label: 'Performance', value: '100/100', icon: Globe }
              ].map((stat, index) => (
                <Card key={stat.label} className="glassmorphism-subtle border-white/10">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;