import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RoomService, Room } from '../services/room.service';

@Component({
    selector: 'app-demo-rooms',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './demo-rooms.component.html',
    styleUrl: './demo-rooms.component.scss',
    providers: [RoomService]
})
export class DemoRoomsComponent implements OnInit {
    /**
     * @description
     * The `demoRooms` array stores the list of room objects fetched from the API.
     * It is initialized as an empty array and populated in `ngOnInit`.
     * The `Room` interface is defined in the `room.service.ts` file.
     */
    demoRooms: Room[] = [];
    selectedRoom: Room | null = null;
    isLoading = true;
    error: string | null = null;
    currentMainImage: string = '';

    constructor(
        private roomService: RoomService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.fetchRooms();
        }
    }

    /**
     * @description
     * Fetches the room data from the `RoomService`.
     * While fetching, `isLoading` is set to `true`.
     * If successful, `demoRooms` is updated.
     * If failed, `error` is set to display an error message.
     */
    fetchRooms() {
        this.isLoading = true;
        this.roomService.getRooms().subscribe({
            next: (data) => {
                console.log('Fetched Rooms Data:', data);
                // Map API data to UI structure
                this.demoRooms = data.map(room => ({
                    ...room,
                    // Ensure image logic
                    imageUrls: room.imageUrls || room.images || (room.imageUrl ? [room.imageUrl] : []),
                    // Mock UI fields since API misses them
                    rating: room.rating || 4.5,
                    reviews: room.reviews || Math.floor(Math.random() * 50) + 10
                }));
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching rooms:', err);
                this.error = 'Failed to load rooms. Please try again later.';
                this.isLoading = false;
            }
        });
    }

    /**
     * @description
     * Gets the main image URL for a room card.
     * Prioritizes the first image in an array, then falls back to `imageUrl`.
     * @param room The room object
     * @returns The URL string or a placeholder if none found.
     */
    getMainImage(room: Room): string {
        const placeholder = 'https://placehold.co/600x400?text=No+Image';
        let img = placeholder;

        if (room.imageUrls && room.imageUrls.length > 0) {
            img = room.imageUrls[0];
        } else if (room.imageUrl) {
            img = room.imageUrl;
        } else if (room.images && room.images.length > 0) {
            img = room.images[0];
        }

        // Return placeholder if still the default
        if (img === placeholder) return img;

        // Validation: Must have a valid image extension (basic check)
        if (!img.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i) && !img.startsWith('data:image') && !img.startsWith('http')) {
            return placeholder;
        }

        // Normalization: If it's a raw filename (no path, no https), assume it's in assets/HouseImg
        if (!img.startsWith('http') && !img.startsWith('assets/') && !img.startsWith('/')) {
            return `assets/HouseImg/${img}`;
        }

        return img;
    }

    openDetails(room: Room) {
        this.selectedRoom = room;
        // set initial main image for modal
        this.currentMainImage = this.getMainImage(room);
        document.body.style.overflow = 'hidden';
    }

    closeDetails() {
        this.selectedRoom = null;
        document.body.style.overflow = 'auto';
    }

    /**
     * @description
     * Updates the main image displayed in the modal based on thumbnail click.
     * @param imgUrl The URL of the clicked thumbnail
     */
    setMainModalImage(imgUrl: string) {
        const placeholder = 'https://placehold.co/600x400?text=No+Image';
        if (!imgUrl) return;

        // Same validation/normalization
        if (!imgUrl.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i) && !imgUrl.startsWith('data:image') && !imgUrl.startsWith('http')) {
            this.currentMainImage = placeholder;
            return;
        }

        if (!imgUrl.startsWith('http') && !imgUrl.startsWith('assets/') && !imgUrl.startsWith('/')) {
            imgUrl = `assets/HouseImg/${imgUrl}`;
        }

        this.currentMainImage = imgUrl;
    }
}
