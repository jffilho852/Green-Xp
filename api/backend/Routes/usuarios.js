const express = require("express") //Express é usado par rodar o Roteador
const db = require("../db.js") // Importa o banco de Dados slqite configurando o código do db.js
const router = express.Router() // Cria um novo roteador express

router.get('/test-db', (req, res) => {

  const query = 'SELECT id, nome, email, tipo FROM usuarios';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
    res.json(rows);
  });
});
  
// Rota para criar o Registro(Cadastro) do Usuário

router.post("/register", (req, res) => {
    // Pega os dados de Email e senha do Corpo (req)
const {nome, email, password } = req.body

// Verifca se o usuário preencheu os Campos
if (!email || !password  || !nome) {
    return res.status(400).json({ error: " Nome, Email e senha são obrigatórios" })
}

//  Verifica se o usuário já cadastro com o mesmo email
db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
    if (err) {
        // Erro no banco , retornar erro 500
        return res.status(500).json({ error: "Erro ao acessar o banco de dados" })
    }

    if (row) {
        // Se o email existir, retorna erro: Email já Cadastrado
        return res.status(400).json({ error: "E-mail já cadastrado" })
    }

    // Caso o usuário não exista, cria o cadastro do novo usuário
    db.run(
        "INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)",
        [nome, email, password], // Passando Email e Password por Parâmetro, mais segurança
        function (err) {
            if (err) { // Retornar erro, se der erro
                console.error("Erro no INSERT:", err.message)
                return res.status(500).json({ error: "Erro ao cadastrar usuário" })
            }

            // Se não der erro, retornar 201, e a mensagem de sucesso
            return res.status(201).json({ message: "Usuário cadastrado com sucesso!" })
        }
    )
})
})

// ROTA DE LOGIN
router.post("/login", (req, res) => {
// Captura o email e senha do corpo (req) requisição
const { email, password } = req.body;

// Verifica se os campos estão preenchido
if (!email || !password) {
    return res.status(400).json({ error: "Necessário Email e Senha" })
}

// Busca usuário no banco através do Email informado
db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
    if (err) {
        //Erro na consulta , retornar erro 500
        return res.status(500).json({ error: "Erro ao acessar o banco de dados" })
    }
    // Se o usuário não for encontrado retornar erro 404
    if (!row) {
        return res.status(404).json({ error: "Usuário não encontrado" })
    }
    // Usuário errou a senha , retornar erro 401
    if (row.password !== password) {
        return res.status(401).json({ error: "Senha Incorreta!!!" })
    }

    // Usuário conseguiu fazer Login , retorna 200 e mensagem de sucesso
    res.status(200).json({ message: "Login efetuado com sucesso",
                           usuario: {
                            id:row.id_usuario,
                            nome: row.nome,
                            pontos: row.pontos,
                            is_admin: row.is_admin
         }
     })
})
})

// extrai o roteador para conseguir usar no server.js
module.exports = router
