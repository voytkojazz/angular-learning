import { Injectable } from '@angular/core';
import { Option, ToDo, ToDoList } from './types';
import TODOS from './todos.json'
import * as saveFile from 'file-saver'

@Injectable({
  providedIn: 'root'

})
export class TodoServiceService {

  private static importantTodos: ToDo[] = [
    {
      id: "1",
      title: "Do Angular Tutorial",
      dueDate: {_tag: "Some", value: "20-11-2024"},
      selected: false
    },
    {
      id: '2',
      title: "Throw it away and use React.js or Alpine.js",
      dueDate: {_tag: "Some", value: "21-11-2024"},
      selected: false
    },
    {
      id: '3',
      title: "Burn school",
      dueDate: {_tag: "None"},
      selected: false
    }
  ]

  private static todolists: ToDoList[] = [
    {
      category: "important",
      todos: TodoServiceService.importantTodos,
    }
  ]

  constructor() {
      console.log(JSON.stringify(TODOS))
   }

  fetchAllLists(): ToDoList[] {
    return TodoServiceService.todolists; 
  }

  fetchByCategory(category: string): Option<ToDoList> {
    const found = TodoServiceService.todolists.filter(list => list.category === category).pop()
    if (found === undefined) {
      return {_tag: "None"}
    } else {
      return {_tag: "Some", value: found}
    }
  }

  markSelected(id: string, category: string, value: boolean) {
    TodoServiceService.todolists
    .filter(list => list.category === category)
    .flatMap(list => list.todos)
    .filter(todo => todo.id === id)
    .forEach(todo => todo.selected = value)
  }

}
