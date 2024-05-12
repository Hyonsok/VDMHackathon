import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Card from "./components/Card";
import Chat from "./components/Chat";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/card" element={<Card />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
