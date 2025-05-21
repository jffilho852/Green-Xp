const express = require ('express')
const router = express.Router()
const db = require('../db')
const { error } = require('console')
const e = require('express')

// Adiocionando pontos a um usuario

router.post('/adicionar',(req, res)=>{
    const {id_usuario, pontos} = req.body
    
    db.run('UPDATE usuarios SET pontos = pontos + ? WHERE id_usuario = ?',
        [pontos, id_usuario],
        (err)=>{
            if(err){ 
                return res.status(500).json({ erro: err.message})
                }

                res.json({ mensagem: 'Pontos Adicionado com sucesso'})
        }
    )
})

//  Atualizar ponjtos (Definir um novo valor exato)

router.put('/pontos/:id_usuario', (req, res) =>{
    const { id_usuario} = req.params
    const { pontos } = req.body

    db.run('UPDATE usuarios SET pontos = ? WHERE id_usuario = ?',
        [pontos, id_usuario],
        (err)=>{
            if(err) return res.status(500).json({erro: err.message})
                res.json({ mensagem: 'Novos Pontos Atualizaddo com sucesso'})
        }
    )
})

// Zerar pontos ou remover valor especifico

router.post ('/remover', (req, res)=>{
    const { id_usuario, pontos} = req.body

    db.run('UPDATE usuarios SET pontos = MAX(pontos - ?, 0) WHERE id_usuario = ?',
        [pontos, id_usuario],
        (err)=>{
            if(err) return res.status(500).json({erro: err.message})
                res.json({mensagem: 'Pontos Alterado com sucesso!!'})
        }
    )
})

module.exports = router