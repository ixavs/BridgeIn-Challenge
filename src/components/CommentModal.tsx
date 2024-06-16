import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Comment } from '../types';

interface Props {
  show: boolean;
  onHide: () => void;
  onSave: (comment: Comment) => void;
  commentToEdit?: Comment | null;
  lastPostId: number | undefined;
  nextCommentId: number; // Add this prop to track the next comment ID
}

const CommentModal: React.FC<Props> = ({ show, onHide, onSave, commentToEdit, lastPostId, nextCommentId }) => {
  const [comment, setComment] = useState<Comment>({
    id: commentToEdit?.id || nextCommentId,
    postId: lastPostId || 0,
    name: commentToEdit?.name || '',
    email: commentToEdit?.email || '',
    body: commentToEdit?.body || '',
  });

  useEffect(() => {
    if (commentToEdit) {
      setComment({
        ...commentToEdit,
        postId: lastPostId || 0,
      });
    } else {
      resetForm();
    }
  }, [commentToEdit, lastPostId, nextCommentId]);

  const handleSave = () => {
    const commentToSave: Comment = {
      ...comment,
      id: comment.id || nextCommentId,
      postId: lastPostId || 0,
    };

    onSave(commentToSave);
    onHide();
    resetForm();
  };

  const resetForm = () => {
    setComment({
      id: nextCommentId,
      postId: lastPostId || 0,
      name: '',
      email: '',
      body: '',
    });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{commentToEdit ? 'Edit Comment' : 'Add Comment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={comment.name}
              onChange={e => setComment({ ...comment, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={comment.email}
              onChange={e => setComment({ ...comment, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBody">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your comment"
              value={comment.body}
              onChange={e => setComment({ ...comment, body: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;