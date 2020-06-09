import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../api/user.js';
import Spinner from '../components/Spinner.js'
import InfoField from '../components/InfoField.js'

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const currentUserIndex = useSelector((state) => state.currentUser);
  const currentUserData = useSelector((state) => state.users[currentUserIndex]);

  useEffect(() => {
    if(!currentUserIndex) getCurrentUser(dispatch, (err) => console.error(err));
  }, []);

  if(currentUserData) {
    return (
      <div>
        {Object.keys(currentUserData).map((key) => <InfoField key={key} label={key} info={currentUserData[key]} />)}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserProfilePage;