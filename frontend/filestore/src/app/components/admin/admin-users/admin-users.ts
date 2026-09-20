import { Component, inject, OnInit, signal, WritableSignal, effect } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../../../services/admin/admin-service';
import { User } from '../../../interfaces/users';

@Component({
  imports: [MatSelectModule],
  selector: 'app-admin-users',
  styleUrl: './admin-users.scss',
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {
  protected adminService = inject(AdminService);
  protected users: WritableSignal<User[]> = signal([]);
  protected selectedUID: WritableSignal<string> = signal('');
  protected selectedUserUID = signal('');
  protected selectedUserUsername = signal('');
  protected selectedUserRoles = signal([] as string[]);

  constructor() {
    effect(() => {
      const user = this.users().find((user) => user.uid == this.selectedUID());

      if (user) {
        this.selectedUserUID.set(user.uid);
        this.selectedUserUsername.set(user.username);
        this.selectedUserRoles.set(user.roles);
      }
    });
  }

  ngOnInit(): void {
    this.set_users();
  }

  async get_users() {
    const res = await this.adminService.getUsers();
    return res.users;
  }

  async set_users() {
    this.users.set(await this.get_users());
  }
}
