import React from 'react';
import classes from './Todo.module.css';


export const Todo = ({text, done, onTextClick, onDoneClick}) => {
  return(
    <li className={classes.todo} onDoubleClick={(e) => {
      onTextClick()
    }}>
      <div>{text}</div>
      <div className={`${classes.check} ${done ? classes.done : ''}`} onClick={(e) => { onDoneClick() }}></div>
    </li>
  )
}