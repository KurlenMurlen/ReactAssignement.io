import React, { useEffect, useState } from "react";
import DataList from "./DataList";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

function Principal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch('http://localhost:3001/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3001/usuarios/${itemClicked.idusers_ID}`
      : 'http://localhost:3001/usuarios';

    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
      fetchUsuarios();
      setModalIsOpen(false);
      setFormData({ user_name: '', user_email: '', phone: '' });
      setIsEditing(false);
    })
    .catch(error => console.error('Erro:', error));
  };

  const handleEdit = (usuario) => {
    setItemClicked(usuario);
    setFormData({
      user_name: usuario.user_name,
      user_email: usuario.user_email,
      phone: usuario.phone || ''
    });
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE'
      })
      .then(() => fetchUsuarios())
      .catch(error => console.error('Erro ao deletar:', error));
    }
  };

  const handleAddNew = () => {
    setFormData({ user_name: '', user_email: '', phone: '' });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  return (
    <div className="body1">
      {/* NAVBAR BONITA */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sobre" className="nav-link">Sobre</Link>
        <Link to="/contato" className="nav-link">Contato</Link>
      </nav>

      <div className="mainContainer">
        <h1>Gestão de Usuários</h1>
        <button onClick={handleAddNew}>Adicionar Novo Usuário</button>

        <h2 style={{ marginTop: '30px' }}></h2>
        <DataList 
          usuarios={usuarios} 
          clicked={handleEdit} 
          onDelete={handleDelete}
        />
      </div>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>{isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setModalIsOpen(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Principal;
