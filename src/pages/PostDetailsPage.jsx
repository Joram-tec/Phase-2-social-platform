import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id]);

  const toggleFavorite = async () => {
    const updatedPost = { ...post, isFavorite: !post.isFavorite };
    await axios.patch(`http://localhost:3000/posts/${id}`, {
      isFavorite: updatedPost.isFavorite
    });
    setPost(updatedPost);
  };

  const toggleBlock = async () => {
    const updatedPost = { ...post, isBlocked: !post.isBlocked };
    await axios.patch(`http://localhost:3001/posts/${id}`, {
      isBlocked: updatedPost.isBlocked
    });
    setPost(updatedPost);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{post.title}</h1>
        <div>
          <button 
            onClick={toggleFavorite} 
            className={`btn ${post.isFavorite ? 'btn-warning' : 'btn-outline-warning'} me-2`}
          >
            {post.isFavorite ? '♥ Favorited' : '♡ Favorite'}
          </button>
          <button 
            onClick={toggleBlock} 
            className={`btn ${post.isBlocked ? 'btn-danger' : 'btn-outline-danger'}`}
          >
            {post.isBlocked ? '⛔ Blocked' : 'Block'}
          </button>
        </div>
      </div>
      
      <h3 className="text-muted">By {post.author}</h3>
      
      <div className="card mt-4">
        <div className="card-body">
          <p className="card-text">{post.content}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-secondary me-2">Back</button>
        <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">Edit</button>
      </div>
    </div>
  );
}

export default PostDetails;