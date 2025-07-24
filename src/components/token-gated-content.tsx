import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Download, Video, Lock, Gift } from 'lucide-react';

export function TokenGatedContent() {
  const { isConnected, ownedTokens, tokenBalances } = useWallet();

  const hasTokenAccess = isConnected && ownedTokens.length > 0;

  if (!isConnected) {
    return (
      <section className="py-16 bg-gradient-to-b from-[var(--dark-secondary)] to-[var(--dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Exclusive Content</h2>
            <p className="text-gray-400">Access premium content with your tokens</p>
          </div>
          
          <div className="glassmorphism rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[var(--neon)] to-[var(--purple)] rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="text-white text-xl" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
            <p className="text-gray-300">Connect your wallet to access exclusive token-gated content</p>
          </div>
        </div>
      </section>
    );
  }

  if (!hasTokenAccess) {
    return (
      <section className="py-16 bg-gradient-to-b from-[var(--dark-secondary)] to-[var(--dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Exclusive Content</h2>
            <p className="text-gray-400">Access premium content with your tokens</p>
          </div>
          
          <div className="glassmorphism rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[var(--neon)] to-[var(--purple)] rounded-full mx-auto mb-4 flex items-center justify-center">
              <Gift className="text-white text-xl" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Tokens Found</h3>
            <p className="text-gray-300">Purchase tokens from the marketplace to unlock exclusive content</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="token-gated-content" className="py-16 bg-gradient-to-b from-[var(--dark-secondary)] to-[var(--dark)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Exclusive Content</h2>
          <p className="text-gray-400">Access premium content with your tokens</p>
        </div>
        
        <div className="glassmorphism rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[var(--neon)] to-[var(--purple)] rounded-full mx-auto mb-4 flex items-center justify-center">
              <Gift className="text-white text-xl" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome, Token Holder!</h3>
            <p className="text-gray-300">Thank you for supporting the community</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">Your Token Portfolio:</p>
              <div className="flex flex-wrap gap-2">
                {ownedTokens.map(token => (
                  <div key={token} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    <span className="text-[var(--electric)]">${token}</span>
                    <span className="text-gray-400 ml-1">({tokenBalances[token] || 0})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Download className="text-[var(--neon)] mr-2" size={20} />
                Exclusive Downloads
              </h4>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li>• AI Art Generation Presets</li>
                <li>• Community Discord Access</li>
                <li>• Monthly Creator Calls</li>
                <li>• Premium Resource Pack</li>
              </ul>
              <Button className="bg-[var(--neon)] text-black hover:bg-[var(--neon)]/90 font-medium">
                Download Pack
              </Button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Video className="text-[var(--purple)] mr-2" size={20} />
                Premium Tutorials
              </h4>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li>• Advanced AI Techniques</li>
                <li>• Portfolio Review Sessions</li>
                <li>• 1-on-1 Mentorship</li>
                <li>• Live Workshop Access</li>
              </ul>
              <Button className="bg-[var(--purple)] text-white hover:bg-[var(--purple)]/90 font-medium">
                Watch Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
