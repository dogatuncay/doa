import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import NavigationBar from './NavigationBar';
import NotFound from '../components/NotFound';
import HomePage from '../pages/HomePage';
import PlantIndexPage from '../pages/PlantIndexPage';
import PlantPage from '../pages/PlantPage';
import PlantSearchPage from '../pages/PlantSearchPage';
import UserRegistrationPage from '../pages/UserRegistrationPage';
import MyProfilePage from '../pages/MyProfilePage';
import SignInPage from '../pages/SignInPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ResidenceIndexPage from '../pages/ResidenceIndexPage';
import PlantInstanceIndexPage from '../pages/PlantInstanceIndexPage';
import StoryIndexPage from '../pages/StoryIndexPage';
import UserSearchPage from '../pages/UserSearchPage';

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div className="doa-app">
          <NavigationBar />

          <Switch> 
            <Route path='/plant_index_page'>
              <PlantIndexPage />
            </Route>
            <Route path='/plant/:id'>
              <PlantPage />
            </Route>
            <Route path='/plant_search_page'>
              <PlantSearchPage />
            </Route>
            <Route path='/user_registration_page'>
              <UserRegistrationPage />
            </Route>
            <Route path='/user_profile_page'>
              <MyProfilePage />
            </Route>
            <Route path='/sign_in_page'>
              <SignInPage />
            </Route>
            <Route path='/residence/:residence_id/plant'>
              <PlantInstanceIndexPage />
            </Route>
            <Route path='/residence'>
              <ResidenceIndexPage />
            </Route>
            <Route path='/story'>
              <StoryIndexPage />
            </Route>
            <Route path='/change_password_page'>
              <ChangePasswordPage />
            </Route>
            <Route path='/user_search_page'>
              <UserSearchPage />
            </Route>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </QueryParamProvider>
    </Router>
  );
}