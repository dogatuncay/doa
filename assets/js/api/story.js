import PropTypes from 'prop-types';
import apiRequest from '../api/apiRequest.js';
import { loadStories, reloadStory, removeStory } from '../actions/storyActions.js';
import { compareObjects, filterObjectByKey } from '../helpers/objectHelpers.js';
  
export const StoryPropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string
});

export function getStories(dispatch, onError) {
  return apiRequest('/api/story', 'GET')
  .then((response) => { 
    dispatch(loadStories(response.result.stories));
    return response.result;
  })
  .catch((err) => onError(err.errors));
}

export function createStory(story, dispatch) {
  return apiRequest(`/api/story`, 'POST', {story})
  .then((response) => { 
    dispatch(loadStories([response.result])); 
    return response.result;
  })
}

export function updateStory(oldStory, newStory, dispatch, onError) {
  if(oldStory.id !== newStory.id) throw new Error("ids don't match");
  if(oldStory !== newStory) {
    const changedFields = compareObjects(oldStory, newStory);
    const story = filterObjectByKey(newStory, changedFields);
    return apiRequest(`/api/story/${newStory.id}`, 'PUT', {story})
    .then((_) => { 
      dispatch(reloadStory(newStory));
      return newStory;
    })
    .catch((err) => onError(err.errors));
  }
}

export function deleteStory(id, dispatch, onError) {
  return apiRequest(`/api/story/${id}`, 'DELETE')
  .then((_) =>{ 
    dispatch(removeStory(id));
  })
  .catch((err) => onError(err.errors));
}