import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
    navItems = [
        { label: 'Browse Rooms', link: '#', isPrimary: true },
        { label: 'Rooms', link: '#', isPrimary: false },
        { label: 'PGs', link: '#', isPrimary: false },
        { label: 'Near Me', link: '#', isPrimary: false },
        { label: 'Contact', link: '#', isPrimary: false }
    ];
}
