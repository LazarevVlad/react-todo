import React from 'react';
import classes from './Todo.module.css';


export const Todo = ({text, done, onTextClick, onDoneClick, onDeleteClick}) => {
  return(
    <li className={classes.todo}>
      <p onDoubleClick={(e) => {onTextClick()}}>{text}</p>
      <div className={classes.controls}>
        <div className={`${classes.check} ${done ? classes.done : ''}`} onClick={(e) => { onDoneClick() }}></div>
        <span className={classes.delete} onClick={(e) => { onDeleteClick() }}></span>
      </div>
    </li>
  )
}