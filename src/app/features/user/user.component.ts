import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { NavbarComponent } from '@app/shared';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, NavbarComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
    navOptions: {
        displayName: string;
        path: string;
        icon: string;
    }[] = [
        {
            displayName: 'Dashboard',
            path: './dashboard',
            icon: 'pi-chart-bar',
        },
        {
            displayName: 'To Do List',
            path: './todo-list',
            icon: 'pi-calendar',
        },
        {
            displayName: 'Account',
            path: './schedule',
            icon: 'pi-id-card',
        },
        {
            displayName: 'Wallet',
            path: './schedule',
            icon: 'pi-wallet',
        },
    ];

    drawerExpanded = true;
    mobileDrawerIsOpen = false;

    toggleDrawerExpanded(): void {
        this.drawerExpanded = !this.drawerExpanded;
    }
    openMobileDrawer(): void {
        this.mobileDrawerIsOpen = true;
    }
}
