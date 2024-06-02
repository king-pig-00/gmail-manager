import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { NavbarComponent } from './components/navbar/navbar.component';
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
            displayName: '客服',
            path: './schedule',
            icon: 'pi-shopping-cart',
        },
        {
            displayName: '积分储值',
            path: './schedule',
            icon: 'pi-clone',
        },
        {
            displayName: '秋分兑换',
            path: './schedule',
            icon: 'pi-arrow-right-arrow-left',
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
