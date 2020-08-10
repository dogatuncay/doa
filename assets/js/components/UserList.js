import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { followUser } from '../api/user.js';

const UserList = ({data, onClick}) => {
  const dispatch = useDispatch();

  function follow(id, follow) {
    followUser(id, follow, dispatch)
      .catch((err) => console.error(err));
  }

  const users = data.map((user) => {
    return (
      <div key={user.id} className="user-search-view">
        <div onClick={() => onClick(user)}> {user.name}  ({user.user_name}) </div>
        <div>
          {user.am_following ? 
            <Button variant="outline-primary" onClick={() => follow(user.id, !user.am_following)}>Unfollow</Button>
            :
            <Button variant="outline-primary" onClick={() => follow(user.id, !user.am_following)}>Follow</Button>
          }
        </div> 
      </div>
    ); 
  });

  return (
    <div>
      {users}
    </div>
  );
};

UserList.propTypes = {
  data: PropTypes.array.isRequired
};

export default UserList;