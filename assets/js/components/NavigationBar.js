import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getCurrentUser, signOut } from '../api/user.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currentUserIndex = useSelector((state) => state.currentUser);
  const currentUserData = useSelector((state) => state.users[currentUserIndex]);

  useEffect(() => {
    if(!currentUserIndex) getCurrentUser(dispatch, (err) => console.error(err));
  }, []);

  function onClick() {
    signOut(currentUserData.id, dispatch, (err) => console.error(err));
  }


  let userDropdown;
  if(currentUserData) {
    userDropdown = (
      <>
        <NavDropdown.Item href="/user_profile_page">My profile</NavDropdown.Item>
        <NavDropdown.Item href="/residences">My residences</NavDropdown.Item>
        <NavDropdown.Item href="/stories">My stories</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/" onClick={onClick}>Sign Out</NavDropdown.Item>
      </>
    );
  } else {
    userDropdown = (
      <>
        <NavDropdown.Item href="/user_registration_page">Create New User</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/sign_in_page">Sign In</NavDropdown.Item>
      </>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Doa</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/"><FontAwesomeIcon icon={faHome} /></Nav.Link>
        <Nav.Link href="/"><FontAwesomeIcon icon={faBell} /></Nav.Link>
        <NavDropdown id="basic-nav-dropdown" title={<FontAwesomeIcon icon={faSearch}/>}>
            <NavDropdown.Item href="/plant_search_page">Plant Search</NavDropdown.Item>
            <NavDropdown.Item href="/plant_index_page">Plant Index</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          id="basic-nav-dropdown" 
          title={<FontAwesomeIcon icon={faUser}/>}>
          {userDropdown}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default NavigationBar;