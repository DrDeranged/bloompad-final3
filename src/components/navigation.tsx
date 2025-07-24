import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Sprout } from 'lucide-react';

export function Navigation() {
  const { isConnected, address, connect, disconnect } = useWallet();
  const [location] = useLocation();

  const handleWalletClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <nav className="glassmorphism border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-lg flex items-center justify-center">
                  <Sprout className="text-white text-sm" size={16} />
                </div>
                <span className="text-xl font-bold">Bloompad</span>
              </div>
            </Link>
            <div className="hidden md:flex space-x-6 ml-8">
              <Link href="/">
                <span className={`transition-colors cursor-pointer ${location === '/' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Explore
                </span>
              </Link>
              <button 
                onClick={() => {
                  const createSection = document.getElementById('create-section');
                  createSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Create
              </button>
              <Link href="/token-gated">
                <span className={`transition-colors cursor-pointer ${location === '/token-gated' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                  Portfolio
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              id="wallet-connect-button"
              onClick={handleWalletClick}
              className={`px-6 py-2 rounded-lg font-medium transition-opacity ${
                isConnected 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] hover:opacity-90'
              }`}
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
