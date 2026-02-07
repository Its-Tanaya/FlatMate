import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

@Component({
    selector: 'app-travel-time',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './travel-time.component.html',
    styleUrl: './travel-time.component.scss'
})
export class TravelTimeComponent {
    @Output() close = new EventEmitter<void>();

    source: string = '';
    destination: string = '';
    result: { busTime: string, localTime: string, duration: string } | null = null;
    isLoading: boolean = false;
    showResult: boolean = false;

    sourceSuggestions: string[] = [];
    destinationSuggestions: string[] = [];
    isSearchingSource = false;
    isSearchingDest = false;

    private searchSource$ = new Subject<string>();
    private searchDest$ = new Subject<string>();

    constructor(private http: HttpClient) {
        this.setupSearch(this.searchSource$, 'source');
        this.setupSearch(this.searchDest$, 'destination');
    }

    setupSearch(subject: Subject<string>, type: 'source' | 'destination') {
        subject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(query => {
                if (!query || query.length < 3) return of([]);
                return this.fetchPlaces(query);
            })
        ).subscribe(suggestions => {
            if (type === 'source') this.sourceSuggestions = suggestions;
            else this.destinationSuggestions = suggestions;
        });
    }

    fetchPlaces(query: string) {
        // Using OpenStreetMap Nominatim API (Free, No Key)
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`;
        return this.http.get<any[]>(url).pipe(
            switchMap(data => of(data.map(item => item.display_name))),
            catchError(() => of([]))
        );
    }

    onSourceInput() {
        this.isSearchingSource = true;
        this.searchSource$.next(this.source);
    }

    onDestInput() {
        this.isSearchingDest = true;
        this.searchDest$.next(this.destination);
    }

    selectPlace(place: string, type: 'source' | 'destination') {
        if (type === 'source') {
            this.source = place;
            this.sourceSuggestions = [];
        } else {
            this.destination = place;
            this.destinationSuggestions = [];
        }
    }

    closeModal() {
        this.close.emit();
    }

    checkTime() {
        if (!this.source.trim() || !this.destination.trim()) return;

        this.isLoading = true;
        this.showResult = false;
        this.sourceSuggestions = [];
        this.destinationSuggestions = [];

        // Simulate API call
        setTimeout(() => {
            const now = new Date();

            // Mock bus schedule logic
            const randomMinutes = Math.floor(Math.random() * 59) + 5;
            const randomBusTime = new Date(now.getTime() + randomMinutes * 60000);

            // Mock travel duration
            const durationHours = Math.floor(Math.random() * 3) + 1;
            const durationMins = Math.floor(Math.random() * 59);

            // Mock local time logic
            const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const busTimeStr = randomBusTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            this.result = {
                busTime: `Next bus at ${busTimeStr} (in ${randomMinutes} mins)`,
                localTime: localTime,
                duration: `${durationHours}h ${durationMins}m`
            };

            this.isLoading = false;
            this.showResult = true;
        }, 1500);
    }
}
