import { Sprout, Twitter, Github, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--dark-secondary)] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-lg flex items-center justify-center">
                <Sprout className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold">Bloompad</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The premier creator token launchpad on Base. Empowering communities to launch, trade, and grow together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--electric)] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--electric)] transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--electric)] transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Explore Tokens</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Create Token</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="mailto:arslan.founder@bloompad.xyz" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Bloompad. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
