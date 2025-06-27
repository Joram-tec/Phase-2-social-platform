import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/favorites`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(data => setFavorites(data || []))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const removeFavorite = (postId) => {
    fetch(`${API_URL}/posts/${postId}/favorite`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(() => {
      setFavorites(favorites.filter(fav => fav.post.id !== postId));
    })
    .catch(error => console.error('Error removing favorite:', error));
  };

  return (
    <div className="container">
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="posts">
          {favorites.map(fav => (
            <div key={fav.post.id} className="post">
              {fav.post.imageUrl && <img src={fav.post.imageUrl} alt={fav.post.title} onError={(e) => e.target.style.display = 'none'} />}
              <h3>{fav.post.title}</h3>
              <p>{fav.post.content}</p>
              <button 
                className="favorite active"
                onClick={() => removeFavorite(fav.post.id)}
              >
                ★ Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}