// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import buttonStyles from '../button.module.css';
import inputStyles from './input.module.css';

type Input = {
  initialValue: string,
  onSubmit: (inputValue: string) => void,
  buttonCaption: string,
}

export const Input = ({initialValue, onSubmit, buttonCaption}: Input) => {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [value, setValue] = useState(initialValue || '');
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  useEffect(() => {
    if (value.length === 0) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [value])

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (onSubmit) {
        onSubmit(value)
        setValue('')
      }
    }}>
      <input className={inputStyles.input} placeholder='add todo' value={value} onChange={(e) => {setValue(e.target.value)}} />
      <button type="submit" className={buttonStyles.button} disabled={buttonDisable}>
          {buttonCaption}
      </button>
    </form>
  )
}