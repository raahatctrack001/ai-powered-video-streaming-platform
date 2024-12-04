import { Folder, User, Workspace } from "@prisma/client";

export interface Video {
  id: string; // UUID
  title: string; // Defaults to "Untitled Video"
  description: string; // Defaults to "Untitled Description"
  source: string; // Unique identifier for the video
  createdAt: Date;
  folder?: Folder | null;
  folderId?: string | null;
  user?: User | null;
  userId?: string | null;
  processing: boolean; // Indicates if the video is still processing
  workspace?: Workspace | null;
  workspaceId?: string | null;
  views: number;
  summary?: string | null;
}
