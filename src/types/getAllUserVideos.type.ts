export interface GetAllUserVideos {
    statusCode: number;
    success: boolean;
    message: string;
    data?: Array<{
      user: {
        firstName: string | null;
        lastName: string | null;
        image: string | null;
      } | null;
      id: string;
      processing: boolean;
      folder: {
        id: string;
        name: string;
      } | null;
      createdAt: Date; // Use Date for handling date values or Date | string if you're getting them as strings.
      title: string | null;
      source: string;
    }>;
  }
  