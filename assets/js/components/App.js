import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import PlantIndexPage from '../pages/PlantIndexPage.js';
import PlantPage from '../pages/PlantPage.js';
import PlantSearchPage from '../pages/PlantSearchPage.js';
import UserRegistrationPage from '../pages/UserRegistrationPage.js';
import UserProfilePage from '../pages/UserProfilePage.js';
import SignInPage from '../pages/SignInPage';
import NavigationBar from '../components/NavigationBar';

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div>
          <NavigationBar />
          {/* <Link to='/plant_index_page'>Plant List</Link> */}
          <div>
            Hosgeldiniz bebegim iyi dikmeler
          </div>

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
          </Switch>

        </div>
      </QueryParamProvider>
    </Router>
  );
}