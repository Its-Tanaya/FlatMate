import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-demo-rooms',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './demo-rooms.component.html',
    styleUrl: './demo-rooms.component.scss'
})
export class DemoRoomsComponent {
    demoRooms = [
        {
            id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Available PG'
        },
        {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1540306126605-726487930514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Twin Sharing'
        },
        {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Single Room'
        },
        {
            id: 4,
            imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Student Bed'
        },
        {
            id: 5,
            imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Shared Space'
        },
        {
            id: 6,
            imageUrl: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Compact PG'
        }
    ];
}
