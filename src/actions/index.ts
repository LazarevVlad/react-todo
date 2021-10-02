import { AddAction, DeleteAction, DoneAction, EditAction, UpdateAction } from "../reducers"

export const ACTION_TYPE = {
  ADD: "ADD_TODO",
  UPDATE: "UPDATE_TODO",
  EDIT: "EDIT_TODO",
  TYPE: "TYPE_TODO",
  DONE: "DONE_TODO",
  DELETE: 'DELETE_TODO',
} as const

// action creator
export const addTodoEvent = (text: string):AddAction => ({
  type: ACTION_TYPE.ADD,
  text
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