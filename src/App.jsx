import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/HomePage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import FavouritePostPage from "./pages/FavouritePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import './App.css';


function App() {
    return (  
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/favourites" element={<FavouritePostPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
        </Routes>
      </div>
  );
}

export default App;
