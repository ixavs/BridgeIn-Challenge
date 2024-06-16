import React from 'react';
import { Comment } from '../types';

//Comment structure

interface Props {
  comment: Comment;
}

const CommentComponent: React.FC<Props> = ({ comment }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">Comment by User ID: {comment.name}</h6>
        <p className="card-text">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentComponent;