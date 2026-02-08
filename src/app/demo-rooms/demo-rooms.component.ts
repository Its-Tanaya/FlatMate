import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RoomService, Room } from '../services/room.service';
import { FormsModule } from '@angular/forms';
import { TopFiveModalComponent } from '../shared/components/top-five-modal/top-five-modal.component';

@Component({
    selector: 'app-demo-rooms',
    standalone: true,
    imports: [CommonModule, FormsModule, TopFiveModalComponent],
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

    // Sorting and Top 5 Modal
    sortOption: string = 'default';
    topFiveRooms: Room[] = [];
    modalTitle: string = '';
    isModalVisible: boolean = false;


    // Define local demo data to guarantee display even if backend is offline
    private localDemoData: any[] = [
        {
            roomId: 1,
            houseAddress: "123 Green Street, Indiranagar",
            houseType: "Apartment",
            roomSharingType: "Double Sharing",
            furnishingType: "Fully Furnished",
            roomType: "2 BHK",
            price: 12000,
            pinCode: "560038",
            houseProofVerified: true,
            rulesAndBenefits: "No smoking, Free WiFi, Gym access",
            nearbyPlaces: "Metro Station, Parks",
            description: "A beautiful apartment in the heart of the city.",
            imageUrls: ["/assets/HouseImg/1770486451431-931577175.png"],
            pjLocation: "Bangalore",
            rating: 4.5,
            reviews: 20
        },
        {
            roomId: 2,
            houseAddress: "45 Blue Avenue, Koramangala",
            houseType: "Villa",
            roomSharingType: "Single Room",
            furnishingType: "Semi Furnished",
            roomType: "3 BHK",
            price: 18000,
            pinCode: "560034",
            houseProofVerified: true,
            rulesAndBenefits: "Pet friendly, Garden",
            nearbyPlaces: "Shopping Mall, Restaurants",
            description: "Spacious villa with a lovely garden.",
            imageUrls: ["/assets/HouseImg/1770486458105-594082676.png"],
            pjLocation: "Bangalore",
            rating: 4.8,
            reviews: 15
        },
        {
            roomId: 3,
            houseAddress: "78 Red Road, Whitefield",
            houseType: "Independent House",
            roomSharingType: "Triple Sharing",
            furnishingType: "Unfurnished",
            roomType: "1 RK",
            price: 5000,
            pinCode: "560066",
            houseProofVerified: false,
            rulesAndBenefits: "Low deposit",
            nearbyPlaces: "IT Parks, Bus Stop",
            description: "Affordable stay near IT hub.",
            imageUrls: ["/assets/HouseImg/1770486464792-546820878.png"],
            pjLocation: "Bangalore",
            rating: 3.5,
            reviews: 8
        },
        {
            roomId: 4,
            houseAddress: "101 Yellow Lane, HSR Layout",
            houseType: "Apartment",
            roomSharingType: "Single Room",
            furnishingType: "Fully Furnished",
            roomType: "1 BHK",
            price: 15000,
            pinCode: "560102",
            houseProofVerified: true,
            rulesAndBenefits: "Power backup, Security",
            nearbyPlaces: "Startups, Cafe",
            description: "Modern apartment suitable for professionals.",
            imageUrls: ["/assets/HouseImg/1770488571813-690338092.webp"],
            pjLocation: "Bangalore",
            rating: 4.2,
            reviews: 25
        },
        {
            roomId: 5,
            houseAddress: "202 Purple Street, Jayanagar",
            houseType: "Independent House",
            roomSharingType: "Double Sharing",
            furnishingType: "Semi Furnished",
            roomType: "2 BHK",
            price: 9000,
            pinCode: "560041",
            houseProofVerified: true,
            rulesAndBenefits: "Water supply 24/7",
            nearbyPlaces: "Market, Temple",
            description: "Quiet neighborhood with good connectivity.",
            imageUrls: ["/assets/HouseImg/1770488578352-277701913.webp"],
            pjLocation: "Bangalore",
            rating: 4.0,
            reviews: 12
        },
        {
            roomId: 6,
            houseAddress: "404 Sky Heights, Electronic City",
            houseType: "Apartment",
            roomSharingType: "Single Room",
            furnishingType: "Fully Furnished",
            roomType: "3 BHK",
            price: 22000,
            pinCode: "560100",
            houseProofVerified: true,
            rulesAndBenefits: "Swimming pool, Gym, Club House",
            nearbyPlaces: "Tech Pars, Wipro Gate",
            description: "Premium high-rise apartment with excellent view.",
            imageUrls: ["/assets/HouseImg/1770489392111-674898905.webp"],
            pjLocation: "Bangalore",
            rating: 4.9,
            reviews: 30
        },
        {
            roomId: 7,
            houseAddress: "505 Lake View, BTM Layout",
            houseType: "PG Building",
            roomSharingType: "Triple Sharing",
            furnishingType: "Semi Furnished",
            roomType: "Shared Room",
            price: 6500,
            pinCode: "560076",
            houseProofVerified: true,
            rulesAndBenefits: "3 times food, WiFi, Laundry",
            nearbyPlaces: "Madiwala Lake, Silk Board",
            description: "Affordable PG for students and professionals.",
            imageUrls: ["/assets/HouseImg/1770489577743-867759611.webp"],
            pjLocation: "Bangalore",
            rating: 3.8,
            reviews: 40
        },
        {
            roomId: 8,
            houseAddress: "606 Sunshine Villa, Sarjapur",
            houseType: "Villa",
            roomSharingType: "Double Sharing",
            furnishingType: "Fully Furnished",
            roomType: "4 BHK",
            price: 25000,
            pinCode: "562125",
            houseProofVerified: true,
            rulesAndBenefits: "Private Garden, Parking, Security",
            nearbyPlaces: "Wipro Corporate Office",
            description: "Luxury villa living with ample space.",
            imageUrls: ["/assets/HouseImg/1770489587303-676878795.webp"],
            pjLocation: "Bangalore",
            rating: 4.7,
            reviews: 10
        },
        {
            roomId: 9,
            houseAddress: "707 Urban Nest, Marathahalli",
            houseType: "Apartment",
            roomSharingType: "Double Sharing",
            furnishingType: "Semi Furnished",
            roomType: "2 BHK",
            price: 11000,
            pinCode: "560037",
            houseProofVerified: false,
            rulesAndBenefits: "No restrictions, 24/7 Water",
            nearbyPlaces: "Multiplex, Market",
            description: "Conveniently located near ORR.",
            imageUrls: ["/assets/HouseImg/1770489753400-727811669.webp"],
            pjLocation: "Bangalore",
            rating: 3.6,
            reviews: 18
        },
        {
            roomId: 10,
            houseAddress: "808 Green Woods, Bellandur",
            houseType: "Independent House",
            roomSharingType: "Single Room",
            furnishingType: "Unfurnished",
            roomType: "1 BHK",
            price: 9500,
            pinCode: "560103",
            houseProofVerified: true,
            rulesAndBenefits: "Terrace access, Quiet area",
            nearbyPlaces: "Ecospace, Central Mall",
            description: "Peaceful independent house floor.",
            imageUrls: ["/assets/HouseImg/1770489761309-886456723.jpeg"],
            pjLocation: "Bangalore",
            rating: 4.1,
            reviews: 22
        },
        {
            roomId: 11,
            houseAddress: "909 City Lights, MG Road",
            houseType: "Apartment",
            roomSharingType: "Single Room",
            furnishingType: "Fully Furnished",
            roomType: "2 BHK",
            price: 28000,
            pinCode: "560001",
            houseProofVerified: true,
            rulesAndBenefits: "Central AC, Concierge",
            nearbyPlaces: "Metro, Malls, Pubs",
            description: "Stay in the heart of the city.",
            imageUrls: ["/assets/HouseImg/1770489959562-379461315.jpeg"],
            pjLocation: "Bangalore",
            rating: 4.8,
            reviews: 50
        },
        {
            roomId: 12,
            houseAddress: "1010 Cozy Corner, JP Nagar",
            houseType: "PG Building",
            roomSharingType: "Double Sharing",
            furnishingType: "Fully Furnished",
            roomType: "Shared Room",
            price: 8000,
            pinCode: "560078",
            houseProofVerified: true,
            rulesAndBenefits: "Homely food, TV in room",
            nearbyPlaces: "Mini Forest, Metro",
            description: "Cozy PG with a homely atmosphere.",
            imageUrls: ["/assets/HouseImg/1770489967200-60601061.jpeg"],
            pjLocation: "Bangalore",
            rating: 4.3,
            reviews: 35
        },
        {
            roomId: 13,
            houseAddress: "1111 Tech Hub, Whitefield",
            houseType: "Apartment",
            roomSharingType: "Triple Sharing",
            furnishingType: "Semi Furnished",
            roomType: "3 BHK",
            price: 7000,
            pinCode: "560066",
            houseProofVerified: true,
            rulesAndBenefits: "Shuttle to ITPL, WiFi",
            nearbyPlaces: "Hospitals, ITPL",
            description: "Ideal for freshers working in ITPL.",
            imageUrls: ["/assets/HouseImg/1770490249468-373990559.jpeg"],
            pjLocation: "Bangalore",
            rating: 3.9,
            reviews: 28
        },
        {
            roomId: 14,
            houseAddress: "1212 Garden City, Hebbal",
            houseType: "Villa",
            roomSharingType: "Single Room",
            furnishingType: "Unfurnished",
            roomType: "4 BHK",
            price: 19000,
            pinCode: "560024",
            houseProofVerified: true,
            rulesAndBenefits: "Clubhouse, Jogging Track",
            nearbyPlaces: "Manyata Tech Park",
            description: "Premium living near North Bangalore IT hub.",
            imageUrls: ["/assets/HouseImg/1770490253639-702089773.jpeg"],
            pjLocation: "Bangalore",
            rating: 4.6,
            reviews: 14
        },
        {
            roomId: 15,
            houseAddress: "1313 Student Pod, Mathikere",
            houseType: "PG Building",
            roomSharingType: "Double Sharing",
            furnishingType: "Fully Furnished",
            roomType: "Shared Room",
            price: 5500,
            pinCode: "560054",
            houseProofVerified: false,
            rulesAndBenefits: "Study table, 24/7 Power",
            nearbyPlaces: "M S Ramaiah College",
            description: "Student friendly PG near colleges.",
            imageUrls: ["/assets/HouseImg/1770490728841-7400027.webp"],
            pjLocation: "Bangalore",
            rating: 3.7,
            reviews: 45
        }
    ];

    constructor(
        private roomService: RoomService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.fetchRooms();
        }
    }

    private initializeDates() {
        const now = new Date();
        this.localDemoData = this.localDemoData.map((room, index) => {
            // Distribute dates over the last 30 days
            const daysAgo = index * 2;
            const date = new Date(now);
            date.setDate(now.getDate() - daysAgo);
            return { ...room, createdAt: date.toISOString() };
        });
    }

    /**
     * @description
     * Fetches the room data from the `RoomService`.
     * While fetching, `isLoading` is set to `true`.
     * If successful, `demoRooms` is updated.
     * If failed, `error` is set to display an error message.
     */
    fetchRooms() {
        // DIRECTLY LOAD LOCAL DEMO DATA FOR IMMEDIATE DISPLAY
        // As per user request for temporary data under hero section
        console.log('Loading local demo data immediately...');
        this.initializeDates(); // Ensure dates are present for sorting
        this.demoRooms = [...this.localDemoData];
        this.isLoading = false;

        /*
        // Original API Logic (Preserved for later)
        this.isLoading = true;
        this.roomService.getRooms().subscribe({
            next: (data) => {
                if (data && data.length > 0) {
                   // ... (omitted)
                } else {
                    this.demoRooms = this.localDemoData;
                }
                this.isLoading = false;
            },
            error: (err) => {
                this.demoRooms = this.localDemoData;
                this.isLoading = false;
            }
        });
        */
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
        // Ensure absolute path '/'
        if (!img.startsWith('http') && !img.startsWith('/')) {
            if (img.startsWith('assets/')) {
                return `/${img}`;
            }
            return `/assets/HouseImg/${img}`;
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

        if (!imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
            if (imgUrl.startsWith('assets/')) {
                imgUrl = `/${imgUrl}`;
            } else {
                imgUrl = `/assets/HouseImg/${imgUrl}`;
            }
        }

        this.currentMainImage = imgUrl;
    }

    onSortChange(option: string) {
        this.sortOption = option;

        switch (option) {
            case 'rent-low-high':
                this.demoRooms.sort((a, b) => a.price - b.price);
                this.modalTitle = 'Top 5 Cheapest Rooms';
                break;
            case 'rent-high-low':
                this.demoRooms.sort((a, b) => b.price - a.price);
                this.modalTitle = 'Top 5 Premium Rooms';
                break;
            case 'room-type':
                this.demoRooms.sort((a, b) => a.roomType.localeCompare(b.roomType));
                this.modalTitle = 'Top 5 Rooms by Type';
                break;
            case 'recent':
                this.demoRooms.sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0).getTime();
                    const dateB = new Date(b.createdAt || 0).getTime();
                    return dateB - dateA;
                });
                this.modalTitle = 'Top 5 Recently Added';
                break;
            default:
                // default order (by ID or original)
                this.demoRooms.sort((a, b) => a.roomId - b.roomId);
                return; // Don't show modal for default sort
        }

        // Show Top 5 Modal
        this.topFiveRooms = this.demoRooms.slice(0, 5);
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

    handleViewAll() {
        this.isModalVisible = false;
        // Scroll to top of list or just close modal as the user is already on the list
        const listElement = document.querySelector('.product-grid');
        if (listElement) {
            listElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleViewRoom(room: Room) {
        this.isModalVisible = false;
        this.openDetails(room);
    }
}
