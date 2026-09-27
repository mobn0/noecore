import { User } from './users';

export interface Response<data> {
  success: boolean;
  data?: data;
  error?: { message: string };
}

export interface GetPostsResponse {
  posts: string[];
}

export interface PostRequest {
  post: string;
}

export interface PostResponse {
  Message: string;
}

export interface GetUsersResponse {
  users: User[];
}
export interface GetRolesResponse {
  roles: string[];
}

export interface AddRoleRequest {
  user_uuid: string;
  role: string;
}
export interface AddRoleResponse {
  message: string;
}

export interface RemoveRoleRequest {
  user_uuid: string;
  role: string;
}
export interface RemoveRoleResponse {
  message: string;
}
