import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Principal from "./components/Principal";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

function App() {
  return (
    <Router>
      

      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
