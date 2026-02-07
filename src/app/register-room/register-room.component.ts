import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register-room',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
    templateUrl: './register-room.component.html',
    styleUrls: ['./register-room.component.css']
})
export class RegisterRoomComponent {
    @Output() close = new EventEmitter<void>();
    registerForm: FormGroup;
    roomForm: FormGroup;
    currentStep = 1;
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    ownerId: number | null = null;
    imageUrls: FormArray;

    constructor(private fb: FormBuilder, private http: HttpClient) {
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

        this.imageUrls = this.fb.array([this.createImageUrl()]);

        this.roomForm = this.fb.group({
            houseAddress: ['', Validators.required],
            houseType: ['', Validators.required],
            roomSharingType: ['', Validators.required],
            furnishingType: ['', Validators.required],
            roomType: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            houseProofVerified: [false], // Assuming this might be internal or checked by default
            rulesAndBenefits: [''],
            nearbyPlaces: [''],
            description: [''],
            imageUrls: this.imageUrls
        });
    }

    createImageUrl(url: string = ''): FormGroup {
        return this.fb.group({
            url: [url, Validators.required]
        });
    }

    get imageUrlControls() {
        return this.imageUrls.controls as FormGroup[];
    }

    addImageUrl() {
        this.imageUrls.push(this.createImageUrl());
    }

    removeImageUrl(index: number) {
        this.imageUrls.removeAt(index);
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.isLoading = true; // Show loading while uploading
            const formData = new FormData();
            formData.append('file', file);

            this.http.post('http://localhost:3000/upload', formData)
                .subscribe({
                    next: (response: any) => {
                        console.log('Image uploaded:', response);
                        this.isLoading = false;
                        // Assuming response contains path, e.g., { path: 'assets/HouseImg/img.jpg' }
                        if (response.path) {
                            // Add the uploaded URL to the form array
                            // If the first control is empty, use it, otherwise add new one
                            const firstControl = this.imageUrls.at(0);
                            if (firstControl && !firstControl.value.url) {
                                firstControl.patchValue({ url: response.path });
                            } else {
                                this.imageUrls.push(this.createImageUrl(response.path));
                            }
                        }
                    },
                    error: (error) => {
                        console.error('Image upload failed:', error);
                        this.isLoading = false;
                        alert('Image upload failed. Please try again or enter URL manually.');
                    }
                });
        }
    }

    onClose() {
        this.close.emit();
    }

    onStep1Submit() {
        if (this.registerForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const payload = this.registerForm.value;

            this.http.post('/api/Owner/register', payload)
                .subscribe({
                    next: (response: any) => {
                        console.log('Owner registered:', response);
                        this.isLoading = false;
                        // Assuming response contains ownerId, e.g., { id: 123, ... } or just the id
                        this.ownerId = response.id || response.ownerId;

                        if (this.ownerId) {
                            this.currentStep = 2;
                        } else {
                            // Fallback if structure is different, log it to see
                            console.warn('Owner ID not found in response, strictly using response if number or debugging check needed', response);
                            // If the API returns the ID directly as a number
                            if (typeof response === 'number') {
                                this.ownerId = response;
                                this.currentStep = 2;
                            } else {
                                this.errorMessage = 'Owner registered but ID not returned. Cannot proceed.';
                            }
                        }
                    },
                    error: (error) => {
                        console.error('Owner registration failed:', error);
                        this.isLoading = false;
                        this.errorMessage = 'Registration failed. Please try again.';
                    }
                });
        } else {
            this.registerForm.markAllAsTouched();
        }
    }

    onStep2Submit() {
        if (this.roomForm.valid && this.ownerId) {
            this.isLoading = true;
            this.errorMessage = '';

            const formValue = this.roomForm.value;
            // flatten image urls array of objects to array of strings if needed by API
            // The request says: "imageUrls": ["url1", "url2"]
            const imageUrlStrings = formValue.imageUrls.map((item: any) => item.url);

            const payload = {
                ...formValue,
                ownerId: this.ownerId,
                imageUrls: imageUrlStrings
            };

            this.http.post('/api/Room/add', payload)
                .subscribe({
                    next: (response: any) => {
                        console.log('Room registered:', response);
                        this.isLoading = false;
                        this.successMessage = 'Room registered successfully!';
                        setTimeout(() => this.onClose(), 2000);
                    },
                    error: (error) => {
                        console.error('Room registration failed:', error);
                        this.isLoading = false;
                        this.errorMessage = 'Room registration failed. Please try again.';
                    }
                });
        } else {
            this.roomForm.markAllAsTouched();
        }
    }
}
