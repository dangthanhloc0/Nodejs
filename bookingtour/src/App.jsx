

import { BrowserRouter, Routes, Route } from "react-router";

import Main from './pages/Main';
import About from './pages/About';
import Header from "./components/Header";
import Footer from "./components/footer";
import Login from './pages/Login';
import Register  from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
  </BrowserRouter>
  )
}

export default App
