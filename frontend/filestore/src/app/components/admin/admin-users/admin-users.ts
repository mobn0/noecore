import { Component, inject, OnInit, signal, WritableSignal, effect } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../../../services/admin/admin-service';
import { User } from '../../../interfaces/users';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    MatAnchor,
  ],
  selector: 'app-admin-users',
  styleUrl: './admin-users.scss',
  templateUrl: './admin-users.html',
})
export class AdminUsers {
  protected adminService = inject(AdminService);

  protected users: WritableSignal<User[]> = signal([]);
  protected allRoles = signal([] as string[]);

  protected selectedUID: WritableSignal<string> = signal('');

  protected selectedUserUID = signal('');
  protected selectedUserUsername = signal('');
  protected selectedUserRoles = signal([] as string[]);

  protected userAddRole = new FormGroup({
    role: new FormControl<string>(''),
  });
  protected userAddRoleOptions: Observable<string[]>;

  constructor() {
    this.set_users();
    this.set_roles();

    this.userAddRoleOptions = this.userAddRole.controls.role.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterUserAddRole(value || '')),
    );

    effect(() => {
      const user = this.users().find((user) => user.uid == this.selectedUID());

      if (user) {
        this.selectedUserUID.set(user.uid);
        this.selectedUserUsername.set(user.username);
        this.selectedUserRoles.set(user.roles);
      }
    });
  }

  async get_users() {
    const res = await this.adminService.getUsers();
    return res.users;
  }
  async set_users() {
    this.users.set(await this.get_users());
  }

  async get_roles() {
    const res = await this.adminService.getRoles();
    return res.roles;
  }
  async set_roles() {
    this.allRoles.set(await this.get_roles());
  }

  private _filterUserAddRole(value: string) {
    const filterValue = value.toLowerCase();

    const options = this.allRoles().filter((role) => !this.selectedUserRoles().includes(role));

    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }
  async addRole() {
    const selectedRole = this.userAddRole.controls.role.value;
    if (selectedRole === null) {
      return;
    }

    if (selectedRole === '') {
      return;
    }

    await this.adminService.addRole({ user_uuid: this.selectedUID(), role: selectedRole });
    this.set_users();
    this.set_roles();
  }

  async removeRole(role: string) {
    await this.adminService.removeRole({ user_uuid: this.selectedUID(), role: role });
    this.set_users();
    this.set_roles();
  }
}
