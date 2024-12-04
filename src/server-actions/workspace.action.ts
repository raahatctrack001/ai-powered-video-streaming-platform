import { prisma } from '@/lib/database.prisma';
import { GetAllUserVideos } from '@/types/getAllUserVideos.type';
import { GetUserWorkspaces } from '@/types/getUsersWorkspace.type';
import { GetWorkspaceFolder } from '@/types/getWorkspaceFolder.type';
import { VerifyAccessToWorkspace } from '@/types/verifyAccessToWorkspace.type';
import { currentUser } from '@clerk/nextjs/server';

export const verifyAccessToWorkspace = async (workspaceId: string) : Promise<VerifyAccessToWorkspace> =>{
  try {
    const loggedInUser = await currentUser();
    if(!loggedInUser){
      return {
        statusCode: 403,
        success: false,
        message: "Unauthorized attemp, please login!",
      }
    }
  
    const usersWorkspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            user: {
              clerkId: loggedInUser.id
            }
          },
          {
            members: {
              some: {
                user: {
                  clerkId: loggedInUser.id,
                }
              }
            }
          }
      ]
      }
    })
  
    if(!usersWorkspace){
      return {
        statusCode: 404,
        success: false,
        message: "No workspace exists with this credentials"
      }
    }

    return {
      statusCode: 200,
      success: true,
      message: "Workspace found!",
      data: usersWorkspace,
    }
  } catch (error) {
    console.log('error while getting users workspace', error)
    return {
      statusCode: 500,
      success: false,
      message: "Error while getting users workspace"
    }
  }
}

export const getWorkspaceFolders = async (workspaceId: string) : Promise<GetWorkspaceFolder> =>{
  try {
    const workspaceFolders = await prisma.folder.findMany({
      where: {
        workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          }
        }
      }
    })

    if(!workspaceFolders){
      return {
        statusCode: 404,
        success: false,
        message: "No folder found for this workspace"
      }
    }

    console.log("workspaces folder has been fetched", workspaceFolders);

    return {
      statusCode: 200,
      success: true,
      message: "Folder for this workspace has been found",
      data: workspaceFolders
    }
  } catch (error) {
    console.error("error while fetching workspaces folders", error)
    return {
      statusCode: 500,
      success: false,
      message: "Error while fetching workspaces folder"
    }
  }
}

export const getAllUserVideos = async (workspaceId: string): Promise<GetAllUserVideos> =>{
  try {
    const loggedInUser = await currentUser();
    if(!loggedInUser){
      return {
        statusCode: 403,
        success: false,
        message: "Unauthorized attempt, please login!",
      }
    }

    const videos = await prisma.video.findMany({
      where: {
        OR: [
          {
            workspaceId
          }, 
          { 
            folderId: workspaceId
          }
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    console.log("getAllUserVideos", videos)

    if(!videos){
      return { 
        statusCode: 404, 
        success: false,
        message: "No videos found!"
      }
    }

    return {
      statusCode: 404,
      success: true,
      message: "Videos for this folder/workspace is found!",
      data: videos
    }
  } catch (error) {
    console.log("error while getAllUserVideos", error);
    return {
      statusCode: 500,
      success: false,
      message: "Error while getAllUserVideos",
    }
  }
}

export const getUserWorkspaces = async (): Promise<GetUserWorkspaces> =>{
  try {
    const loggedInUser = await currentUser();
    if(!loggedInUser){
      return {
        statusCode: 403,
        success: false,
        message: "Unauthorized attemp, please login!",
      }
    }
    
    const usersWorkspace = await prisma.user.findUnique({
      where: {
        clerkId: loggedInUser.id
      }, 
      select: {
        subscription: {
          select: {
            plan: true,
          }
        },
        workspaces: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        members: {
          select: {
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              }
            }
          }
        }
      }
    })

    console.log("workspaces of user", usersWorkspace);
    if(!usersWorkspace){
      return {
        statusCode: 400, 
        success: false,
        message: "No workspace found for this user"
      }
    }

    return { 
      statusCode: 200,
      success: true,
      message: "Workspace for this user has been fetched",
      data: usersWorkspace,
    }
  } catch (error) {
    console.error("error while getting workspaces of user", error)
    return {
      statusCode: 500,
      success: false,
      message: "Failed to get use's workspace"
    }
  }
}
