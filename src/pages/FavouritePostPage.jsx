import { useState, useEffect } from 'react';
const FavoritePostPage = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoritePosts();
        setFavoritePosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load favorites.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = (term) => {
    const filtered = favoritePosts.filter(
      post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.author.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleToggleFavorite = async (postId, currentFavorite) => {
    try {
      await toggleFavorite(postId, currentFavorite);
      const updated = favoritePosts.filter(post => post.id !== postId);
      setFavoritePosts(updated);
      setFilteredPosts(updated);
    } catch (err) {
      console.error("Error updating favorite:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Favorite Posts</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggleFavorite={handleToggleFavorite}
          />
        ))
      ) : (
        <p>No favorite posts found.</p>
      )}
    </div>
  );
};

export default FavoritePostPage;
