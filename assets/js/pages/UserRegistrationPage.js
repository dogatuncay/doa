import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { createNewUser } from '../api/user.js';
import InputField from '../components/InputField.js';

const UserRegistrationPage = () => {
  const dispatch = useDispatch();
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

  function field(name) {
    return <InputField name={name} value={data[name]} error={name in errors ? errors[name] : null} onChange={updateField} />
  }

  function onClick() {
    setErrors({});
    createNewUser(data, dispatch,  (err) => SetErrors(err));
  }

  return (
    <div>
      {field('name')}
      {field('user_name')}
      {field('email')}
      {field('password')}
      <Button variant="primary" onClick={onClick}>Submit</Button>
    </div>
  );
}

export default UserRegistrationPage;