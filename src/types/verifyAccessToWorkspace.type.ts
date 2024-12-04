import { Workspace } from "@prisma/client"

export type VerifyAccessToWorkspace = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: Workspace;
}