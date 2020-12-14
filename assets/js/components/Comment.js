import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp,
  faArrowDown, 
  faCommentDots, 
  faCheck, 
  faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import { createComment } from '../api/comment';

const Comment = ({story_id, comment_id, children}) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comments[comment_id]);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  function beginCreating() {
    setIsEditing(true);
  }

  function cancelChanges() {
    setIsEditing(false);
  }

  function updateComment(value) {
    setNewComment(value);
  }
  let replyElement;
  if(isEditing) {
    const saveComment = () => {
      if(newComment !== ''){
        createComment(story_id, newComment, comment_id, dispatch)
        .then(()=> setIsEditing(false))
        .catch((err) => setError(err));
      }
      else {
        setError("Comment can't be blank.")
      }
    };
    replyElement = <div>
      <input onChange={(e) => updateComment(e.target.value)}/>
      <FontAwesomeIcon icon={faCheck} onClick={() => saveComment()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancelChanges()}/>
    </div>
  }
  else {
    replyElement = <FontAwesomeIcon icon={faCommentDots} size="lg" onClick={() => beginCreating()}/>
  }

  return (
    <div key={comment.id} className="comment-container">
      <div className="comment-vote">
        <div onClick={() => upvote(comment)}><FontAwesomeIcon icon={faArrowUp}/></div>
        <div>{comment.upvote}</div>
        <div onClick={() => downvote(comment)}><FontAwesomeIcon icon={faArrowDown}/></div>
      </div>
      <div className="comment-body">
        <div className="comment-body-text">
          <div>{comment.body}</div>
          {replyElement}
        </div>
        {children}
        <div>{error}</div>
      </div>
    </div>
  ); 
}

export default Comment;