import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, LoginComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    isMobileMenuOpen = false;
    showLogin = false;
    currentUser: any = null;
    showProfileMenu = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    openLogin() {
        this.showLogin = true;
        this.isMobileMenuOpen = false;
    }

    closeLogin() {
        this.showLogin = false;
    }

    onLoginSuccess(user: any) {
        this.currentUser = user;
        this.showLogin = false; // Close modal
    }

    toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
    }

    logout() {
        this.currentUser = null;
        this.showProfileMenu = false;
        this.isMobileMenuOpen = false;
    }
}
