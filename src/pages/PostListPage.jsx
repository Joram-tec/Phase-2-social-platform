import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostListPage.css';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const navigate = useNavigate();

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const url = new URL(`${API_URL}/posts`);
      url.searchParams.append('page', page);
      if (searchTerm) url.searchParams.append('search', searchTerm);
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch posts');
      
      const data = await res.json();
      setPosts(data.posts);
      setPagination({
        page: data.current_page,
        totalPages: data.pages
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  return (
    <div className="post-list-container">
      <header className="post-list-header">
        <h1>Community Posts</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => fetchPosts()}>
            <i className="search-icon">🔍</i>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts found</p>
          <button onClick={() => navigate('/posts/new')}>Create First Post</button>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    onError={(e) => e.target.src = '/default-post.jpg'}
                  />
                )}
                <div className="post-content">
                  <h2 onClick={() => navigate(`/posts/${post.id}`)}>
                    {post.title}
                  </h2>
                  <p className="post-meta">
                    By {post.author?.name || 'Anonymous'} • {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p className="post-excerpt">
                    {post.content.length > 100 
                      ? `${post.content.substring(0, 100)}...` 
                      : post.content}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            {pagination.page > 1 && (
              <button onClick={() => fetchPosts(pagination.page - 1)}>
                Previous
              </button>
            )}
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            {pagination.page < pagination.totalPages && (
              <button onClick={() => fetchPosts(pagination.page + 1)}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}