require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); //importando conexao do banco, este caminho foi recomendado por ser mais facil para gerenciar o servidor

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// METODO GET AQUIII
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// POSTTTT
app.post('/usuarios', (req, res) => {
    const { user_name, user_email, phone } = req.body;

    if (!user_name || !user_email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    db.query(
        'INSERT INTO users (user_name, user_email, phone) VALUES (?, ?, ?)',
        [user_name, user_email, phone],
        (err, results) => {
            if (err) {
                console.error("Erro ao criar usuário:", err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, user_name, user_email, phone });
        }
    );
});

// PUTTTT
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { user_name, user_email, phone } = req.body;

    db.query(
        'UPDATE users SET user_name = ?, user_email = ?, phone = ? WHERE idusers_ID = ?',
        [user_name, user_email, phone, id],
        (err, results) => {
            if (err) {
                console.error("Erro ao atualizar usuário:", err);
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json({ id, user_name, user_email, phone });
        }
    );
});

// DELETTTTTT
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM users WHERE idusers_ID = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error("Erro ao deletar usuário:", err);
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json({ message: 'Usuário deletado com sucesso' });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
