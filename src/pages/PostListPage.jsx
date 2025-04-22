import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import { getAllPosts, toggleFavorite, toggleBlock } from '../services/api';
import '../styles/posts.css';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleToggleFavorite = async (postId) => {
    try {
      const updatedPost = await toggleFavorite(postId);
      setPosts(posts.map(post => 
        post.id === postId ? updatedPost : post
      ));
      setFilteredPosts(filteredPosts.map(post => 
        post.id === postId ? updatedPost : post
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleBlock = async (postId) => {
    try {
      const updatedPost = await toggleBlock(postId);
      setPosts(posts.map(post => 
        post.id === postId ? updatedPost : post
      ));
      setFilteredPosts(filteredPosts.map(post => 
        post.id === postId ? updatedPost : post
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-list-page">
      <Navbar />
      <div className="container">
        <h1>All Posts</h1>
        <SearchBar onSearch={handleSearch} />
        <Link to="/add-post" className="add-post-btn">
          Add New Post
        </Link>
        
        <div className="posts-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onToggleFavorite={handleToggleFavorite}
                onToggleBlock={handleToggleBlock}
                showActions={true}
              />
            ))
          ) : (
            <p className="no-posts">No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostListPage;

