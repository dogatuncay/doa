import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getUser } from '../api/user';
import Spinner from '../components/Spinner';
import UserInfoCard from '../components/UserInfoCard';
import StoryList from '../components/StoryList';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const user = useSelector((state) => state.users[id]);
  const stories = useSelector((state) => {
    return user && user.story_index && Object.keys(state.stories).length > 0 ? user.story_index.map((id) => state.stories[id]) : []
  });

  useEffect(() => {
    if(!user || !('story_index' in user)) {
      getUser(id, dispatch)
      .catch((err) => console.error(err.errors));
    }
  }, [id, user]);

  function viewStory(story) {
    history.push(`/user/${id}/story/${story.id}`);
  }

  if(user && user.is_permitted && stories) {
    return (
      <div>
        <UserInfoCard user={user} />
        <StoryList data={stories} onClick={(story) => viewStory(story)} />
      </div>
    );
  }
  else if(user && !user.is_permitted) {
    return (
      <div>
        <UserInfoCard user={user} />
        <div>
          This Account Is Private
        </div>
      </div>
    );
  }
  else {
    return <Spinner />;
  }
}

export default UserProfilePage;