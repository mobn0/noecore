export interface Response<data> {
    success: string
    data: data

}

export interface GetPostsResponse{
    posts: string[]
}

export interface PostRequest {
    post: string
}

