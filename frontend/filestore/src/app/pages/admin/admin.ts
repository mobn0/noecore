import { Component, inject, signal, WritableSignal, OnInit, viewChild} from '@angular/core';
import { AdminService } from '../../services/admin/admin-service';
import { GetUsersResponse } from '../../interfaces/requests';
import { MatSidenav, MatSidenavModule} from "@angular/material/sidenav"
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from "@angular/material/list"

@Component({
  imports: [MatCardModule, MatSidenavModule, MatListModule],
  selector: 'app-admin',
  styleUrl: './admin.scss',
  templateUrl: './admin.html',
})
export class Admin implements OnInit{
  protected adminService = inject(AdminService)
  protected users: WritableSignal<GetUsersResponse> = signal({users:[]})

  protected sidenav = viewChild.required<MatSidenav>("sidenav")
  
  constructor () {
    this.updateUsers()
  }

  ngOnInit(): void {
      this.sidenav().open()
  }

  async updateUsers () {
    this.users.set(await this.adminService.getUsers())
  }

  

}
