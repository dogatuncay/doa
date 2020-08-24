import { combineReducers } from 'redux'

import * as plants from './plants'
import * as plantInstances from './plantInstances'
import * as users from './users'
import * as residences from './residences'
import * as stories from './stories'

const allSubReducers = {
  plants, 
  plantInstances, 
  users, 
  residences, 
  stories
};

let seenReducerEntries = {};
Object.keys(allSubReducers).forEach((reducerName) => {
  const reducer = allSubReducers[reducerName];
  if('default' in reducer)
    throw new Error(`reducer "${reducerName}" should not have any default exports`);
  Object.keys(reducer).forEach((reducerEntry) => {
    if(reducerEntry in seenReducerEntries)
      throw new Error(`reducer "${reducerName}" exports "${reducerEntry}", but reducer "${seenReducerEntries[reducerEntry]}" also exports "${reducerEntry}"`);
    seenReducerEntries[reducerEntry] = reducerName;
  });
});

const reducerObject = Object.assign({}, ...Object.values(allSubReducers));
const reducers = combineReducers(reducerObject);
export default reducers;