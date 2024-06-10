import React, { useState } from 'react';
import './App.css';
 
function App() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
 
  const handleTextChange = (event) => {
    setNewPostText(event.target.value);
  };

  const handleImageChange = (event) => {
    setNewPostImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('text', newPostText);
    if (newPostImage) {
      formData.append('image', newPostImage);
    }
    setPosts([...posts, { data: formData, likes: 0, comments: [] }]);
    setNewPostText('');
    setNewPostImage(null);
  };

  const handleDeletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const handleEditPost = (index) => {
    const editedPostText = prompt('Edit your post:', posts[index].data.get('text'));
    if (editedPostText !== null) {
      const updatedPosts = [...posts];
      updatedPosts[index].data.set('text', editedPostText);
      setPosts(updatedPosts);
    }
  };

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] = (updatedLikes[index] || 0) + 1;
    setLikes(updatedLikes);
  };

  const handleComment = (index, commentText) => {
    const updatedComments = [...comments];
    updatedComments[index] = [...(updatedComments[index] || []), commentText];
    setComments(updatedComments);
  };

  const handleDeleteComment = (postIndex, commentIndex) => {
    const updatedComments = [...comments];
    updatedComments[postIndex].splice(commentIndex, 1);
    setComments(updatedComments);
  };

  return (
    <div className="App">
      <h1 className="title">Just Post!</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={newPostText}
          onChange={handleTextChange}
          rows={4}
          cols={50}
          className="post-text"
        />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} className="post-image" />
        <br />
        <button type="submit" className="post-button">Post</button>
      </form>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <p className="post-text">{post.data.get('text')}</p>
            {post.data.get('image') && (
              <img
                src={URL.createObjectURL(post.data.get('image'))}
                alt="Posted Image"
                className="post-image"
              />
            )}
            <div className="post-actions">
              <button onClick={() => handleEditPost(index)} className="edit-button">Edit</button>
              <button onClick={() => handleDeletePost(index)} className="delete-button">Delete</button>
              <button onClick={() => handleLike(index)} className="like-button">Like ({likes[index] || 0})</button>
            </div>
            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(index, e.target.value);
                    e.target.value = '';
                  }
                }}
                className="comment-input"
              />
              {comments[index] &&
                comments[index].map((comment, commentIndex) => (
                  <div key={commentIndex} className="comment">
                    <p className="comment-text">{comment}</p>
                    <button onClick={() => handleDeleteComment(index, commentIndex)} className="delete-comment-button">Delete</button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
