import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import fetchAPI from '../fetchAPI.js';
import Field from '../components/Field.js';


const UserRegistrationPage = () => {
  // const dispatch = useDispatch();
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

  function field(name) {
    return <Field name={name} value={data[name]} error={name in errors ? errors[name] : null} onChange={updateField} />
  }
  
  function submit() {
    setErrors({});
    fetchAPI('/api/user/new', 'POST', {user: data})
      .then((response) => {
        console.log(response);
      })
      .catch((errResult) => {
        setErrors(errResult.errors);
      });
  }

  return (
    <div>
      {field('name')}
      {field('user_name')}
      {field('email')}
      {field('password')}
      <Button variant="primary" onClick={submit}>Submit</Button>
    </div>
  );
}

export default UserRegistrationPage;