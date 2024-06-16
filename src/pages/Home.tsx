import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { Post } from '../types';

//Home page

interface Props {
  posts: Post[];
  addPost: (newPost: Post) => void;
}

const Home: React.FC<Props> = ({ posts, addPost }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  const handleAddPost = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewPostTitle('');
    setNewPostBody('');
  };

  const handleSavePost = () => {
    const newPost: Post = {
      id: posts.length + 1, // Replace with actual logic for generating ID
      title: newPostTitle,
      body: newPostBody,
      userId: 1, // Replace with actual user ID
    };

    addPost(newPost);
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Home</h1>
        <Button  className='btn-sm' onClick={handleAddPost}>Add Post</Button>
      </div>
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-sm btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newPostTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newPostTitle}
                onChange={e => setNewPostTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPostBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newPostBody}
                onChange={e => setNewPostBody(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-sm' variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className='btn btn-sm' variant="primary" onClick={handleSavePost}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
