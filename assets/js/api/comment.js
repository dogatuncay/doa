import apiRequest from '../api/apiRequest';
import { loadComments } from '../actions/commentActions';
import { loadStoryComments } from '../actions/storyActions';

export function getComments(dispatch, story_id) {
  return apiRequest(`/api/story/${story_id}/comment`, 'GET')
  .then((response) => { 
    console.log(response.result.comments);
    dispatch(loadComments(story_id, response.result.comments));
    dispatch(loadStoryComments(story_id, response.result.comments));
    return response.result;
  });
}