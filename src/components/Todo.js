import React, { useState, useReducer } from 'react';

// useReducer
// merge newTodo and editIndex useState into one

// reducer keeps the state → reducer(state, action) → newState
// state can be changed via actions
// const [state, dispatch] = useReducer(reducer, initialState)

const ACTION_TYPE = {
    ADD: "ADD_TODO",
    UPDATE: "UPDATE_TODO",
    EDIT: "EDIT_TODO",
    TYPE: "TYPE_TODO",
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

const initialState = {
    input: '',
    editingIndex: null,
    todos: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case ACTION_TYPE.ADD:
            return {
                todos: [...state.todos, state.input],
                input: '',
                editingIndex: null
            }
        case ACTION_TYPE.UPDATE:
            const todos = [...state.todos]
            todos[state.editingIndex] = state.input

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
        case ACTION_TYPE.EDIT:
            const index = action.editIndex
            return {
                ...state,
                input: state.todos[index],
                editingIndex: index
            }
        default:
            return state
    }
}

// TODO remove todo item
// TODO complete todo

export const Todo = () => {
    // const [todo, setTodo] = useState({input: '', editingIndex: null})
    // const [todoList, setTodoList] = useState([])
    // const {input, editingIndex} = todo;
    const [state, dispatch] = useReducer(reducer, initialState)
    const {todos, input, editingIndex} = state
    

    function addTodo() {
        dispatch(editingIndex === null ? addTodoEvent() : updateEvent())
        //  if (editingIndex === null) {
            // setTodoList(prevTodoList => [...prevTodoList, input])
        // } else {
            // setTodoList(prevTodoList => {
            //     const newTodoList = [...prevTodoList]
            //     newTodoList[editingIndex] = input
            //     return newTodoList
            // })
        // }
        //setTodo({input: '', editingIndex: null})
    }

    const onInputChange = (event) => {
        dispatch(type(event.target.value))
      //setTodo((prevTodo) => ({...prevTodo, input: event.target.value}))
    }

    return (
        <div>
            <input placeholder='todo' value={input} onChange={onInputChange} />
            <button onClick={addTodo}>
                {editingIndex === null ? 'Добавить' : 'Изменить'}
            </button>
            <div>
                {todos.map((item, index) => <div key={index} onDoubleClick={(e) => {
                    dispatch(editEvent(index))
                    //setTodo({input: e.target.innerText, editingIndex: index})
                }}>{item}</div>)}
            </div>
        </div>
    )
}