const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho para o banco de dados persistente
const dbPath = path.resolve(__dirname, "../banco/database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite!");
  }
});

module.exports = db;
