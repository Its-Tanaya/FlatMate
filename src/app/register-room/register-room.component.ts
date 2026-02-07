import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-room',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register-room.component.html',
    styleUrls: ['./register-room.component.css']
})
export class RegisterRoomComponent {
    @Output() close = new EventEmitter<void>();
    registerForm: FormGroup;
    currentStep = 1;

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            aadharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
            gender: ['', Validators.required],
            religion: ['', Validators.required],
            maritalStatus: ['', Validators.required]
        });
    }

    onClose() {
        this.close.emit();
    }

    onStep2Verification() {
        if (this.registerForm.valid) {
            console.log('Step 1 Valid', this.registerForm.value);
            // Here you would typically proceed to Step 2 or submit Step 1 data
            // For now, we'll just log it as requested by the "Step 2 Verification" button label logic
            alert('Proceeding to Step 2 Verification...');
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
