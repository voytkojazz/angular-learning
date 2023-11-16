export interface ToDo {
    id: string
    title: string,
    dueDate: Option<DueDate>,
    selected: boolean
}

export interface ToDoList {
    category: string,
    todos: ToDo[]
}

type DueDate = string | Date

export type Option<T> = None | Some<T>

type None = {
    _tag: "None"
}

type Some<T> = {
    _tag: "Some",
    value: T
}