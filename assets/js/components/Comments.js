import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCommentDots} from '@fortawesome/free-solid-svg-icons';

const Comments = ({data}) => {

  const comments = data.map((comment) => {
    return (
      <div key={comment.id}>
        <div className="comment-vote">
          <div onClick={() => downvote(comment)}><FontAwesomeIcon icon={faArrowUp}/></div>
          <div>{comment.upvote}</div>
          <div onClick={() => upvote(comment)}><FontAwesomeIcon icon={faArrowDown}/></div>
        </div>
        <div className="comment-body">
          <div>{comment.body}</div>
          <div>
            Reply<FontAwesomeIcon icon={faCommentDots}/>
          </div>
        </div>
      </div>
    ); 
  });

  return (
    <div>
      {comments}
    </div>
  );
}

// Comments.propTypes = {
//   data: PropTypes.array.isRequired,
//   onClick: PropTypes.func.isRequired
// };

export default Comments;