import React from 'react';
import renderTemplate from '../helpers/renderTemplate.js';

const InputField = ({label, name, value, errors, onChange}) => {
  const errMessage = errors.map((err) => (
    <div style={{color: 'red'}}>{`${renderTemplate(err.message, err.context)}`}</div>
  ));

  return (
    <>
      {label}:
      <input 
        key={name}
        type="text" 
        onChange={(e) => onChange(name, e.target.value)}
        value={value} />
      {errMessage}
    </>
  );
}
// TODO: prop types

export default InputField;