// Importa o modulo Express para criar Rota
const express = require("express")
const routerDescartes = express.Router()

// Importa o bacno de dados SQLite configurado no arquivo db.js

const db = require ('../db.js')

//Rota para Registrar Descarte e atualizar os pontos

routerDescartes.post('/descartar', (req, res)=>{
    const {id_usuario, id_lixeira, tipo_residuo, quantidade } = req.body
    
    //Validação de Dados

    if(!id_usuario || !id_lixeira|| !tipo_residuo || !quantidade){
        return res.status(400).json({erro: 'Dados Incompletos para o Descarte'})
    
}
    // Define os pontos por resíduos

    const pontosResiduos = {
        'papel': 1,
        'plastico': 1,
        'metal': 1,
        'organico':1
    }
// Converte o tipo de resíduo para minúsculo para evitar erris de comparação
    const tipo = tipo_residuo.toLowerCase()

// Busca a pontuação do tipo de resíduo, ou usa 1 ponto como padrão
    const valorPontos = pontosResiduos[tipo] || 1

// Calcula os pontos gerados (quantidade * valor por tipo)
    const pontosGerados = valorPontos * quantidade

// SQL para inserir o registro na tabela reciclagem
    const insertQuery = `INSERT INTO reciclagem (id_usuario, id_lixeira, tipo_residuo, quantidade, pontos_gerados) VALUES (?,?,?,?,?)`

    // Executa a inserção no Banco de Dados
    db.run (insertQuery, [id_usuario, id_lixeira, tipo_residuo, quantidade, pontosGerados], (err)=> {
        if(err){
            console.error("Erro ao Registrar reciclagem:", err.message)
            return res.status(500).json({erro: 'Erro ao Regisrar descartes'})
        }

// SQL para atualizar os pontos de usuário

        const updateQuery = `UPDATE usuarios SET pontos = pontos + ? WHERE id_usuario = ?`

    // Executa a atualizaçãoi dos pontos de usuários
        db.run(updateQuery, [pontosGerados, id_usuario], (err2)=>{
            if(err2){
                console.error("Erro ao atualizar pontos", err2.message)
                return res.status(500).json({erro: 'Erro ao atualizar pontos'})   
            }
            return res.status(201).json({
                message: 'Descarte realizado com sucesso',
                pontos_Gerados: pontosGerados
            })
        })
     })    
})

// Exporta o roteador para ser usado no server.js
module.exports = routerDescartes