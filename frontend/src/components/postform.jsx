import { useState } from 'react';

export default function PostForm({ addPost }) {
  const [post, setPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(post);
    setPost('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Enter your post</label>
          <textarea
            onChange={(e) => setPost(e.target.value)}
            value={post}
            className="form-control"
            id="post-content"
            rows="3"
          ></textarea>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
