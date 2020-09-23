import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { signOut } from '../api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

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

      <div className="entry right">
        <div class="header"><FontAwesomeIcon icon={faUser}/></div>
        <div className="dropdown">
          {userDropdown}
        </div>
      </div>
    </div>
  //   <div className='navigation-bar-controls'>
  //     <div className="navigation-bar-auto-order">
  //       <div className="navigatin-link"><a href="/"><FontAwesomeIcon icon={faHome} /></a></div>
  //       <div className="navigatin-link"><a href="/"><FontAwesomeIcon icon={faBell} /></a></div>
  //       <div className="navigation-dropdown"> 
  //           <div className="navigation-dropdown-icon">
  //             <FontAwesomeIcon icon={faSearch}/>
  //           </div>
    
  //       <div className="navigation-dropdown">
  //         <div className="navigation-dropdown-icon">
  //           <FontAwesomeIcon icon={faUser}/>
  //         </div>
  //         {userDropdown}  
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
}

export default NavigationBar;