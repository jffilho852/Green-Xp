const express = require("express");
const db = require("../db.js");
const router = express.Router();

<<<<<<< HEAD
// Teste de conexão com o DB
router.get("/test-db", (req, res) => {
  console.log("TESTE RODANDO NO DB");
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Erro ao acessar o banco" });
=======
router.get('/test-db', (req, res) => {

  const query = 'SELECT id, nome, email, tipo FROM usuarios';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
>>>>>>> main
    }
    res.json(rows);
  });
});
<<<<<<< HEAD
=======
  
// Rota para criar o Registro(Cadastro) do Usuário
>>>>>>> main

// Rota de cadastro
router.post("/register", (req, res) => {
  const { nome, email, password } = req.body;
  if (!nome || !email || !password) {
    return res
      .status(400)
      .json({ error: "Nome, email e senha são obrigatórios" });
  }

  db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao acessar o banco de dados" });
      }
      if (row) {
        return res
          .status(400)
          .json({ error: "E-mail já cadastrado" });
      }

      db.run(
        "INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)",
        [nome, email, password],
        function (err) {
          if (err) {
            console.error("Erro no INSERT:", err.message);
            return res
              .status(500)
              .json({ error: "Erro ao cadastrar usuário" });
          }
          return res
            .status(201)
            .json({ message: "Usuário cadastrado com sucesso!" });
        }
      );
    }
  );
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao acessar o banco de dados" });
      }
      if (!row) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado" });
      }
      if (row.password !== password) {
        return res
          .status(401)
          .json({ error: "Senha incorreta" });
      }

      res.status(200).json({
        message: "Login efetuado com sucesso",
        usuario: {
          id: row.id_usuario,
          nome: row.nome,
          pontos: row.pontos,
          is_admin: row.is_admin,
        },
      });
    }
  );
});

module.exports = router;
