import {Component, OnInit, signal} from '@angular/core';
import {TodoapiService} from "../../todoapi.service";

interface Todo {
  id: number,
  name: string,
  description: string,
  status: boolean,
}

@Component({
  selector: 'app-remaning',
  standalone: true,
  imports: [],
  templateUrl: './remaning.component.html',
  styleUrl: './remaning.component.css'
})


export class RemaningComponent implements OnInit {
 private todo: Todo[] = [];
 todolist = signal(this.todo);
  constructor(private todoapiService: TodoapiService) {
  }

  ngOnInit(): void {
    this.todoapiService.remainingTodos().subscribe((data: any) => {
      console.log(data)
      this.todolist = data;
    })
    // throw new Error('Method not implemented.');
    console.log('Hello')
  }


}
