import { Component, inject, signal, WritableSignal} from '@angular/core';
import { AdminService } from '../../services/admin/admin-service';
import { GetUsersResponse } from '../../interfaces/requests';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  selector: 'app-admin',
  styleUrl: './admin.scss',
  templateUrl: './admin.html',
})
export class Admin {
  protected adminService = inject(AdminService)
  protected users: WritableSignal<GetUsersResponse> = signal({users:[]})
  
  constructor () {
    this.updateUsers()
  }

  async updateUsers () {
    this.users.set(await this.adminService.getUsers())
  }

  

}
