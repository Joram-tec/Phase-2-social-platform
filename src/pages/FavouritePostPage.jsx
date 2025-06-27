import { useState, useEffect } from 'react';

function FavouritePostPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://phase-2-social-platform-backend.onrender.com/api/favorites', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
    .then(res => { if (!res.ok) throw new Error('Unable to fetch favorites'); return res.json(); })
    .then(data => { setFavorites(data); setLoading(false); })
    .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (loading) return <div>Loading favorites...</div>;

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      {favorites.map(fav => (
        <div key={fav.favorite_id} className="favorite-card">
          <h3>{fav.post.title}</h3>
          {fav.post.imageUrl && (
            <img src={fav.post.imageUrl} alt={fav.post.title}
              onError={e => e.target.src = 'https://via.placeholder.com/150'}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <p>{fav.post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default FavouritePostPage;
