import { ACTION_TYPE } from '../actions/index';
import { Action } from 'redux';

type Todo = {
  id: string,
  value: string
  done: boolean
}


export type State = {
  isLoading: boolean | null,
  input: string,
  editingIndex: number | null,
  todos: Todo[],
  isSuccess: boolean | null,
}

const initialState: State = {
  isLoading: false,
  input: '',
  editingIndex: null,
  todos: [],
  isSuccess: null
}

export interface AddAction extends Action<'ADD_TODO'> { text: string, id: string }
export interface UpdateAction extends Action<'UPDATE_TODO'> { text: string}
export interface TypeAction extends Action<'TYPE_TODO'> { text: string}
export interface EditAction extends Action<'EDIT_TODO'> {editIndex: number}
export interface DoneAction extends Action<'DONE_TODO'> { editIndex: number}
export interface DeleteAction extends Action<'DELETE_TODO'> {editIndex: number}
export interface SuccessAction extends Action<'SAVE_SUCCESS'> {}
export interface FailedAction extends Action<'FAILED_EVENT'> {}
export interface FetchingSuccess extends Action<'FETCHING_SUCCESS'> {
  todos: Todo[];
}
export interface FetchingTodosSuccess extends Action<'FETCHING_TODOS_EVENT'> {}
export interface FetchingTodosFailed extends Action<'FETCHING_FAILED'> {}

export type CustomAction = AddAction | UpdateAction | TypeAction | EditAction | DoneAction | DeleteAction | SuccessAction | FailedAction | FetchingSuccess | FetchingTodosSuccess | FetchingTodosFailed

export const reducer = (state: State = initialState, action: CustomAction): State => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
        return {
            todos: [...state.todos, { id: action.id, value: action.text, done: false }],
            input: '',
            editingIndex: null,
            isSuccess: null,
            isLoading: false
        }
    case ACTION_TYPE.UPDATE:
        const todos = [...state.todos]
        if (state.editingIndex !== null) {
          todos[state.editingIndex] = { ...todos[state.editingIndex], value: action.text }
        }

        return {
            todos,
            input: '',
            editingIndex: null,
            isSuccess: null,
            isLoading: false
        }
    case ACTION_TYPE.TYPE:
        return {
            ...state,
            input: action.text
        }
    case ACTION_TYPE.EDIT: {
        const index = action.editIndex
        const todo = state.todos[index]

        return {
            ...state,
            input: todo.value,
            editingIndex: index
        }
    }
    case ACTION_TYPE.DONE: {
        const todos = [...state.todos]
        // const arr = []
        // for (let i=0; i< state.todos.length; i++) {
        //     arr.push(state.todos[i])
        // }
        const currentTodo = todos[action.editIndex]
        todos[action.editIndex] = { ...currentTodo, done: !currentTodo.done }

        return {
            ...state,
            todos,
        }
    }
    case ACTION_TYPE.DELETE: {
      const index = action.editIndex
      const newtodos = state.todos.filter((todo, i) => i !== index)
    
      return {
        ...state,
        editingIndex: null,
        todos: newtodos,
      }
    }
    case 'SAVE_SUCCESS': {
      return { ...state, isSuccess: true }
    }

    case 'FAILED_EVENT': {
      return { ...state, isSuccess: false }
    }

    case 'FETCHING_SUCCESS': {
      return { ...state, todos: action.todos, isLoading: false}
    }

    case 'FETCHING_TODOS_EVENT': {
      return { ...state, isLoading: true}
    }

    case 'FETCHING_FAILED': {
      return { ...state, isLoading: false}
    }
      
    default:
        return state
      }

}