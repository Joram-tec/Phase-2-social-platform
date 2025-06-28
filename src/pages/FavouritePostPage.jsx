import { useState, useEffect } from 'react';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = () => {
    setLoading(true);
    fetch(`${API_URL}/favorites`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load favorites');
        return res.json();
      })
      .then(data => {
        setFavorites(Array.isArray(data) ? data : []);
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleUnfavorite = (favoriteId) => {
    fetch(`${API_URL}/favorites/${favoriteId}`, {
      method: 'DELETE',
    })
      .then(() => fetchFavorites())
      .catch(err => alert('Unfavorite failed: ' + err.message));
  };

  const toggleBlock = (post) => {
    const isBlocked = post.isBlocked;

    if (isBlocked) {
      fetch(`${API_URL}/blocked-posts/${post.blockedId}`, {
        method: 'DELETE',
      })
        .then(() => fetchFavorites())
        .catch(err => alert('Failed to unblock: ' + err.message));
    } else {
      fetch(`${API_URL}/blocked-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      })
        .then(() => fetchFavorites())
        .catch(err => alert('Failed to block: ' + err.message));
    }
  };

  return (
    <div className="container">
      <h1>Favorite Posts</h1>

      {loading && <p>Loading favorites...</p>}

      <div className="posts">
        {!loading && favorites.length === 0 ? (
          <p>No favorite posts found.</p>
        ) : (
          favorites.map(({ id: favoriteId, post }) => (
            <div key={post.id} className="post">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-actions">
                <button
                  className="unfavorite"
                  onClick={() => handleUnfavorite(favoriteId)}
                >
                  ★ Unfavorite
                </button>

                <button
                  className={post.isBlocked ? 'blocked' : 'unblocked'}
                  onClick={() => toggleBlock(post)}
                >
                  {post.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
