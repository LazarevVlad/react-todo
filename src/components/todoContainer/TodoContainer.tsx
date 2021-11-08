import { useEffect } from 'react';
import styles from './todoList.module.css';
import { Todo } from '../todo/Todo';
import { Input } from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoEvent, editEvent, updateEvent, doneEvent, deleteEvent } from '../../actions';
import { State } from '../../reducers';
import { nanoid } from 'nanoid';
//@ts-ignore
const fetchingSuccess = (todos) => ({
  type: 'FETCHING_SUCCESS',
  todos
})

const fetchingTodosEvent = () => ({
  type: 'FETCHING_TODOS_EVENT',
})

const fetchingFailed = () => ({
  type: 'FETCHING_FAILED',
})


const saveSuccessEvent = () => ({
    type: 'SAVE_SUCCESS'
})
//@ts-ignore
const saveFailedEvent = () => ({
    type: 'FAILED_EVENT',
})

function saveTodo(text: string) {
    //@ts-ignore
    return async function saveTodosThunk(dispatch, getState) {
        const id = nanoid()
        dispatch(addTodoEvent(text, id))
        try {
        const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos`, {
            'method': 'POST',
            'headers': {
              "Content-type": 'application/json',
            },
            body: JSON.stringify({
                id,
                text,
                done: false,
            }),
          })
        if (response.ok) {
            dispatch(saveSuccessEvent())
        } else {
            dispatch(saveFailedEvent())
        }
    } catch (err) {
        dispatch(saveFailedEvent())
    }
  }
}

function loadTodos() {
    //@ts-ignore
    return async function fetchTodos(dispatch, getState) {
        dispatch(fetchingTodosEvent())
        
        try {
          const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos`, {
            'method': 'GET',
          })
          if (response.ok) {
            const res = response.json();
            //@ts-ignore
            dispatch(fetchingSuccess(res))
        } else {
            dispatch(fetchingFailed())
          }
        } catch(err) {
            dispatch(fetchingFailed())
        }
    }
}

export const TodoContainer = () => {
    const dispatch = useDispatch();
    // const { todos, input, editingIndex } = useSelector<State, State>((store) => store);

    const todos = useSelector<State, State['todos']>((store) => store.todos);
    const input = useSelector<State, string>((store) => store.input);
    const editingIndex = useSelector<State, State['editingIndex']>((store) => store.editingIndex);
    const isSuccess = useSelector<State, State['isSuccess']>((store) => store.isSuccess);

    function addTodo(text: string) {
      dispatch(editingIndex === null ? saveTodo(text) : updateEvent(text))
    }
    useEffect(() => {
      loadTodos()
    }, [])

    return (
        <div>
            {isSuccess === true && <p>Success!</p>}
            {isSuccess === false && <p>ERROR!</p>}
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