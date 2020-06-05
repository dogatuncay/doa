import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';

import PlantIndexPage from '../pages/PlantIndexPage.js';
import PlantPage from "../pages/PlantPage.js";
import PlantSearchPage from "../pages/PlantSearchPage.js";

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/plant_index_page">Plant List</Link>
              </li>
              <li>
                <Link to="/plant_search_page">Plant Search</Link>
              </li>
            </ul>
          </nav>

          <Switch> 
            <Route path="/plant_index_page">
              <PlantIndexPage />
            </Route>
            <Route path="/plants/:id">
              <PlantPage />
            </Route>
            <Route path="/plant_search_page">
              <PlantSearchPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

        </div>
      </QueryParamProvider>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
