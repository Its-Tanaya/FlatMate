
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../../services/room.service';

@Component({
    selector: 'app-top-five-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './top-five-modal.component.html',
    styleUrl: './top-five-modal.component.scss'
})
export class TopFiveModalComponent {
    @Input() rooms: Room[] = [];
    @Input() title: string = 'Top 5 Rooms';
    @Input() isVisible: boolean = false;

    @Output() closeEvent = new EventEmitter<void>();
    @Output() viewAllEvent = new EventEmitter<void>();
    @Output() viewRoomEvent = new EventEmitter<Room>();

    close() {
        this.closeEvent.emit();
    }

    onViewAll() {
        this.viewAllEvent.emit();
    }

    viewRoom(room: Room) {
        this.viewRoomEvent.emit(room);
    }
}
