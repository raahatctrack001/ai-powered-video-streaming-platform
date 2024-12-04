
export type GetWorkspaceFolder = {
    statusCode: number,
    success: boolean,
    message: string,
    data?: {
        name: string,
        _count: {
            videos: number
        }
    }[]
}