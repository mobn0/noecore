import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { GetUsersResponse, Response } from '../../interfaces/requests';
import { lastValueFrom } from 'rxjs';

@Service()
export class AdminService {

    private http = inject(HttpClient)
    private appConsts = inject(AppConstants)
    private baseurl: string

    constructor() {
        this.baseurl = this.appConsts.API_BASE_URL + "/admin"

    }

    async getUsers(): Promise<GetUsersResponse> {
        const res$ = this.http.post<Response<GetUsersResponse>>(this.baseurl + "/get_users", {})
        const res = await lastValueFrom(res$)
        if (res.data === undefined) { return { users: [] } }
        return res.data
    }
}
