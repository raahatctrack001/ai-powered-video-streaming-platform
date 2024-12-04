import { Video, Workspace } from "@prisma/client";

export interface Folder {
  id: string; // UUID
  name: string; // Defaults to "Untitled Folder"
  createdAt: Date;
  workspace: Workspace;
  workspaceId: string;
  videos: Video[];
}
