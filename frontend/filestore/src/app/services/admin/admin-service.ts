import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AppConstants } from '../../app.constants';
import {
  AddRoleRequest,
  AddRoleResponse,
  GetRolesResponse,
  GetUsersResponse,
  RemoveRoleRequest,
  RemoveRoleResponse,
  Response,
} from '../../interfaces/requests';
import { last, lastValueFrom } from 'rxjs';

@Service()
export class AdminService {
  private http = inject(HttpClient);
  private appConsts = inject(AppConstants);
  private baseurl: string;

  constructor() {
    this.baseurl = this.appConsts.API_BASE_URL + '/admin';
  }

  async getUsers(): Promise<GetUsersResponse> {
    const res$ = this.http.post<Response<GetUsersResponse>>(this.baseurl + '/get_users', {});
    const res = await lastValueFrom(res$);
    if (res.data === undefined) {
      return { users: [] };
    }
    return res.data;
  }

  async getRoles(): Promise<GetRolesResponse> {
    const res$ = this.http.post<Response<GetRolesResponse>>(this.baseurl + '/get_roles', {});
    const res = await lastValueFrom(res$);
    if (res.data === undefined) {
      return { roles: [] };
    }
    return res.data;
  }

  async addRole(params: AddRoleRequest): Promise<AddRoleResponse> {
    const res$ = this.http.post<Response<AddRoleResponse>>(this.baseurl + '/add_role', params);
    const res = await lastValueFrom(res$);
    if (res.data === undefined) {
      return { message: 'Failed' };
    }

    return res.data;
  }

  async removeRole(params: RemoveRoleRequest): Promise<RemoveRoleResponse> {
    const res$ = this.http.post<Response<RemoveRoleResponse>>(
      this.baseurl + '/remove_role',
      params,
    );
    const res = await lastValueFrom(res$);
    if (res.data === undefined) {
      return { message: 'Failed' };
    }

    return res.data;
  }
}
