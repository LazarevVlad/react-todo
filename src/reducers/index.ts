import { ACTION_TYPE } from '../actions/index';
import { Action } from 'redux';

type Todo = {
  value: string
  done: boolean
}


export type State = {
  input: string,
  editingIndex: number | null,
  todos: Todo[] 
}

const initialState: State = {
  input: '',
  editingIndex: null,
  todos: [],
}

export interface AddAction extends Action<'ADD_TODO'> { text: string }
export interface UpdateAction extends Action<'UPDATE_TODO'> { text: string}
export interface TypeAction extends Action<'TYPE_TODO'> { text: string}
export interface EditAction extends Action<'EDIT_TODO'> {editIndex: number}
export interface DoneAction extends Action<'DONE_TODO'> { editIndex: number}
export interface DeleteAction extends Action<'DELETE_TODO'> {editIndex: number}

export type CustomAction = AddAction | UpdateAction | TypeAction | EditAction | DoneAction | DeleteAction

export const reducer = (state: State = initialState, action: CustomAction): State => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
        return {
            todos: [...state.todos, { value: action.text, done: false }],
            input: '',
            editingIndex: null
        }
    case ACTION_TYPE.UPDATE:
        const todos = [...state.todos]
        if (state.editingIndex !== null) {
          todos[state.editingIndex] = { ...todos[state.editingIndex], value: action.text }
        }

        return {
            todos,
            input: '',
            editingIndex: null
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
        console.log('Done')
        console.log(currentTodo)
        console.log(todos)

        return {
            ...state,
            todos,
        }
    }
    case ACTION_TYPE.DELETE: {
      const index = action.editIndex
      const newtodos = state.todos.filter((todo, i) => i !== index)
    
      console.log(newtodos);

      return {
        ...state,
        editingIndex: NaN,
        todos: newtodos,
      }
    }
    default:
        return state
      }

}