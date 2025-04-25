import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FavoritePostsPage = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://json-server-dashboard-gamma.vercel.app/posts?isFavorite=true")
      .then((response) => {
        if (!response.ok) {
          setError("Error fetching favorite posts.");
          setLoading(false);
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        setFavoritePosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

    const handleToggleFavorite = (postId) => {
    const postToUpdate = favoritePosts.find((post) => post.id === postId);
    const updatedPost = {
      ...postToUpdate,
      isFavorite: !postToUpdate.isFavorite,
    };

    fetch(`https://json-server-dashboard-gamma.vercel.app/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update favorite status");
        return response.json();
      })
      .then(() => {
          const updated = favoritePosts.map((post) =>
          post.id === postId ? updatedPost : post
        );
        setFavoritePosts(updated);
        setFilteredPosts(updated);
      })
      .catch((err) => console.error("Error toggling favorite:", err));
  };

  const handleToggleBlock = (postId) => {
    const postToUpdate = favoritePosts.find((post) => post.id === postId);
    const updatedPost = {
      ...postToUpdate,
      isBlocked: !postToUpdate.isBlocked,
    };

    fetch(`https://json-server-dashboard-gamma.vercel.app/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to block/unblock post");
        return response.json();
      })
      .then(() => {
        const updated = favoritePosts.map((post) =>
          post.id === postId ? updatedPost : post
        );
        setFavoritePosts(updated);
        setFilteredPosts(updated);
      })
      .catch((error) => console.error("Error toggling block:", error));
  };

  const handleDelete = (postId) => {
    fetch(`https://json-server-dashboard-gamma.vercel.app/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete post");
        return response.json();
      })
      .then(() => {
        const updated = favoritePosts.filter((post) => post.id !== postId);
        setFavoritePosts(updated);
        setFilteredPosts(updated);
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="favorite-posts-container">
      <h1>Favorite Posts</h1>
        {filteredPosts.length === 0 ? (
        <p>No favorite posts found.
           <Link to="/">Posts</Link></p>
              ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              {post.image && <img src={post.content} alt={'image'} className="post-image" />} 
                  <h2>{post.title}</h2>
              <p>{post.author}</p>
              <button onClick={() => handleToggleFavorite(post.id)}>
                {post.isFavorite ? "Unfavorite" : "Favorite"}
              </button>
              <button onClick={() => handleToggleBlock(post.id)}>
                {post.isBlocked ? "Unblock" : "Block"}
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePostsPage;
