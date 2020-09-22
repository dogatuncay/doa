import React from 'react';
import PropTypes from 'prop-types';
import renderTemplate from '../helpers/renderTemplate';

const InputField = ({label, name, value, errors, onChange}) => {
  // const errMessage = errors.map((err) => {
  //   const errStr = typeof(err) === 'string' ? err : renderTemplate(err.errors.message, err.errors.context);
  //   return <div style={{color: 'red'}}>{`${errStr}`}</div>
  // });
  const errStr = typeof(errors) === 'string' ? errors : renderTemplate(errors.message, errors.context);
  const errMessage = (<div style={{color: 'red'}}>{`${errStr}`}</div>);

  return (
    <div>
      <div className="input-label">
        {label}:
      </div>
      <input 
        key={name}
        className="input-field"
        type="text" 
        onChange={(e) => onChange(name, e.target.value)}
        value={value} />
      {errMessage}
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default InputField;