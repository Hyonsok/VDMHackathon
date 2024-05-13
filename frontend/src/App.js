import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Card from "./components/Card";
import ChatWrapper from "./components/chatting/ChatWrapper";
import MainNavbar from "./components/MainNavbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/card" element={<Card />} />
      <Route path="/main" element={<MainNavbar />} />
      <Route path="/main/chat" element={<ChatWrapper />} />
    </Routes>
  );
}

export default App;
