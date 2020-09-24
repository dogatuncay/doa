import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createNewUser } from '../api/user';
import InputField from '../components/InputField';

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
    <div className="UserPageCard">
      {renderField('Name', 'name')}
      {renderField('Username', 'user_name')}
      {renderField('E-mail', 'email')}
      {renderField('Password', 'password')}
      <button className='submit-button' type="button" onClick={onClick}>Sign Up</button>
    </div>
  );
}

export default UserRegistrationPage;