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
    isOwnerLoggedIn = false;
    showLogin = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    // Mock login for demonstration
    login() {
        this.isOwnerLoggedIn = true;
    }

    logout() {
        this.isOwnerLoggedIn = false;
    }

    openLogin() {
        this.showLogin = true;
        this.isMobileMenuOpen = false; // Close mobile menu if open
    }

    closeLogin() {
        this.showLogin = false;
    }
}
