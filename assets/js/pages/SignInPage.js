import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { signIn } from '../api/user.js';
import InputField from '../components/InputField.js';

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  function field(name) {
    return <InputField name={name} value={data[name]} error={errors && name in errors ? errors[name] : null} onChange={updateField} />
  }

  function onClick() {
    setErrors({});
    signIn(data, dispatch, (err) => setErrors(err))
    .then(() => {
      history.push('/');
    })
  }

  return (
    <div>
      {field('email')}
      {field('password')}
      <Button variant="primary" onClick={onClick}>Sign In</Button>
    </div>
  );
}

export default SignInPage;