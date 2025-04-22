import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import { getFavoritePosts, toggleFavorite, toggleBlock } from '../services/api';
import '../styles/posts.css';

const FavoritePostPage = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const data = await getFavoritePosts();
        setFavoritePosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(favoritePosts);
      return;
    }

    const filtered = favoritePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleToggleFavorite = async (postId) => {
    try {
      const updatedPost = await toggleFavorite(postId);
      setFavoritePosts(favoritePosts.filter(post => post.id !== postId));
      setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleBlock = async (postId) => {
    try {
      const updatedPost = await toggleBlock(postId);
      setFavoritePosts(favoritePosts.map(post => 
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
    <div className="favorite-posts-page">
      <Navbar />
      <div className="container">
        <h1>Favorite Posts</h1>
        <SearchBar onSearch={handleSearch} />
        
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
            <p className="no-posts">No favorite posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritePostPage;

