import React, { useEffect, useState } from "react";




const DataList = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        fetch("http://localhost:3001/usuarios")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Erro ao buscar usuários:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
            fetch(`http://localhost:3001/usuarios/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    setData((prevData) => prevData.filter((item) => item.idusers_ID !== id));
                })
                .catch((error) => console.error("Erro ao deletar usuário:", error));
        }
    };

    return (
        <div className="mainContainer">
            <h1 className="title">Listando Usuários</h1>
            <ul className="list">
                {data.map((item) => (
                    <li key={item.idusers_ID} className="li-list">
                        {item.user_name}
                        <br />
                        <button className="btn-list" onClick={() => props.clicked(item)}>
                            Mais detalhes
                        </button>
                        <button className="btn-list" onClick={() => handleDelete(item.idusers_ID)}>
                            Deletar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
