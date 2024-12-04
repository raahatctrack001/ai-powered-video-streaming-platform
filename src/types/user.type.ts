import { Invite, Media, Member, Subscription, Video, Workspace } from "@prisma/client";

export interface User {
    id: string; // UUID
    email: string;
    firstName?: string;
    lastName?: string;
    createdAt: Date;
    updatedAt?: Date;
    clerkId: string;
    studio?: Media | null;
    image?: string | null;
    workspaces: Workspace[];
    videos: Video[];
    subscription?: Subscription | null;
    members: Member[];
    notifications: Notification[];
    senders: Invite[];
    receivers: Invite[];
    trial: boolean;
  }
