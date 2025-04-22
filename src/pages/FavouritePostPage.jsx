import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoritePosts = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/posts?isFavorite=true"
        );
        setFavoritePosts(response.data);
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, []);

  const toggleFavorite = async (postId) => {
    try {
      const postToUpdate = favoritePosts.find((post) => post.id === postId);
      const updatedPost = {
        ...postToUpdate,
        isFavorite: !postToUpdate.isFavorite,
      };

      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setFavoritePosts(favoritePosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const toggleBlock = async (postId) => {
    try {
      const postToUpdate = favoritePosts.find((post) => post.id === postId);
      const updatedPost = {
        ...postToUpdate,
        isBlocked: !postToUpdate.isBlocked,
      };

      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setFavoritePosts(
        favoritePosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error toggling block:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
      setFavoritePosts(favoritePosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div className="loading">Loading favorite posts...</div>;

  return (
    <div className="favorite-posts-container">
      <h1>Favorite Posts</h1>

      {favoritePosts.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't favorited any posts yet.</p>
          <Link to="/" className="browse-link">
            Browse Posts
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {favoritePosts.map((post) => (
            <div
              key={post.id}
              className={`post-card ${post.isBlocked ? "blocked" : ""}`}
            >
              {post.isBlocked && <div className="blocked-overlay">BLOCKED</div>}

              <div className="post-content">
                <h3>{post.title}</h3>
                <p className="author">By: {post.author}</p>
                {post.content && (
                  <p className="content-preview">
                    {post.content.substring(0, 100)}
                    {post.content.length > 100 ? "..." : ""}
                  </p>
                )}
              </div>

              <div className="post-actions">
                <Link to={`/posts/${post.id}`} className="action-btn view">
                  👁️ View
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="action-btn edit">
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => toggleFavorite(post.id)}
                  className="action-btn favorite"
                >
                  ❤️ Unfavorite
                </button>

                <button
                  onClick={() => toggleBlock(post.id)}
                  className={`action-btn ${
                    post.isBlocked ? "unblock" : "block"
                  }`}
                >
                  {post.isBlocked ? "✅ Unblock" : "⛔ Block"}
                </button>

                <button
                  onClick={() => deletePost(post.id)}
                  className="action-btn delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePosts;
