import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import NavigationBar from '../components/NavigationBar';
import PlantIndexPage from '../pages/PlantIndexPage.js';
import PlantPage from '../pages/PlantPage.js';
import PlantSearchPage from '../pages/PlantSearchPage.js';
import UserRegistrationPage from '../pages/UserRegistrationPage.js';
import UserProfilePage from '../pages/UserProfilePage.js';
import SignInPage from '../pages/SignInPage';
import ResidenceIndexPage from '../pages/ResidenceIndexPage';
import PlantInstanceIndexPage from '../pages/PlantInstanceIndexPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div>
          <NavigationBar />
          {/* <Link to='/plant_index_page'>Plant List</Link> */}

          <Switch> 
            <Route path='/plant_index_page'>
              <PlantIndexPage />
            </Route>
            <Route path='/plants/:id'>
              <PlantPage />
            </Route>
            <Route path='/plant_search_page'>
              <PlantSearchPage />
            </Route>
            <Route path='/user_registration_page'>
              <UserRegistrationPage />
            </Route>
            <Route path='/user_profile_page'>
              <UserProfilePage />
            </Route>
            <Route path='/sign_in_page'>
              <SignInPage />
            </Route>
            <Route path='/residences/:residence_id/plants'>
              <PlantInstanceIndexPage />
            </Route>
            <Route path='/residences'>
              <ResidenceIndexPage />
            </Route>
            <Route path='/change_password_page'>
              <ChangePasswordPage />
            </Route>
          </Switch>

        </div>
      </QueryParamProvider>
    </Router>
  );
}