import React from "react";
import { 
    getUserNotification, 
    onAuthenticateUser } from "@/server-actions/user.action";
import { 
    getAllUserVideos, 
    getUserWorkspaces, 
    getWorkspaceFolders, 
    verifyAccessToWorkspace 
} from "@/server-actions/workspace.action";
import { VerifyAccessToWorkspace } from "@/types/verifyAccessToWorkspace.type";
import { Subscription, User, Workspace } from "@prisma/client";
import { redirect } from "next/navigation";
import { dehydrate, Hydrate, QueryClient } from '@tanstack/react-query';
import QueryProvider from "@/lib/query-provider";

export default async function Layout({ children }: { children: React.ReactNode}){
    type ExtendedUser = User & {
        workspaces: Workspace[];
        subscription: Subscription | null;
    };

    const { data }: {
        statusCode: number;
        success: boolean;
        message: string;
        data?: ExtendedUser
    } = await onAuthenticateUser();

    
    if(!(data?.workspaces && data?.workspaces.length > 0)){
        return redirect('/auth/sign-in')
    }


    const usersWorkspace: VerifyAccessToWorkspace = await verifyAccessToWorkspace(data?.workspaces[0].id);
    const { statusCode, success, message } =  usersWorkspace;
    if(!success){
        console.error({
            statusCode,
            message
        })
        if(usersWorkspace.data)
            redirect(`/dashboard/${usersWorkspace?.data.id}`)
    }

    if(!usersWorkspace.data){
        console.error({statusCode, message});
        return null;
    }
    console.log("users workspace inside workspaceId layout", usersWorkspace);
    const { id } = usersWorkspace.data;

    const query = new QueryClient

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders( id )
    })

    await query.prefetchQuery({
        queryKey: ["user-videos"],
        queryFn: () => getAllUserVideos( id )
    })

    await query.prefetchQuery({
        queryKey: ["user-notifications"],
        queryFn: () => getUserNotification()
    })

    await query.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getUserWorkspaces(),
    })

    return (
        <QueryProvider>
            <Hydrate state={dehydrate(query)}>
            { children }
            </Hydrate>
        </QueryProvider>
      );
}