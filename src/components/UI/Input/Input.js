import React from 'react';

import './Input.css';


const Input = ({ field: { title, label, valid, touched, type }, handleChange, name }) => {

  return (
    <div className='input-field'>
      <label className='active' title={title}>{`${label} *`}
        <input
          className={(!valid && !touched) || valid ? 'Valid' : 'Invalid'}
          type={type}
          name={name}
          autofill='true'
          onChange={handleChange} />
      </label>
    </div>
  )
}

export default Input;