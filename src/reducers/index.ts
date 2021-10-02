import { ACTION_TYPE } from '../actions/index';


type Todo = {
  value: string
  done: boolean
}


type State = {
  input: string,
  editingIndex: number,
  todos: Todo[] 
}

const initialState: State = {
  input: '',
  editingIndex: NaN,
  todos: [],
}

type AddAction = {type: 'ADD_TODO', text: string}
type UpdateAction = {type: 'UPDATE_TODO', text: string}
type TypeAction = {type: 'TYPE_TODO', text: string}
type EditAction = {type: 'EDIT_TODO', editIndex: number}
type DoneAction = {type: 'DONE_TODO', editIndex: number}
type DeleteAction = {type: 'DELETE_TODO', editIndex: number}

type Action = AddAction | UpdateAction | TypeAction | EditAction | DoneAction | DeleteAction

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
        return {
            todos: [...state.todos, { value: action.text, done: false }],
            input: '',
            editingIndex: NaN
        }
    case ACTION_TYPE.UPDATE:
        const todos = [...state.todos]
        todos[state.editingIndex] = { ...todos[state.editingIndex], value: action.text }

        return {
            todos,
            input: '',
            editingIndex: NaN
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