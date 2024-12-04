import { User, Workspace, Subscription } from "@prisma/client";

// Define the extended User type to include relations
export type ExtendedUser = User & {
    workspaces: Workspace[];
    subscription: Subscription | null;
};

// Define the return type of the onAuthenticateUser function
export type AuthenticateUserResponseType = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: ExtendedUser; // data is optional and includes the extended user type
};
