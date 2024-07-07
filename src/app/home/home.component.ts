import {Component, inject, OnInit} from '@angular/core';
import {TodoapiService} from "../todoapi.service";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private todoapiService: TodoapiService, private http: HttpClient) {
  }
  data: any;
  ngOnInit(): void {
    this.todoapiService.getTodos().subscribe((data: any) => {
      console.log(data)
      this.data = data;
    });
  }
}
