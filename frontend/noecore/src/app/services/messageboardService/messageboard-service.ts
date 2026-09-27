import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, GetPostsResponse, PostResponse, PostRequest } from '../../interfaces/requests';
import { AppConstants } from '../../app.constants';
import { lastValueFrom } from 'rxjs';

@Service()
export class MessageboardService {
    private http = inject(HttpClient)
    private appConsts = inject(AppConstants)
    private baseurl: string

    constructor() {
        this.baseurl = this.appConsts.API_BASE_URL + "/msgboard"

    }

    async getPosts(): Promise<GetPostsResponse> {
        const res$ = this.http.post<Response<GetPostsResponse>>(this.baseurl + "/get_posts", {})
        const res = await lastValueFrom(res$)
        if (res.data === undefined){return {posts:[]}}
        return res.data
    }

    async post(data: PostRequest): Promise<string>{
        const res$ = this.http.post<Response<PostResponse>>(this.baseurl+"/post", data)
        const res = await lastValueFrom(res$).catch(e => e.error)
        console.log(res)

        if (res.success) {
            return "Success!"
        }
        return res.error.message
    }
}
