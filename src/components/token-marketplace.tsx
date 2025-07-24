import { useState } from 'react';
import { TokenCard } from './token-card';
import { Button } from '@/components/ui/button';
import { Token } from '@/lib/types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'art', label: 'Art' },
  { id: 'music', label: 'Music' },
];

export function TokenMarketplace() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock tokens for demo (replace with real data in production)
  const tokens: Token[] = [
    {
      id: '1',
      name: 'Brew & Bloom Café',
      symbol: 'BREW',
      description: 'Local coffee shop loyalty token',
      totalSupply: 100000,
      pricePerToken: 0.01,
      creatorName: 'Sarah Chen',
      creatorEmail: 'sarah@brewandbloom.com',
      category: 'Local Business',
      lockPeriod: 90,
      daoVerified: true,
      communityRating: 4.8,
      flagCount: 0,
      companyType: 'real' as const,
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      websiteUrl: 'https://brewandbloom.com',
      twitterUrl: 'https://twitter.com/brewandbloom'
    }
  ];
  const isLoading = false;

  if (isLoading) {
    return (
      <section id="marketplace-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glassmorphism rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-1/2"></div>
                <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="marketplace-section" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Tokens</h2>
            <p className="text-gray-400">Discover and invest in community tokens</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-[var(--electric)] text-white' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
        
        {tokens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tokens found</p>
            <p className="text-gray-500 mt-2">Be the first to create a token!</p>
          </div>
        )}
        
        {tokens.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="border-gray-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Load More Tokens
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
