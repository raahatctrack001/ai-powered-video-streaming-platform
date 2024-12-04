export interface GetUserWorkspaces {
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    subscription: {
      plan: 'FREE' | 'PRO';
    } | null;
    workspaces: {
      id: string;
      name: string;
      type: string; // Use `string` if Type can have other values or is dynamic
    }[];
    members: {
      workspace: {
        id: string;
        name: string;
        type: string; // Use `string` for broader compatibility
      } | null; // Reflect nullable workspace
    }[];
  };
}