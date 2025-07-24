import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, Check, Wallet, Sparkles, ShoppingCart, Crown, MessageSquare } from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  targetElement?: string;
  action?: () => void;
}

interface DemoGuideProps {
  onComplete: () => void;
}

export function DemoGuide({ onComplete }: DemoGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const demoSteps: DemoStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Bloompad',
      description: 'Take a 2-minute guided tour to see how creators launch community tokens',
      icon: <Sparkles className="text-[var(--electric)]" size={24} />,
    },
    {
      id: 'wallet',
      title: 'Connect Your Wallet',
      description: 'Click "Connect Wallet" to see your portfolio and token balances',
      icon: <Wallet className="text-[var(--neon)]" size={24} />,
      targetElement: 'wallet-connect-button',
    },
    {
      id: 'marketplace',
      title: 'Explore the Marketplace',
      description: 'Browse real community tokens from cafés, artists, and local businesses',
      icon: <ShoppingCart className="text-[var(--purple)]" size={24} />,
      targetElement: 'marketplace-section',
    },
    {
      id: 'create',
      title: 'Launch Your Token',
      description: 'Use our simple form to create your own community token in minutes',
      icon: <Sparkles className="text-[var(--electric)]" size={24} />,
      targetElement: 'create-section',
    },
    {
      id: 'bloombot',
      title: 'Meet BloomBot',
      description: 'Get AI-powered help with naming, descriptions, and launch strategy',
      icon: <MessageSquare className="text-[var(--neon)]" size={24} />,
      targetElement: 'bloombot-chat',
    },
    {
      id: 'gated',
      title: 'Token-Gated Perks',
      description: 'See exclusive content and rewards available to token holders',
      icon: <Crown className="text-[var(--purple)]" size={24} />,
      targetElement: 'token-gated-content',
    },
  ];

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
      setCurrentStep(currentStep + 1);
      
      // Scroll to target element if specified
      const nextStep = demoSteps[currentStep + 1];
      if (nextStep.targetElement) {
        setTimeout(() => {
          const element = document.getElementById(nextStep.targetElement!);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  const currentStepData = demoSteps[currentStep];
  const isLastStep = currentStep === demoSteps.length - 1;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glassmorphism border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] rounded-full flex items-center justify-center">
                {currentStepData.icon}
              </div>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {demoSteps.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">{currentStepData.title}</h3>
            <p className="text-gray-300">{currentStepData.description}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {demoSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-[var(--electric)] to-[var(--purple)]'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 border-gray-600 hover:bg-gray-800"
            >
              Skip Tour
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] hover:opacity-90"
            >
              {isLastStep ? (
                <>
                  <Check size={16} className="mr-2" />
                  Finish
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}