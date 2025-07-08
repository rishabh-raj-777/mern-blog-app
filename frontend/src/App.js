import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/19366.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        color: 'black',
        fontWeight: '800',
      }}
    >
      <h1 style={{ textAlign: 'center', fontWeight: '700' }}>Blog</h1>
      <PostForm onPostCreated={fetchPosts} />
      <PostList posts={posts} onPostDeleted={fetchPosts} />
    </div>
  );
};

export default App;
