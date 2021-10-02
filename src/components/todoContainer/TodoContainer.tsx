import React from 'react';
import styles from './todoList.module.css';
import { Todo } from '../todo/Todo';
import { Input } from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoEvent, editEvent, updateEvent, doneEvent, deleteEvent } from '../../actions';
import { State } from '../../reducers';

export const TodoContainer = () => {
    const dispatch = useDispatch();
    // const { todos, input, editingIndex } = useSelector<State, State>((store) => store);

    const todos = useSelector<State, State['todos']>((store) => store.todos);
    const input = useSelector<State, string>((store) => store.input);
    const editingIndex = useSelector<State, State['editingIndex']>((store) => store.editingIndex);
    

    function addTodo(text: string) {
        dispatch(editingIndex === null ? addTodoEvent(text) : updateEvent(text))
    }

    return (
        <div>
            <Input
                initialValue={input}
                buttonCaption={editingIndex === null ? 'Add' : 'Edit'}
                onSubmit={
                  (text: string) => {addTodo(text)}
                }
            />
            <ul className={styles.todoList}>
                {todos.map((item, index) =>
                    <Todo
                        key={index}
                        text={item.value}
                        done={item.done}
                        onTextClick={() => {
                            dispatch(editEvent(index))
                        }}
                        onDoneClick={() => { dispatch(doneEvent(index)) }}
                        onDeleteClick={() => { dispatch(deleteEvent(index))}}
                    />
                )}
            </ul>
        </div>
    )
}