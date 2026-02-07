import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Room {
    roomId: number;
    ownerId?: number;
    houseAddress: string;
    houseType: string;
    roomSharingType: string;
    furnishingType: string;
    roomType: string;
    price: number;
    pinCode?: string;
    houseProofVerified: boolean;
    rulesAndBenefits?: string;
    nearbyPlaces?: string;
    description: string;
    imageUrls?: string[];
    createdAt?: string;

    // Optional UI fields (mapped or calculated)
    rating?: number;
    reviews?: number;

    // Legacy support (optional)
    imageUrl?: string;
    images?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = '/api/Room';

    constructor(private http: HttpClient) { }

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.apiUrl);
    }

    getRoom(id: number): Observable<Room> {
        return this.http.get<Room>(`${this.apiUrl}/${id}`);
    }
}
