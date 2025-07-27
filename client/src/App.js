import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Home from "./home";
import Chat from "./chat";
import Login from "./login";
import { useState } from "react";



function App() {
  
 return (
<div>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/login" element={<Login/>} />

  </Routes>
  
  </BrowserRouter>

</div>

  );
}
export default App;