import { onAuthenticateUser } from "@/server-actions/user.action";
import { Subscription, User, Workspace } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Callback(){
    type ExtendedUser = User & {
        workspaces: Workspace[];
        subscription: Subscription | null;
    }
    const authenticationResult : {
        statusCode: number;
        success: boolean;
        message: string;
        data?: ExtendedUser;
    } = await onAuthenticateUser();

    console.log("authentication result at auth/callback", authenticationResult);

    const { statusCode, success, message, data } = authenticationResult;
    if(success){
        if(data?.workspaces && data.workspaces.length > 0)
            return redirect(`/dashboard/${data.workspaces[0].id}`)
    }

    console.log({error: {statusCode, message}})
    return redirect("/auth/sign-in")
}