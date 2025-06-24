import React from 'react';
import axios from 'axios';

const PostList = ({ posts, onPostDeleted }) => {
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    onPostDeleted();
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;