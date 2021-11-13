import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

export default function Post({ post }) {
  const publicFolder = 'http://localhost:8080/images/';
  return (
    <div className='post'>
      <Link to={`/post/${post._id}`}>
        {post.photo && (
          <img className='postImg' src={publicFolder + post.photo} alt='' />
        )}
      </Link>
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map((cat, index) => (
            <span key={index} className='postCat'>
              {cat.name}
            </span>
          ))}
        </div>
        <Link className='link' to={`/post/${post._id}`}>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post.description}</p>
    </div>
  );
}
