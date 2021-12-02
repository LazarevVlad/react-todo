import { useEffect } from 'react';
import styles from './todoList.module.css';
import { Todo } from '../todo/Todo';
import { Input } from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoEvent, editEvent, updateEvent, doneEvent, deleteEvent, fetchingSuccess, fetchingTodosEvent, fetchingFailed, saveSuccessEvent, saveFailedEvent } from '../../actions';
import { State } from '../../reducers';
import { nanoid } from 'nanoid';
import { Preloader } from '../preloader/Preloader';

const headers = {
  "Content-type": 'application/json',
}

function saveTodo(text: string) {
    //@ts-ignore
    return async function saveTodosThunk(dispatch, getState) {
        const id = nanoid()
        dispatch(addTodoEvent(text, id))
        try {
        const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos`, {
            'method': 'POST',
            'headers': headers,
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
            'headers': headers
          })
          if (response.ok) {
            const res = await response.json();
            dispatch(fetchingSuccess(res))
        } else {
            dispatch(fetchingFailed())
          }
        } catch(err) {
          console.log(err)
            dispatch(fetchingFailed())
        }
    }
}

function EditTodo(text: string) {
  //@ts-ignore
  return async function name(dispatch, getState) {
    const { todos, editingIndex } = getState()
    let { id } = todos[editingIndex];
    try {
      const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos/${id}`, {
        'method': 'PUT',
        'headers' : headers,
        body: JSON.stringify({
          text
        })
      })
      if (response.ok) {
        dispatch(updateEvent(text))
      } else {
        console.log(response.status)
      }

    } catch(err) {
      console.log(err)
    }
  }
}

function doneTodo(index: number, todo: {id:string, done:boolean}) {
  const id = todo.id;
  const status = !todo.done;
  //@ts-ignore
  return async function name(dispatch, getState) {
    try {
      const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos/${id}`, {
        'method': 'PUT',
        'headers' : headers,
        body: JSON.stringify({
          done: status
        })
      })
      if (response.ok) {
        dispatch(doneEvent(index))
      } else {
        console.log(response.status)
      }
    } catch(err) {
      console.log(err)
    }
  }
}

function deleteTodo(index: number, todo: {id:string}) {
  const id = todo.id;
  //@ts-ignore
  return async function deleteTodoThunk(dispatch, getState) {
    try {
      const response = await fetch(`https://aqueous-brook-08387.herokuapp.com/todos/${id}`, {
        'method': 'DELETE',
      })
      if (response.ok) {
        dispatch(deleteEvent(index))
      } else {
        console.log(response)
      }
    } catch(err) {
      console.log(err)
    }
  }
}

export const TodoContainer = () => {
    const dispatch = useDispatch();

    const todos = useSelector<State, State['todos']>((store) => store.todos);
    const input = useSelector<State, string>((store) => store.input);
    const editingIndex = useSelector<State, State['editingIndex']>((store) => store.editingIndex);
    const isLoading = useSelector<State, State['isLoading']>((store => store.isLoading));

    function addTodo(text: string) {
      dispatch(editingIndex === null ? saveTodo(text) : EditTodo(text))
    }
    useEffect(() => {
      dispatch(loadTodos())
    }, [dispatch])

    return (
        <div>
            <>
              <Input
                  initialValue={input}
                  buttonCaption={editingIndex === null ? 'Add' : 'Edit'}
                  onSubmit={
                    (text: string) => {addTodo(text)}
                  }
              />
              <ul className={styles.todoList}>
                  {isLoading? (
                    <Preloader/>
                  ): (  
                    todos.map((item, index) =>
                        <Todo
                            key={index}
                            text={item.text}
                            done={item.done}
                            onTextClick={() => {
                                dispatch(editEvent(index))
                            }}
                            onDoneClick={() => { dispatch(doneTodo(index, todos[index])) }}
                            onDeleteClick={() => { dispatch(deleteTodo(index, todos[index]))}}
                        />
                    )
                  )}
              </ul>
            </>
        </div>
    )
}