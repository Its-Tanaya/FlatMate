import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Output() close = new EventEmitter<void>();
    @Output() loginSuccess = new EventEmitter<any>();
    loginForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            const loginData = this.loginForm.value;
            const payload = {
                firstName: loginData.fname,
                lastName: loginData.lname,
                email: loginData.email,
                password: loginData.password
            };

            this.http.post('/api/UserLogin', payload)
                .subscribe({
                    next: (response: any) => {
                        console.log('Login successful', response);
                        this.isLoading = false;
                        this.successMessage = 'Login successful!';
                        // Emit success event with response data (or mock data if response is empty)
                        this.loginSuccess.emit(response || { name: loginData.fname });

                        // Close modal after a brief delay to show success message
                        setTimeout(() => {
                            this.onClose();
                        }, 1000);
                    },
                    error: (error) => {
                        console.error('Login failed', error);
                        this.isLoading = false;
                        this.errorMessage = 'Login failed. Please check your credentials and try again.';
                    }
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    onClose() {
        this.close.emit();
    }
}
