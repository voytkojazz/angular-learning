import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreditCalculatorComponent } from './credit-calculator/credit-calculator.component';

export const routes: Routes = [
    {
        title: "To Do List",
        component: TodoListComponent,
        path: 'todos/:category'
    },
    {
        title: "Credit Calculator",
        component: CreditCalculatorComponent,
        path: 'credit-calculator'
    }
];
