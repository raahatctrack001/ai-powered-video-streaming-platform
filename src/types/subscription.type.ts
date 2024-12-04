import { User } from "@prisma/client";

export interface Subscription {
  id: string; // UUID
  user?: User | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  plan: 'FREE' | 'PRO'; // Enums mapped to string literals
  customerId?: string | null;
}
