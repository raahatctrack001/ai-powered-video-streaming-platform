import { User } from "@prisma/client";

export interface Media {
  id: string; // UUID
  screen?: string | null;
  mic?: string | null;
  camera?: string | null;
  preset: 'SD' | 'HD'; // Enums mapped to string literals
  user?: User | null;
  userId: string;
}
