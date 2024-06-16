// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import NavBar from './components/Navbar';
import { Post, Comment } from './types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPosts();
    fetchComments();
  }, []);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const addComment = (comment: Comment) => setComments([...comments, comment]);

  const updateComment = (updatedComment: Comment) => {
    setComments(comments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment)));
  };

  const deleteComment = (id: number) => setComments(comments.filter(comment => comment.id !== id));

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} addPost={addPost} />} // Pass addPost to Home component
        />
        <Route
          path="/posts/:id"
          element={
            <PostPage
              posts={posts}
              comments={comments}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
