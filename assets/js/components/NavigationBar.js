import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { signOut } from '../api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faBell, faSearch, faLeaf } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const currentUserIndex = useSelector((state) => state.currentUser);
  const currentUserData = useSelector((state) => state.users[currentUserIndex]);

  function onClick() {
    signOut(currentUserData.id, dispatch, (err) => console.error(err));
    history.push("/");
  }

  function handleClick(link) {
    history.push(link);
  }
  
  let userDropdown;
  if(currentUserData) {
    userDropdown = (
      <ul>
        <li><div onClick={() => handleClick("/user_profile_page")}>My Profile</div></li>
        <li><div onClick={() => handleClick("/residence")}>My Residences</div></li>
        <li><div onClick={() => handleClick("/story")}>My Stories</div></li>
        <li><div onClick={onClick}>Sign Out</div></li>
      </ul>
    );
  } else {
    userDropdown = (
      <ul>
        <li><div onClick={() => handleClick("/user_registration_page")}>Create New User</div></li>
        <li><div onClick={() => handleClick("/sign_in_page")}>Sign In</div></li>
      </ul>
    );
  }

  return (
    <div id="navigation-bar">

      <div className="entry" onClick={() => handleClick("/")}>
        {/* <div className="header"> */}
          <div className="brand"><FontAwesomeIcon icon={faLeaf}/></div>
        {/* </div> */}
      </div>

      <div className="entry right">
        <div className="header"><FontAwesomeIcon icon={faUser}/></div>
        <div className="dropdown">
          {userDropdown}
        </div>
      </div>

      <div className="entry right">
        <div className="header"><FontAwesomeIcon icon={faSearch}/></div>
        <div className="dropdown">
          <ul>
            <li><div onClick={() => handleClick("/plant_search_page")}>Plant Search</div></li>
            <li><div onClick={() => handleClick("/plant_index_page")}>Plant Index</div></li>
            <li><div onClick={() => handleClick("/user_search_page")}>User Search Page</div></li>
          </ul>
        </div>
      </div>

      <div className="entry right" onClick={() => handleClick("/")}>
        <div className="header">
          <FontAwesomeIcon icon={faBell}/>
        </div>
      </div>

      <div className="entry right" onClick={() => handleClick("/")}>
        <div className="header">
          <FontAwesomeIcon icon={faHome}/>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;