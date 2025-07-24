import { z } from "zod";

// User schema
export const usersTable = {
  id: z.string(),
  username: z.string(),
  password: z.string(),
};

export const userInsertSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserInsert = z.infer<typeof userInsertSchema>;
export type User = {
  id: string;
  username: string;
  password: string;
};

// Token schema
export const tokensTable = {
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  description: z.string().optional(),
  totalSupply: z.number(),
  pricePerToken: z.number(),
  creatorName: z.string(),
  creatorEmail: z.string(),
  websiteUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  telegramUrl: z.string().optional(),
  discordUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string(),
  lockPeriod: z.number().default(90), // 3 months in days
  daoVerified: z.boolean().default(false),
  communityRating: z.number().default(0),
  flagCount: z.number().default(0),
  companyType: z.enum(['real', 'community', 'unverified']).default('unverified'),
};

export const tokenInsertSchema = z.object({
  name: z.string().min(1, "Token name is required"),
  symbol: z.string().min(1, "Token symbol is required").max(10, "Symbol must be 10 characters or less"),
  description: z.string().optional(),
  totalSupply: z.number().min(1, "Total supply must be greater than 0"),
  pricePerToken: z.number().min(0.0001, "Price must be greater than 0"),
  creatorName: z.string().min(1, "Creator name is required"),
  creatorEmail: z.string().email("Valid email is required"),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  telegramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  discordUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  lockPeriod: z.number().default(90),
  daoVerified: z.boolean().default(false),
  communityRating: z.number().min(0).max(5).default(0),
  flagCount: z.number().min(0).default(0),
  companyType: z.enum(['real', 'community', 'unverified']).default('unverified'),
});

export type TokenInsert = z.infer<typeof tokenInsertSchema>;
export type Token = {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  totalSupply: number;
  pricePerToken: number;
  creatorName: string;
  creatorEmail: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
  imageUrl?: string;
  category: string;
  lockPeriod: number;
  daoVerified: boolean;
  communityRating: number;
  flagCount: number;
  companyType: 'real' | 'community' | 'unverified';
};

// Chat messages schema
export const chatMessagesTable = {
  id: z.string(),
  message: z.string(),
  response: z.string(),
  sessionId: z.string().optional(),
  createdAt: z.date(),
};

export const chatMessageInsertSchema = z.object({
  message: z.string().min(1, "Message is required"),
  response: z.string().min(1, "Response is required"),
  sessionId: z.string().optional(),
});

export type ChatMessageInsert = z.infer<typeof chatMessageInsertSchema>;
export type ChatMessage = {
  id: string;
  message: string;
  response: string;
  sessionId?: string;
  createdAt: Date;
};