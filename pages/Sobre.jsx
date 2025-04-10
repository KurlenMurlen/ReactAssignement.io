import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

function Sobre() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sobre" className="nav-link">Sobre</Link>
        <Link to="/contato" className="nav-link">Contato</Link>
      </nav>

      {/* Conteúdo principal */}
      <div className="mainContainer">
        <h1 className="text-3xl font-semibold mb-4">Sobre o Projeto</h1>
        <p className="mb-4 text-lg text-gray-700 leading-relaxed">
          Este sistema foi desenvolvido com foco na simplicidade e eficiência para gestão de usuários.
          Utilizando React para o frontend e Node.js com Express no backend, ele permite operações CRUD de forma fluida.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
         A mari é mucho mucho linda
        </p>
      </div>
    </div>
  );
}

export default Sobre;
