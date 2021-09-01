import React from 'react';
import { todoList } from '../styles/todoList.module.css';
import { Todo } from './Todo';
import { Input } from './input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoEvent, editEvent, updateEvent, doneEvent } from '../actions';


export const TodoContainer = () => {
    const dispatch = useDispatch();
    const { todos, input, editingIndex } = useSelector((store) => store);

    function addTodo(text) {
        dispatch(editingIndex === null ? addTodoEvent(text) : updateEvent(text))
    }

    return (
        <div>
            <Input
                initialValue={input}
                buttonCaption={editingIndex === null ? 'Добавить' : 'Изменить'}
                onSubmit={
                  (text) => {addTodo(text)}
                }
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