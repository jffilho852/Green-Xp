// arquivo: routes/lixeiras.js
const express = require('express');
const db = require('../db.js');
const router = express.Router();

router.get('/:qr_code', (req, res) => {
  const qr_code = req.params.qr_code;

  db.get('SELECT * FROM lixeiras WHERE qr_code = ?', [qr_code], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar lixeira' });
    if (!row) return res.status(404).json({ error: 'Lixeira não encontrada' });

    res.status(200).json({
      id_lixeira: row.id_lixeira,
      tipo_residuo: row.tipo_residuo

    });
  });
});

module.exports = router;