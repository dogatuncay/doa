import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { signIn } from '../api/user';
import InputField from '../components/InputField';

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

  function renderField(label, name) {
    return <InputField label={label} name={name} value={data[name]} errors={errors && name in errors ? errors[name] : ''} onChange={updateField} />
  }

  function onClick() {
    setErrors({});
    signIn(data, dispatch)    
    .then(() => history.push('/'))
    .catch((err) => setErrors(err));
  }

  const errorText = errors && errors.message ? errors.message : '';
  const error = (<div className="alert alert-danger">{errorText}</div>);

  return (
    <div className='SignInPage'>
      <h1>Sign In</h1>
      {renderField('E-mail', 'email')}
      {renderField('Password', 'password')}
      {error}
      <button className='submit-button' type="button" onClick={onClick}>Sign In</button>
    </div>
  );
}

export default SignInPage;