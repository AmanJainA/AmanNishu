
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Card from "./components/Card";
import Arrangement from "./components/Arrangement";
import EditArrangement from "./components/EditArrangement";
import Video from "./components/Video";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/arrangement" element={<Arrangement />} />
        <Route path="/editarrangement" element={<EditArrangement />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
