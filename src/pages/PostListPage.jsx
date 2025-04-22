import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts'); 
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <img alt='image' src={post.content} />
            <button>
                 <Link to={`/edit/1${post.id}`} >Edit</Link>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostListPage;

