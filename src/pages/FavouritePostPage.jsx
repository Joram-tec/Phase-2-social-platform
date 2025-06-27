import { useState, useEffect } from 'react';

function FavouritePostPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('https://phase-2-social-platform-backend.onrender.com/api/favorites', {
      method: 'GET',
      credentials: 'include', // Include this for authenticated requests
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) throw new Error('Please log in to view favorites');
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
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map(fav => (
          <div key={fav.favorite_id} className="favorite-card">
            <h3>{fav.post.title}</h3>
            {fav.post.imageUrl && (
              <img
                src={fav.post.imageUrl}
                alt={fav.post.title}
                style={{ maxWidth: '100%', height: 'auto' }}
                onError={e => { e.target.src = 'https://via.placeholder.com/150' }}
              />
            )}
            <p>{fav.post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavouritePostPage;
