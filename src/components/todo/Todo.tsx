import * as React from 'react';
import classes from './Todo.module.css';

type TodoType = {
  text: string,
  done: boolean,
  onTextClick: () => void,
  onDoneClick: () => void,
  onDeleteClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}

export const Todo = ({text, done, onTextClick, onDoneClick, onDeleteClick}: TodoType) => {
  return(
    <li className={classes.todo}>
      <p onDoubleClick={(e) => {onTextClick()}}>{text}</p>
      <div className={classes.controls}>
        <div className={`${classes.check} ${done ? classes.done : ''}`} onClick={(e) => { onDoneClick() }}></div>
        <span className={classes.delete} onClick={(e) => { onDeleteClick(e) }}></span>
      </div>
    </li>
  )
}