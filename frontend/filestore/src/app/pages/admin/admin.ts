import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminRoles } from '../../components/admin-roles/admin-roles';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [MatSidenavModule, MatListModule, RouterOutlet, RouterLink],
  selector: 'app-admin',
  styleUrl: './admin.scss',
  templateUrl: './admin.html',
})
export class Admin {}
