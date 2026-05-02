import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {



  constructor(private JwtService: JwtService) { }

  ngOnInit(): void {
  }

  

}
