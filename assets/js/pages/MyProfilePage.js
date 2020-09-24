import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getCurrentUser } from '../api/user';
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner'

const InfoField = ({label, info}) => {
  return (
    <div key={label}>
      {label}: {info}
    </div>
  );
}

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUserIndex = useSelector((state) => state.currentUser);
  const currentUserData = useSelector((state) => state.users[currentUserIndex]);

  useEffect(() => {
    if(!currentUserIndex) getCurrentUser(dispatch, (err) => console.error(err));
  }, []);

  function onClick() {
    history.push('/change_password_page');
  }

  if(currentUserData) {
    return (
      <div className="UserPageCard">
        {Object.keys(currentUserData).map((key) => <InfoField key={key} label={key} info={currentUserData[key]} />)}
        <Button variant="link" onClick={onClick}>Change Password</Button>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default MyProfilePage;