import { User } from "@prisma/client";

export interface Notification {
  id: string; // UUID
  user?: User | null;
  userId?: string | null;
  content: string;
}
