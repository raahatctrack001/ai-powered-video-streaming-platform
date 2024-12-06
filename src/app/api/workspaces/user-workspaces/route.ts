import { prisma } from "@/lib/database.prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const loggedInUser = await currentUser();
    if (!loggedInUser) {
      return NextResponse.json(
        {
          statusCode: 403,
          success: false,
          message: "Unauthorized attempt, please log in!",
        },
        { status: 403 }
      );
    }

    const usersWorkspace = await prisma.user.findUnique({
      where: {
        clerkId: loggedInUser.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspaces: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!usersWorkspace) {
      return NextResponse.json(
        {
          statusCode: 400,
          success: false,
          message: "No workspace found for this user.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        statusCode: 200,
        success: true,
        message: "Workspace for this user has been fetched.",
        data: usersWorkspace,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while getting workspaces of user:", error);
    return NextResponse.json(
      {
        statusCode: 500,
        success: false,
        message: "Failed to get user's workspace.",
      },
      { status: 500 }
    );
  }
}
