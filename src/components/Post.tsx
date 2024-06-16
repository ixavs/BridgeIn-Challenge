
import React from 'react';
import { Post } from '../types';

//Post structure

interface Props {
  post: Post;
}

const PostComponent: React.FC<Props> = ({ post }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        User ID: {post.userId}
      </div>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
      </div>
    </div>
  );
};

export default PostComponent;