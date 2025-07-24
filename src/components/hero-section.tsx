import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToCreate = () => {
    const createSection = document.getElementById('create-section');
    createSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMarketplace = () => {
    const marketplaceSection = document.getElementById('marketplace-section');
    marketplaceSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark)] via-[var(--dark-secondary)] to-[var(--dark)] opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Launch Your{' '}
            <span className="bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] bg-clip-text text-transparent">
              Creator Token
            </span>
            <br />
            Build Your Community
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bloompad empowers creators, brands, and communities to launch their own tokens on Base. 
            No coding required. Just vision, community, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToCreate}
              className="bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Launch Your Token
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToMarketplace}
              className="border border-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Explore Tokens
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--electric)] rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-[var(--neon)] rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[var(--purple)] rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
    </section>
  );
}
