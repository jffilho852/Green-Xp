const express = require("express") // Importa o Express para criar o servidor web
const cors = require("cors") // Importa o CORS para permitir requisições de outras origens (como seu front-end)
const userRoutes = require("./Routes/usuarios") // Importa as rotas que estão no arquivo users.js
const leiturasRoutes = require('./Routes/leitura_qr_cod')
const descarteRoutes = require('./Routes/descartes')
const adminRoutes = require ('./Routes/admin')

const app = express() // Cria uma instância do servidor Express


app.use(cors()) // Ativa o CORS para permitir chamadas de outros domínios
app.use(express.json()) // Permite que o servidor entenda dados no no formato de JSON
app.use("/api/usuarios", userRoutes) 
app.use("/api/leitura", leiturasRoutes)
app.use("/api/descartes", descarteRoutes)// Define que as rotas do arquivo users.js vão responder no caminho "/api"
app.use('/api/admin', adminRoutes)


//
const PORT = 3000 // Define a porta que o servidor vai rodar

// Inicia o servidor e exibe mensagem no console
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`)
})
