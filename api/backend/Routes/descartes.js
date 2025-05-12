const express = require("express")
const routerDescartes = express.Router()
const db = require ('../db.js')

    //Rota para Registrar Descarte

routerDescartes.post('/descartar', (req, res)=>{
    const {id_usuario, id_lixeira, tipo_residuo, quantidade } = req.body
    //Validação de Dados

    if(!id_usuario || !id_lixeira|| !tipo_residuo || !quantidade){
        return res.status(400).json({erro: 'Dados Incompletos para o Descarte'})
    
}
    const pontosResiduos = {
        'papel': 1,
        'plastico': 1,
        'metal': 1,
        'organico':1
    }

    const tipo = tipo_residuo.toLowerCase()
    const valorPontos = pontosResiduos[tipo] || 1
    const pontosGerados = valorPontos * quantidade

    const insertQuery = `INSERT INTO reciclagem (id_usuario, id_lixeira, tipo_residuo, quantidade, pontos_gerado) VALUES (?,?,?,?,?)`

    db.run (insertQuery, [id_usuario, id_lixeira, tipo_residuo, quantidade, pontosGerados], (err)=> {
        if(err){
            console.error("Erro ao Registrar reciclagem:", err.message)
            return res.status(500).json({erro: 'Erro ao Regisrar descartes'})
        }
        //Atualizar pontos de Usuarios

        const updateQuery = `UPDATE usuarios SET pontos = pontos + ? WHERE id_usuario = ?`

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

module.exports = routerDescartes