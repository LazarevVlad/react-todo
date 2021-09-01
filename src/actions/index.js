export const ACTION_TYPE = {
  ADD: "ADD_TODO",
  UPDATE: "UPDATE_TODO",
  EDIT: "EDIT_TODO",
  TYPE: "TYPE_TODO",
  DONE: "DONE_TODO",
}

// action creator
export const addTodoEvent = (text) => ({
  type: ACTION_TYPE.ADD,
  text
})

export const editEvent = (editIndex) => ({
  type: ACTION_TYPE.EDIT,
  editIndex
})

export const updateEvent = (text) => ({
  type: ACTION_TYPE.UPDATE,
  text
})

export const doneEvent = (editIndex) => ({
  type: ACTION_TYPE.DONE,
  editIndex
})