import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';


const Form = ({saveForm, cancelForm, schema}) => {
  let initialState = {};
  Object.keys(schema).forEach((field) => {
    initialState[field] = schema[field].defaultValue;
  })

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  function save() {
    setErrors({});
    saveForm(data);
  }

  function cancel() {
    cancelForm();
  }

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  return (
    <div>
      {Object.keys(schema).map((field) => 
        <InputField 
        label={schema[field].label}
        name={field}
        value={data[field]} 
        errors={field in errors ? errors[field] : ''} 
        onChange={updateField} />
      )}
      <FontAwesomeIcon icon={faCheck} onClick={() => save()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancel()}/>
    </div>
    );
}
Form.propTypes = {
  saveForm: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired
};
export default Form;
