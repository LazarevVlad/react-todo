import React, { useReducer } from 'react';
import { todoList } from '../styles/todoList.module.css';

import { Todo } from './Todo';

import { Input } from './input/Input';

const ACTION_TYPE = {
    ADD: "ADD_TODO",
    UPDATE: "UPDATE_TODO",
    EDIT: "EDIT_TODO",
    TYPE: "TYPE_TODO",
    DONE: "DONE_TODO",
}

// action creator
const addTodoEvent = () => ({
    type: ACTION_TYPE.ADD
})

const type = (text) => ({
    type: ACTION_TYPE.TYPE,
    text
})

const editEvent = (editIndex) => ({
    type: ACTION_TYPE.EDIT,
    editIndex
})

const updateEvent = () => ({
    type: ACTION_TYPE.UPDATE
})

const doneEvent = (editIndex) => ({
    type: ACTION_TYPE.DONE,
    editIndex
})

const initialState = {
    input: '',
    editingIndex: null,
    todos: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD:
            return {
                todos: [...state.todos, { value: state.input, done: false }],
                input: '',
                editingIndex: null
            }
        case ACTION_TYPE.UPDATE:
            const todos = [...state.todos]
            todos[state.editingIndex] = { ...todos[state.editingIndex], value: state.input }

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

export const TodoContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { todos, input, editingIndex } = state

    function addTodo(text) {
        dispatch(editingIndex === null ? addTodoEvent(text) : updateEvent(text))
    }

    const onInputChange = (event) => {
        dispatch(type(event.target.value))
    }

    return (
        <div>
            <Input
                // onSubmit={
                //     (text) => {addTodo(text)}
                // } 
                // value={editingIndex === null ? '' : todos[editingIndex]}
                input={input}
                onInputChange={onInputChange}
                addTodo={addTodo}
                editingIndex={editingIndex}
            />
            <ul className={todoList.todoList}>
                {todos.map((item, index) =>
                    <Todo
                        key={index}
                        text={item.value}
                        done={item.done}
                        onTextClick={() => {
                            dispatch(editEvent(index))
                        }}
                        onDoneClick={() => { dispatch(doneEvent(index)) }}
                    />
                )}
            </ul>
        </div>
    )
}