import { User, Workspace } from "@prisma/client";

export interface Member {
  id: string; // UUID
  user?: User | null;
  userId?: string | null;
  createdAt: Date;
  member: boolean; // Indicates whether this is an active member
  workspace?: Workspace | null;
  workspaceId?: string | null;
}
