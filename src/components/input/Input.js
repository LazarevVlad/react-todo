import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import buttonStyles from '../button.module.css';
import inputStyles from './input.module.css';

export const Input = ({initialValue, onSubmit, buttonCaption}) => {
  const [value, setValue] = useState(initialValue || '')
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (onSubmit) {
        onSubmit(value)
        setValue('')
      }
    }}>
      <input className={inputStyles.input} placeholder='add todo' value={value} onChange={(e) => {setValue(e.target.value)}} />
      <button type="submit" className={buttonStyles.button}>
          {buttonCaption}
      </button>
    </form>
  )
}

Input.propTypes = {
  initialValue: PropTypes.string,
  onSubmit: PropTypes.func,
  buttonCaption: PropTypes.string.isRequired
}
