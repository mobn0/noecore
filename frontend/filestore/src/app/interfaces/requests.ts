import { User } from "./users"

export interface Response<data> {
    success: boolean
    data?: data
    error?: {message: string}

}

export interface GetPostsResponse{
    posts: string[]
}

export interface PostRequest {
    post: string
}

export interface PostResponse {
    Message: string
}

export interface GetUsersResponse{
    users: User[]
}

