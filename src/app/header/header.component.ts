import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterRoomComponent } from '../register-room/register-room.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, LoginComponent, RegisterRoomComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    isMobileMenuOpen = false;
    showLogin = false;
    showRegisterRoom = false;
    currentUser: any = null;
    showProfileMenu = false;

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    openLogin() {
        console.log('openLogin called, showLogin was:', this.showLogin);
        this.showLogin = true;
        this.isMobileMenuOpen = false;
        console.log('showLogin is now:', this.showLogin);
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

    openRegisterRoom() {
        this.showRegisterRoom = true;
        this.showProfileMenu = false; // Close menu
    }

    closeRegisterRoom() {
        this.showRegisterRoom = false;
    }

    logout() {
        this.currentUser = null;
        this.showProfileMenu = false;
        this.isMobileMenuOpen = false;
    }
}
