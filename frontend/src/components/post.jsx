import { useState } from 'react';
import moment from 'moment';

export default function Post({ post, deletePost }) {
  const date = moment(post.createdAt).format('MMM D, YYYY - h:mm A');
  return (
    <div className="card text-white bg-dark my-3 text-start">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
        <p className="card-text">{post.post}</p>
        <button
          onClick={() => deletePost(post._id)}
          className="btn btn-danger mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
