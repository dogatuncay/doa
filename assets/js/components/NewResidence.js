import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import InputField from '../components/InputField.js';

const NewResidence = ({saveResidence, cancelResidence}) => {
  const [data, setData] = useState({
    title: '',
    zipcode: ''
  });
  const [errors, setErrors] = useState({});

  function save() {
    setErrors({});
    saveResidence(data);
  }

  function cancel() {
    cancelResidence();
  }

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  return (
    <div>
      <InputField 
        label='Title'
        name='title' 
        value={data['title']} 
        errors={'title' in errors ? errors['title'] : null} 
        onChange={updateField} />
      <InputField 
        label='Zipcode'
        name='zipcode' 
        value={data['zipcode']} 
        errors={'zipcode' in errors ? errors['zipcode'] : null} 
        onChange={updateField} />
      <FontAwesomeIcon icon={faCheck} onClick={() => save()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancel()}/>
    </div>
    );
}
NewResidence.propTypes = {
  saveResidence: PropTypes.func.isRequired,
  cancelResidence: PropTypes.func.isRequired
};
export default NewResidence;
