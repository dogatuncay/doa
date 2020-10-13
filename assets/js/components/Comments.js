import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Comments = ({data, story_id}) => {

  const comments = data.map((comment) => {
    return (
      <div key={comment.id} className="comment-view">
        <div onClick={() => upvote(comment)}>
          UPVOTE
        </div>
        <div onClick={() => downvote(comment)}>
          DOWNVOTE
        </div>
        <div>
          {comment.upvote}
        </div>
        <div>
          {comment.body} 
        </div>
        <div>
          ADD NEW COMMENT
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

Comments.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PlantList;