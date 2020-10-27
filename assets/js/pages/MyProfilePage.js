import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getCurrentUser, updatePrivacy } from '../api/user';
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner';

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

  function toChangePasswordPage() {
    history.push('/change_password_page');
  }

  function togglePrivacy() {
    updatePrivacy(currentUserData.id, {is_public: !currentUserData.is_public}, dispatch)
    .catch((err) => console.error(err));
  }

  if(currentUserData) {
    const label = currentUserData.is_public ? "Private" : "Public"
    return (
      <div className="UserPageCard">
        <InfoField key="name" label="Name" info={currentUserData.name} />
        <InfoField key="username" label="Username" info={currentUserData.user_name} />
        <Button variant="link" onClick={toChangePasswordPage}>Change Password</Button>
        <Button variant="link" onClick={togglePrivacy}>Set Privacy to {label}</Button>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default MyProfilePage;