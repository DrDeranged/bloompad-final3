import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/use-wallet';
// Removed API request for standalone deployment
import { tokenInsertSchema } from '@/lib/types';

const tokenFormSchema = tokenInsertSchema.extend({
  totalSupply: z.coerce.number().min(1, 'Supply must be at least 1'),
  pricePerToken: z.coerce.number().min(0.0001, 'Price must be greater than 0'),
});

type TokenFormData = z.infer<typeof tokenFormSchema>;

export function TokenCreationForm() {
  const { toast } = useToast();
  const { isConnected, address } = useWallet();
  const queryClient = useQueryClient();

  const form = useForm<TokenFormData>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      name: '',
      symbol: '',
      totalSupply: 1000000,
      pricePerToken: 0.001,
      description: '',
      creatorName: '',
      creatorEmail: '',
      websiteUrl: '',
      twitterUrl: '',
      telegramUrl: '',
      discordUrl: '',
      imageUrl: '',
      category: 'community',
      lockPeriod: 90,
      daoVerified: false,
      communityRating: 0,
      flagCount: 0,
      companyType: 'unverified' as const,
    },
  });

  const createTokenMutation = useMutation({
    mutationFn: async (data: TokenFormData) => {
      // Simulate token creation for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, data };
    },
    onSuccess: () => {
      toast({
        title: 'Token Created! 🎉',
        description: 'Your token has been successfully created in demo mode.',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Creation Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: TokenFormData) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    createTokenMutation.mutate(data);
  };

  return (
    <section id="create-section" className="py-12 md:py-16 bg-gradient-to-b from-[var(--dark)] to-[var(--dark-secondary)]">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Create Your Token</h2>
          <p className="text-sm md:text-base text-gray-400">Launch your community token in minutes</p>
        </div>
        
        <div className="gradient-border">
          <div className="gradient-border-content p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Creator Coin" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symbol</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., CREATE" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Supply</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="1000000" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Token (ETH)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.001"
                            placeholder="0.001" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Tell your community about your token and what makes it special..." 
                          {...field} 
                          className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://twitter.com/username" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://yourwebsite.com" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discord"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discord</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://discord.gg/invite" 
                            {...field} 
                            className="bg-gray-800 border-gray-700 focus:border-[var(--electric)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[var(--electric)] to-[var(--purple)] py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                  disabled={createTokenMutation.isPending}
                >
                  {createTokenMutation.isPending ? 'Deploying...' : 'Deploy Token Contract'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
