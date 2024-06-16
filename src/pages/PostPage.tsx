import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, Comment } from '../types';
import CommentModal from '../components/CommentModal';

interface Props {
  posts: Post[];
  comments: Comment[];
  addComment: (comment: Comment) => void;
  updateComment: (updatedComment: Comment) => void;
  deleteComment: (id: number) => void;
}

const PostPage: React.FC<Props> = ({ posts, comments, addComment, updateComment, deleteComment }) => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const post = postId ? posts.find(post => post.id === postId) : undefined;

  const [showModal, setShowModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  const handleShowModal = (comment?: Comment) => {
    setCommentToEdit(comment || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCommentToEdit(null);
  };

  const handleSaveComment = (comment: Comment) => {
    if (!postId) return; // Ensure postId is defined

    if (commentToEdit) {
      updateComment(comment);
    } else {
      addComment({ ...comment, postId, id: nextCommentId });
    }
    handleCloseModal();
  };

  const handleDeleteComment = (id: number) => {
    deleteComment(id);
  };

  const nextCommentId = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;

  return (
    <div className="container mt-4">
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Comments</h4>
        <button className="btn btn-primary mb-4 btn-sm" onClick={() => handleShowModal()}>
          Add Comment
        </button>
      </div>
      <ul className="list-group">
        {comments
          .filter(comment => comment.postId === postId)
          .map(comment => (
            <li key={comment.id} className="list-group-item">
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
              <div>
                <button className="btn btn-secondary mr-2  btn-sm" onClick={() => handleShowModal(comment)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      <CommentModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSaveComment}
        commentToEdit={commentToEdit}
        lastPostId={postId}
        nextCommentId={nextCommentId} // Pass the next comment ID
      />
    </div>
  );
};

export default PostPage;
