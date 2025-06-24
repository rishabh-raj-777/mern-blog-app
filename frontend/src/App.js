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
    <div>
      <h1>Blog</h1>
      <PostForm onPostCreated={fetchPosts} />
      <PostList posts={posts} onPostDeleted={fetchPosts} />
    </div>
  );
};

export default App;