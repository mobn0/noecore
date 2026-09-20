import { Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { AdminService } from '../../services/admin/admin-service';
import { GetUsersResponse } from '../../interfaces/requests';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  selector: 'app-admin-roles',
  styleUrl: './admin-roles.scss',
  templateUrl: './admin-roles.html',
})
export class AdminRoles implements OnInit{
  protected adminService = inject(AdminService)
  protected users: WritableSignal<GetUsersResponse> = signal({users:[]})

  ngOnInit(): void {
      this.updateUsers()
  }

  async updateUsers () {
    this.users.set(await this.adminService.getUsers())
  }

}
