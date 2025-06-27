import React from 'react';

const PostList = ({ posts, onPostDeleted }) => {
  const handleDelete = async (id) => {
    await fetch(`http://backend:5000/api/posts/${id}`, { method: 'DELETE' });
    onPostDeleted();
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255,255,255,0.8)'
          }}
        >
          <div style={{ flex: 1 }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
          {post.image && (
            <img
              src={post.image}
              alt="Blog"
              style={{
                width: '200px',
                height: 'auto',
                objectFit: 'cover',
                marginLeft: '20px',
                borderRadius: '6px'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
