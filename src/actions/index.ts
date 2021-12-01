import { AddAction, DeleteAction, DoneAction, EditAction, UpdateAction, FetchingSuccess, FetchingTodosSuccess, FetchingTodosFailed } from "../reducers"

export const ACTION_TYPE = {
  ADD: "ADD_TODO",
  UPDATE: "UPDATE_TODO",
  EDIT: "EDIT_TODO",
  TYPE: "TYPE_TODO",
  DONE: "DONE_TODO",
  DELETE: 'DELETE_TODO',
  FETCHING_SUCCESS: 'FETCHING_SUCCESS',
  FETCHING_FAILED: 'FETCHING_FAILED',
  FETCHING_EVENT: 'FETCHING_TODOS_EVENT',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  FAILED_EVENT: 'FAILED_EVENT',
} as const

// action creator
export const addTodoEvent = (text: string, id: string):AddAction => ({
  type: ACTION_TYPE.ADD,
  text,
  id
})

export const editEvent = (editIndex: number):EditAction => ({
  type: ACTION_TYPE.EDIT,
  editIndex
})

export const updateEvent = (text: string): UpdateAction => ({
  type: ACTION_TYPE.UPDATE,
  text
})

export const doneEvent = (editIndex: number):DoneAction => ({
  type: ACTION_TYPE.DONE,
  editIndex
})

export const deleteEvent = (editIndex: number):DeleteAction => ({
  type: ACTION_TYPE.DELETE,
  editIndex
})

export const fetchingSuccess = (todos: []):FetchingSuccess => ({
  type: ACTION_TYPE.FETCHING_SUCCESS,
  todos
})

export const fetchingTodosEvent = ():FetchingTodosSuccess => ({
  type: ACTION_TYPE.FETCHING_EVENT,
})

export const fetchingFailed = ():FetchingTodosFailed => ({
  type: ACTION_TYPE.FETCHING_FAILED,
})


export const saveSuccessEvent = () => ({
    type: ACTION_TYPE.SAVE_SUCCESS
})

export const saveFailedEvent = () => ({
    type: ACTION_TYPE.FAILED_EVENT
})