import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, GetPostsResponse } from '../../interfaces/requests';
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
        return res.data
    }
}
