import { prisma } from "@/lib/database.prisma";
import { currentUser } from "@clerk/nextjs/server";
import { AuthenticateUserResponseType } from "@/types/onAuthenticateResponse.type";
import { UserNotification } from "@/types/getUserNotification.type";

export const onAuthenticateUser = async (): Promise<AuthenticateUserResponseType> => {
    try {
        const loggedInUser = await currentUser();
        if (!loggedInUser) {
            return {
                statusCode: 401,
                success: false,
                message: "Unauthorized attempt, please log in.",
            };
        }

        const userInDatabase = await prisma.user.findUnique({
            where: { clerkId: loggedInUser.id },
            include: {
                workspaces: true, // Directly include related workspaces
                subscription: true, // Include subscription
            },
        });

        if (userInDatabase) {
            return {
                statusCode: 200,
                success: true,
                message: "User found!",
                data: userInDatabase,
            };
        }

        const newUser = await prisma.user.create({
            data: {
                clerkId: loggedInUser.id,
                firstName: loggedInUser.firstName || "Unknown",
                lastName: loggedInUser.lastName || "",
                email: loggedInUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
                image: loggedInUser.imageUrl || "",
                workspaces: {
                    create: {
                        name: `${loggedInUser.firstName || "User"}'s workspace`,
                        type: "PERSONAL",
                    },
                },
                subscription: { create: {} },
            },
            include: {
                workspaces: true,
                subscription: true,
            },
        });

        if (!newUser) {
            return {
                statusCode: 500,
                success: false,
                message: "Failed to insert user into database.",
            };
        }

        return {
            statusCode: 201,
            success: true,
            message: "User successfully inserted into database.",
            data: newUser,
        };
    } catch (error) {
        console.error("Error in onAuthenticateUser:", error);
        return {
            statusCode: 500,
            success: false,
            message: "Something went wrong in onAuthenticateUser.",
        };
    }
};

export const getUserNotification = async (): Promise<UserNotification> => {
    try {
        const loggedInUser = await currentUser();
        if(!loggedInUser){
            return {
                statusCode: 401,
                success: false,
                message: "Unauthorized attempt!, please login.",
            }
        }

        const notifications = await prisma.user.findUnique({
            where: {
                clerkId: loggedInUser?.id
            },
            select: {
                notifications: true,
                _count: {
                    select: {
                        notifications: true,
                    }
                }
            }
        })

        if(!notifications){
            return {
                statusCode: 404,
                success: false,
                message: "No notification found!"
            }
        }

        console.log("user notification has been fetched", notifications);
        return { 
            statusCode: 200,
            success: true,
            message: "Notifications fetched",
            data: notifications

        }
    } catch (error) {
        console.error("failed to find notiication", error)
        return { 
            statusCode: 500,
            success: false,
            message: "Error while getting user notification"
        }
    }
}
