import { Notification } from "@prisma/client";

export interface UserNotification {
    statusCode: number;
    success: boolean;
    message: string;
    data?: {
        notifications: Notification[];
        _count: {
            notifications: number
        }
    }
}