import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getStory } from '../api/story';
import { getComments } from '../api/comment';
import { buildCommentIdTrees }  from '../helpers/buildTree';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';

const StoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => state.stories[id]);
  const comments = story && story.comments ? story.comments : [];

  const commentTrees = buildCommentIdTrees(comments);

  useEffect(() => {
    if(!story || !story.body) {
      getStory(dispatch, id)
      .catch((err) => console.error(err.errors));
    }
  }, [id]);

  useEffect(() => {
    if(story === null || story === undefined || story.comments === null || story.comments === undefined) {
      getComments(id, dispatch)
      .catch((err) => console.error(err.errors));
    }
  }, [id]);

  let commentsElement;
  if(comments) {
    commentsElement = <>{commentTrees.flatMap((tree) => tree.depthFirstReduce((comment_id, children) => <Comment key={comment_id} story_id={id} comment_id={comment_id}>{children}</Comment>))}</>
  }
  else {
    commentsElement = <Spinner />
  }
  
  if(story) {
    return (
      <div className="StoryPage">
        <div className="story-title">{story.title}</div>
        <div>{story.body}</div>
        <div>
          TODO: Controls 
        </div>
        {commentsElement}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default StoryPage;