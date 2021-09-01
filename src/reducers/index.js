import { ACTION_TYPE } from '../actions/index';

const initialState = {
  input: '',
  editingIndex: null,
  todos: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
        return {
            todos: [...state.todos, { value: action.text, done: false }],
            input: '',
            editingIndex: null
        }
    case ACTION_TYPE.UPDATE:
        const todos = [...state.todos]
        todos[state.editingIndex] = { ...todos[state.editingIndex], value: action.text }

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
        // {type: 'done', editIndex: 4}
        const todos = [...state.todos]
        const currentTodo = todos[action.editIndex]
        todos[action.editIndex] = { ...currentTodo, done: !currentTodo.done }

        return {
            ...state,
            todos,
        }
    }
    default:
        return state
}
}