import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formData: any = {};
  registrationSuccess = false;
  showMessage = false;
  errorMessage = '';
  successMessage = ''

  constructor(private http: HttpClient, private router: Router) {}
  
  submitForm() {
    const apiUrl = 'http://localhost:9090/user/sign'; // Update the endpoint URL

    this.http.post(apiUrl, this.formData).subscribe(
      (response: any) => {
        if (response.ok) {
          this.registrationSuccess = true;
          
          this.errorMessage = ''; // Set flag to show message
          this.successMessage="registration Successfull!"
          // Wait for 3 seconds before navigating to the login page
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          this.errorMessage = response.msg; // Set the error message
          // Set registrationSuccess to false to prevent unwanted navigation
          this.registrationSuccess = false;
          this.successMessage=''
        }
      },
      (error) => {
        console.error(error);
        // Handle error scenarios (e.g., show error messages)
        this.errorMessage = 'Error occurred during registration.';
        this.registrationSuccess = false;
      }
    );
  }
}
