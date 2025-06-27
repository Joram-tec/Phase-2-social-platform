import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostListPage.css'; // Reuse styles

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        
        const res = await fetch(`${API_URL}/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error(res.status === 401 
          ? 'Please login to view favorites' 
          : 'Failed to fetch favorites');
        
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error:', error.message);
        if (error.message.includes('login')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  return (
    <div className="post-list-container">
      <h1>Your Favorite Posts</h1>
      
      {loading ? (
        <div className="loader">Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't favorited any posts yet</p>
          <button onClick={() => navigate('/posts')}>
            Browse Posts
          </button>
        </div>
      ) : (
        <div className="posts-grid">
          {favorites.map(fav => (
            <article key={fav.id} className="post-card">
              {fav.post.image_url && (
                <img 
                  src={fav.post.image_url} 
                  alt={fav.post.title}
                  onError={(e) => e.target.src = '/default-post.jpg'}
                />
              )}
              <div className="post-content">
                <h2 onClick={() => navigate(`/posts/${fav.post.id}`)}>
                  {fav.post.title}
                </h2>
                <p className="post-meta">
                  Favorited on {new Date(fav.created_at).toLocaleDateString()}
                </p>
                <p className="post-excerpt">
                  {fav.post.content.length > 100 
                    ? `${fav.post.content.substring(0, 100)}...` 
                    : fav.post.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}