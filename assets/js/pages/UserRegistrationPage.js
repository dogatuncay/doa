import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { createNewUser } from '../api/user.js';
import InputField from '../components/InputField.js';

const UserRegistrationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState({
    email: '',
    name: '',
    user_name: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  function renderField(label, name) {
    return <InputField label={label} name={name} value={data[name]} errors={errors && name in errors ? errors[name] : ''} onChange={updateField} />
  }

  function onClick() {
    setErrors({});
    createNewUser(data, dispatch)
    .then(() => history.push('/'))
    .catch((err) => setErrors(err));
  }

  return (
    <div>
      {renderField('Name', 'name')}
      {renderField('Username', 'user_name')}
      {renderField('E-mail', 'email')}
      {renderField('Password', 'password')}
      <Button variant="primary" onClick={onClick}>Submit</Button>
    </div>
  );
}

export default UserRegistrationPage;