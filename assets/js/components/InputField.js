import React from 'react';
import renderTemplate from '../helpers/renderTemplate.js';

const InputField = ({label, name, value, errors, onChange}) => {
  // const errMessage = errors.map((err) => {
  //   const errStr = typeof(err) === 'string' ? err : renderTemplate(err.errors.message, err.errors.context);
  //   return <div style={{color: 'red'}}>{`${errStr}`}</div>
  // });
  const errStr = typeof(errors) === 'string' ? errors : renderTemplate(errors.message, errors.context);
  const errMessage = (<div style={{color: 'red'}}>{`${errStr}`}</div>);

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