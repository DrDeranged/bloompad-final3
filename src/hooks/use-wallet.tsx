import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  ownedTokens: string[];
  tokenBalances: Record<string, number>;
  buyToken: (symbol: string, amount: number) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [ownedTokens, setOwnedTokens] = useState<string[]>([]);
  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>({});

  const connect = async () => {
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x1234567890123456789012345678901234567890';
      setAddress(mockAddress);
      setIsConnected(true);
      
      // Simulate owning some tokens for gated content
      const initialTokens = ['BREW', 'MAYA'];
      const initialBalances = { BREW: 25, MAYA: 12 };
      setOwnedTokens(initialTokens);
      setTokenBalances(initialBalances);
      
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('tokenBalances', JSON.stringify(initialBalances));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setOwnedTokens([]);
    setTokenBalances({});
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('tokenBalances');
  };

  const buyToken = async (symbol: string, amount: number): Promise<boolean> => {
    try {
      // Simulate purchase delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update token balances
      const newBalances = { ...tokenBalances };
      newBalances[symbol] = (newBalances[symbol] || 0) + amount;
      setTokenBalances(newBalances);
      
      // Add to owned tokens if not already owned
      if (!ownedTokens.includes(symbol)) {
        setOwnedTokens(prev => [...prev, symbol]);
      }
      
      localStorage.setItem('tokenBalances', JSON.stringify(newBalances));
      return true;
    } catch (error) {
      console.error('Failed to buy token:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('walletConnected');
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalances = localStorage.getItem('tokenBalances');
    
    if (wasConnected && savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      
      const balances = savedBalances ? JSON.parse(savedBalances) : { BREW: 25, MAYA: 12 };
      setTokenBalances(balances);
      setOwnedTokens(Object.keys(balances));
    }

    // Listen for wallet connection events
    const handleWalletConnect = () => {
      if (!isConnected) {
        connect();
      }
    };

    const handleTokenPurchase = (event: CustomEvent) => {
      if (isConnected) {
        const { token } = event.detail;
        buyToken(token, Math.floor(Math.random() * 10) + 1);
      } else {
        connect();
      }
    };

    const handleTokenFavorite = (event: CustomEvent) => {
      const { token } = event.detail;
      console.log(`Added ${token} to favorites`);
    };

    window.addEventListener('wallet-connect', handleWalletConnect);
    window.addEventListener('token-purchase', handleTokenPurchase as EventListener);
    window.addEventListener('token-favorite', handleTokenFavorite as EventListener);

    return () => {
      window.removeEventListener('wallet-connect', handleWalletConnect);
      window.removeEventListener('token-purchase', handleTokenPurchase as EventListener);
      window.removeEventListener('token-favorite', handleTokenFavorite as EventListener);
    };
  }, [isConnected]);

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect, ownedTokens, tokenBalances, buyToken }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
