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
    loginForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

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
                        this.successMessage = 'Login successful!';
                        this.errorMessage = '';
                        // Close modal after short delay or immediately?
                        // For now, let's keep it open to show success message, or maybe close it.
                        // this.onClose(); 
                    },
                    error: (error) => {
                        console.error('Login failed', error);
                        this.errorMessage = 'Login failed. Please check your credentials and try again.';
                        this.successMessage = '';
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
