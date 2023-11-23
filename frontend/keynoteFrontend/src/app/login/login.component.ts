import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) {}

  login() {
    const apiUrl = 'http://localhost:9090/user/login'; // Replace with your Node.js login endpoint

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post(apiUrl, credentials).subscribe(
      (response: any) => {
        // Check the response from the backend
        if (response.ok) {
          this.errorMessage = '';
          this.successMessage = response.mes || 'Login successful!';
          
          // Save token and user info in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify({ name: response.name }));
          
          // Redirect to another page upon successful login
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Wrong credentials';
          this.successMessage = '';
        }
      },
      error => {
        console.error(error);
        this.errorMessage = 'Error while logging in';
        this.successMessage = '';
      }
    );
  }
}
