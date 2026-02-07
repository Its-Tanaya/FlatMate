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
    selectedRoom: any = null;

    demoRooms = [
        {
            id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Spacious 2BHK near Station',
            location: 'Andheri West, Mumbai',
            price: 25000,
            rating: 4.5,
            reviews: 120,
            type: '2-BHK',
            furnishing: 'Fully Furnished',
            verified: true,
            description: 'A beautiful 2BHK apartment located just 5 minutes from the station. Fully furnished with AC, WiFi, and modern amenities. Ideal for working professionals or small families.'
        },
        {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1540306126605-726487930514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Modern Studio Apartment',
            location: 'Bandra, Mumbai',
            price: 18000,
            rating: 4.2,
            reviews: 85,
            type: '1-RK',
            furnishing: 'Semi Furnished',
            verified: true,
            description: 'Cozy studio apartment in the heart of Bandra. Close to cafes and nightlife. Perfect for singles.'
        },
        {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Luxury 3BHK Penthouse',
            location: 'Juhu, Mumbai',
            price: 60000,
            rating: 4.8,
            reviews: 200,
            type: '3-BHK',
            furnishing: 'Fully Furnished',
            verified: true,
            description: 'Exquisite penthouse with sea view. Includes gym access, swimming pool, and 24/7 security.'
        },
        {
            id: 4,
            imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Budget Friendly PG',
            location: 'Goregaon East, Mumbai',
            price: 8000,
            rating: 4.0,
            reviews: 340,
            type: 'PG',
            furnishing: 'Basic',
            verified: false,
            description: 'Affordable PG accommodation for students. Includes daily meals and housekeeping.'
        },
        {
            id: 5,
            imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Co-living Space for Techies',
            location: 'Powai, Mumbai',
            price: 15000,
            rating: 4.6,
            reviews: 150,
            type: 'Shared',
            furnishing: 'Fully Furnished',
            verified: true,
            description: 'Vibrant co-living community in Powai. High-speed internet, gaming zone, and weekly events included.'
        },
        {
            id: 6,
            imageUrl: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Single Room with Balcony',
            location: 'Malad West, Mumbai',
            price: 12000,
            rating: 4.3,
            reviews: 95,
            type: '1-BHK',
            furnishing: 'Unfurnished',
            verified: true,
            description: 'Airy single room with a large balcony. Quiet neighborhood, close to parks and schools.'
        }
    ];

    openDetails(room: any) {
        this.selectedRoom = room;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    closeDetails() {
        this.selectedRoom = null;
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}
