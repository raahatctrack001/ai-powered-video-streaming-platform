"use server"

import { onAuthenticateUser } from "@/server-actions/user.action";
import { AuthenticateUserResponseType } from "@/types/onAuthenticateResponse.type";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const authenticationResult: AuthenticateUserResponseType = await onAuthenticateUser();
    const { statusCode, success, message, data } = authenticationResult;

    if(success){
        if(data?.workspaces && data.workspaces.length > 0)
            return redirect(`/dashboard/${data?.workspaces[0].id}`)
    }
    console.log({
        error: {
            statusCode,
            message,
        }
    });
    return redirect('/auth/sign-in')
}

