import React from 'react';

const UserInfoCard = ({user}) => {
  return (
    <div className="user-info">
      <div>
        Name : {user.name}
      </div>
      <div>
        Username : {user.user_name}
      </div>
    </div>
  );
}

export default UserInfoCard;