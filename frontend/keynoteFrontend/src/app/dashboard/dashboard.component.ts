import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allUsers: any[] = [];
  apiUrl = 'http://localhost:9090/user/alldata';
  loggedInUserName: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
    const userData = localStorage.getItem('user');
    this.loggedInUserName = userData ? JSON.parse(userData).name : '';
  }
  getAllUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data: any) => {
        this.allUsers = data.allData || [];
      },
      (error) => {
        console.error(error);
        // Handle error scenarios (e.g., show error messages)
      }
    );
  }
}
