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
            imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Modern Apartment'
        },
        {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Cozy Studio'
        },
        {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Shared flat'
        },
        {
            id: 4,
            imageUrl: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Private Room'
        },
        {
            id: 5,
            imageUrl: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Luxury PG'
        }
    ];
}
