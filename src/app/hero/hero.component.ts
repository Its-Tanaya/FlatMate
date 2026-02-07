import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {
    searchQuery = {
        location: '',
        roomType: '',
        rentRange: ''
    };

    onSearch() {
        console.log('Search triggered:', this.searchQuery);
        // TODO: Implement actual search navigation
    }
}
