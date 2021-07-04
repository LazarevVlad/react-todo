import React from 'react';

export const Input = (props) => {
  const {input, onInputChange, addTodo, editingIndex} = props;
  return(
    <>
    <input placeholder='todo' value={input} onChange={onInputChange} />
      <button onClick={addTodo}>
          {editingIndex === null ? 'Добавить' : 'Изменить'}
      </button>
    </>
  )
}