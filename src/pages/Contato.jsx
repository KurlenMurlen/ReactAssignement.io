import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

function Contato() {
  return (
    <div className="body1">
      <nav className="mainContainer" style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: "20px" }}>
        <Link to="/" className="App-link">Início</Link>
        <Link to="/sobre" className="App-link">Sobre</Link>
        <Link to="/contato" className="App-link">Contato</Link>
      </nav>

      <div className="mainContainer">
        <h1>Fale Conosco</h1>
        <p style={{ marginTop: "15px" }}>
          Caso você tenha alguma dúvida, sugestão ou feedback, sinta-se à vontade para entrar em contato:
        </p>
        <ul style={{ textAlign: "left", marginTop: "15px" }}>
          <li><strong>Email:</strong> contato@sistemaexemplo.com</li>
          <li><strong>Telefone:</strong> (11) 99999-9999</li>
          <li><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP</li>
        </ul>
        <p style={{ marginTop: "15px" }}>
          Respondemos geralmente em até 24 horas úteis.
        </p>
      </div>
    </div>
  );
}

export default Contato;
