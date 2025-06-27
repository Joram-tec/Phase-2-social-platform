import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null); 

  useEffect(() => {
    fetch(`https://phase-2-social-platform-backend.onrender.com/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch post.");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data); 
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://phase-2-social-platform-backend.onrender.com/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  if (!post) return <div>Loading post...</div>; 
  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="isFavorite"
            checked={post.isFavorite}
            onChange={handleChange}
          />
          <label className="form-check-label">Favorite</label>
        </div>

        <div className="form-check form-switch mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="isBlocked"
            checked={post.isBlocked}
            onChange={handleChange}
          />
          <label className="form-check-label">Blocked</label>
        </div>

        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
}

export default EditPostPage;
