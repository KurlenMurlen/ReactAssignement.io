import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    // Função para buscar usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    // Buscar usuários ao carregar o componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Função para adicionar um usuário
    const adicionarUsuario = async () => {
        try {
            await axios.post('http://localhost:3001/usuarios', {
                user_name: "Novo Usuário",
                user_email: "novo@email.com",
                phone: "123456789"
            });
            fetchUsuarios(); // Atualiza a lista após adicionar
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    // Função para editar um usuário
    const editarUsuario = async (id) => {
        try {
            await axios.put(`http://localhost:3001/usuarios/${id}`, {
                user_name: "Usuário Editado",
                user_email: "editado@email.com",
                phone: "987654321"
            });
            fetchUsuarios(); // Atualiza a lista após editar
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    };

    // Função para deletar um usuário
    const deletarUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/usuarios/${id}`);
            fetchUsuarios(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    };

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <button onClick={adicionarUsuario}>Adicionar Usuário</button>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.idusers_ID}>
                        {usuario.user_name} - {usuario.user_email} - {usuario.phone}
                        <button onClick={() => editarUsuario(usuario.idusers_ID)}>Editar</button>
                        <button onClick={() => deletarUsuario(usuario.idusers_ID)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usuarios;
