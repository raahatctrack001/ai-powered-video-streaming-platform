import { User, Workspace } from "@prisma/client";

export interface Invite {
  id: string; // UUID
  sender?: User | null;
  senderId?: string | null;
  receiver?: User | null;
  receiverId?: string | null;
  content: string;
  workspace?: Workspace | null;
  workspaceId?: string | null;
  accepted: boolean;
}
