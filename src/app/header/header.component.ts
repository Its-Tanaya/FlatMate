import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    isMobileMenuOpen = false;
    isOwnerLoggedIn = false;

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
}
