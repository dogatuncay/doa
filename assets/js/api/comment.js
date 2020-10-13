import apiRequest from '../api/apiRequest';
import { loadComments } from '../actions/commentActions';

export function getComments(dispatch, story_id) {
  return apiRequest(`/api/story/${story_id}/comment`, 'GET')
  .then((response) => { 
    dispatch(loadComments(response.result.comments));
    return response.result;
  });
}