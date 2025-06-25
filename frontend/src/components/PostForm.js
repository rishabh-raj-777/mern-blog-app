import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !content) return;

  //   await axios.post('http://localhost:5000/api/posts', {
  //     title,
  //     content,
  //     image
  //   });

  //   setTitle('');
  //   setContent('');
  //   setImage('');
  //   onPostCreated();
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title || !content) return;

  await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, {
    title,
    content,
    image
  });

  setTitle('');
  setContent('');
  setImage('');
  onPostCreated();
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
