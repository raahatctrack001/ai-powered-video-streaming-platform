import { Folder, Invite, Member, User, Video } from "@prisma/client";

export interface Workspace {
  id: string; // UUID
  type: 'PERSONAL' | 'PUBLIC'; // Enum as string literal
  name: string;
  user?: User | null;
  userId?: string | null;
  createdAt: Date;
  folders: Folder[];
  videos: Video[];
  members: Member[];
  invites: Invite[];
}
