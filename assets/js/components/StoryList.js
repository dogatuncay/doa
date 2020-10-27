import React from 'react';

const StoryList = ({data, onClick}) => {
  const stories = data.length === 0 ? (<div>No Stories</div>) : data.map((story) => {
    return (
      <div key={story.id} className="story-view" onClick={() => onClick(story)}>
         {story.title}
      </div>
    ); 
  });

  return (
    <div>
      <div><b>Stories</b></div>
      {stories}
    </div>
  );
}

export default StoryList;