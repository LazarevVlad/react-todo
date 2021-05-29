import React, { useState } from 'react';

// useReducer
// merge newTodo and editIndex useState into one

export const Todo = () => {
    const [newTodo, setNewTodo] = useState('')
    const [editingIndex, setEditingIndex] = useState(null)
    const [todoList, setTodoList] = useState([])

    function addTodo() {
        if (editingIndex === null) {
            setTodoList(prevTodoList => [...prevTodoList, newTodo])
        } else {
            setTodoList(prevTodoList => {
                const newTodoList = [...prevTodoList]
                newTodoList[editingIndex] = newTodo
                return newTodoList
            })
            setEditingIndex(null)
        }
        setNewTodo('')
    }

    const onInputChange = (event) => {
        setNewTodo(event.target.value)
    }

    return (
        <div>
            <input placeholder='todo' value={newTodo} onChange={onInputChange} />
            <button onClick={addTodo}>
                {editingIndex === null ? 'Добавить' : 'Изменить'}
            </button>
            <div>
                {todoList.map((item, index) => <div key={index} onDoubleClick={(e) => { 
                    setNewTodo(e.target.innerText) 
                    setEditingIndex(index)
                }}>{item}</div>)}
            </div>
        </div>
    )
}