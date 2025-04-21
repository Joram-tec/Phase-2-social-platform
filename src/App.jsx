import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EditPostPage from "./pages/EditPostPage";

function App() {
  const [count, setCount] = useState(0);

  return (
 
     

     
      
<EditPostPage />
   

  
  );
}

export default App;
