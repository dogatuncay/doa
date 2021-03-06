import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getCurrentUser, changePassword } from '../api/user';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner'

const validations = {
  password: {
    'Password must be at least 8 characters long.': (data) => data.password.length < 9,
    'Password must contain a special character (!@#$)': (data) => !RegExp('[!@#\$]').test(data.password)
  },
  password_repeat: {
    "Passwords don't match": (data) => data.password !== data.password_repeat
  }
}

function getValidationErrors(data, name) {
  if(name in validations) {
    return Object.keys(validations[name]).filter((error) => validations[name][error](data))
  } else {
    return [];
  }
}

const ChangePasswordPage = (id) => {
  const history = useHistory();
  const currentUserIndex = useSelector((state) => state.currentUser);
  const currentUserData = useSelector((state) => state.users[currentUserIndex]);

  useEffect(() => {
    if(!currentUserIndex) getCurrentUser(dispatch, (err) => console.error(err));
  }, []);

  const [data, setData] = useState({
    current_password: '',
    password: '',
    password_repeat: ''
  });
  const [apiErrors, setApiErrors] = useState({});

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  function renderField(label, name) {
    const apiErrs = apiErrors && name in apiErrors ? [apiErrors[name]] : '';
    const valErrs = getValidationErrors(data, name).map((err) => ({ message: err, context: {} }));
    const errors = apiErrs.concat(valErrs);
    return <InputField label={label} name={name} value={data[name]} errors={errors} onChange={updateField} />
  }

  function onClick() {
    setApiErrors({});
    changePassword(currentUserData.id, data)
    .then(() => {
      if(Object.keys(apiErrors).length === 0) {
        history.push('/user_profile_page');
      }
    })
    .catch((err) => setApiErrors(err));
  }

  if(currentUserData) {
    return (
      <div className="UserPageCard">
        {renderField('Current Password', 'current_password')}
        {renderField('New Password', 'password')}
        {renderField('Confirm New Password', 'password_repeat')}
        <button className='submit-button' type="button" onClick={onClick}>Submit</button>
      </div>
    );
  }
  else {
    return <Spinner />;
  }
}

export default ChangePasswordPage;