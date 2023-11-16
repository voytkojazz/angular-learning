import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoServiceService } from '../services/todo-service.service';
import { Option, ToDo, ToDoList } from '../services/types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  private service2: TodoServiceService = inject(TodoServiceService);
  private route = inject(ActivatedRoute)
  category = this.route.snapshot.paramMap.get('category')

  todos: Option<ToDoList> = {_tag: "None"}
  headers: string[] = [
    "Select", "Id", "Title", "Due Date"
  ]

  constructor() {
    this.todos = this.service2.fetchByCategory(this.category ?? "")
  }

  handleSelected(event: any, id: string) {
    console.log(event?.target?.checked)
    console.log(id)
    this.service2.markSelected(id, this.category ?? '', event.target.checked)
    console.log(this.service2.fetchByCategory(this.category ?? ''))
  }
}
