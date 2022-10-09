import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import PostForm from './components/postform';
import Post from './components/post';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.data));
  }, []);

  const addPost = (post) => {
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    })
      .then((res) => res.json())
      .then((data) => setPosts([data.data, ...posts]));
  };

  const deletePost = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        const newPosts = posts.filter((post) => post._id !== id);
        setPosts(newPosts);
      });
  };

  return (
    <div className="react-app-component text-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <PostForm addPost={addPost} />
            {posts.map((post) => (
              <Post key={post._id} post={post} deletePost={deletePost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
