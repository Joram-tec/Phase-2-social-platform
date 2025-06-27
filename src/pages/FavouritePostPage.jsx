// FavouritePostPage.jsx

import React, { useState, useEffect } from 'react';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com';

function FavouritePostPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    fetch(`${API_URL}/api/favorites`, {
      method: 'GET',
      credentials: 'include', // ✅ Include token/cookies
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Please log in to view favorites');
          }
          throw new Error('Failed to fetch favorites');
        }
        return res.json();
      })
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading favorites...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="favorite-list-container">
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map(fav => {
          const post = fav.post;
          return post ? (
            <div key={fav.favorite_id} className="favorite-card">
              <h3>{post.title}</h3>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ maxWidth: '100%', height: 'auto' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                />
              )}

              <p>{post.content}</p>
            </div>
          ) : (
            <div key={fav.favorite_id} className="favorite-card">
              <p>Post no longer available</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FavouritePostPage;
