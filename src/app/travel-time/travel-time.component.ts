import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-travel-time',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './travel-time.component.html',
    styleUrl: './travel-time.component.scss'
})
export class TravelTimeComponent {
    @Output() close = new EventEmitter<void>();

    destination: string = '';
    result: { busTime: string, localTime: string } | null = null;
    isLoading: boolean = false;
    showResult: boolean = false;

    closeModal() {
        this.close.emit();
    }

    checkTime() {
        if (!this.destination.trim()) return;

        this.isLoading = true;
        this.showResult = false;

        // Simulate API call
        setTimeout(() => {
            const now = new Date();

            // Mock bus schedule logic
            const randomMinutes = Math.floor(Math.random() * 59);
            const randomBusTime = new Date(now.getTime() + randomMinutes * 60000);

            // Mock local time logic (just using current time for now as most destinations might be in same timezone)
            const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const busTimeStr = randomBusTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            this.result = {
                busTime: `Next bus at ${busTimeStr} (in ${randomMinutes} mins)`,
                localTime: localTime
            };

            this.isLoading = false;
            this.showResult = true;
        }, 1500);
    }
}
