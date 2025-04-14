const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Definindo o caminho para o banco
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Cria a tabela 'users' se ela não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar a tabela:", err.message);
        } else {
            console.log("Tabela 'users' criada ou já existe!");
        }
    });
});

db.close();  // Fecha o banco após a criação
