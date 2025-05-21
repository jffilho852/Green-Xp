const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Definindo o caminho para o banco
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Cria a tabela 'users' se ela não existir
db.serialize(() => {
    // Tabela Usuário
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        matricula TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        pontos INTEGER DEFAULT 0,
        is_admin BOOLEAN DEFAULT 0
      )`, (err)=>{
        if (err) console.error("Erro ao criar tabela Usuário")
            else{
                console.log("Tabela criada com sucesso")
        }
    });

      //Lixeira 

      db.run(`CREATE TABLE IF NOT EXISTS lixeiras (
        id_lixeira INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_residuo TEXT NOT NULL,
        qr_code TEXT UNIQUE NOT NULL
      )`, (err)=>{
        if (err) console.error("Erro ao criar tabela Lixeira")
            else{
                console.log("Tabela criada com sucesso")
        }
    });

    db.run(`
      INSERT INTO lixeiras (tipo_residuo, qr_code)
      VALUES 
        ('Plástico', 'QR_PLASTICO'),
        ('Metal', 'QR_METAL'),
        ('Papel', 'QR_PAPEL'),
        ('Orgânico', 'QR_ORGANICO')
    `, (err) => {
      if (err) console.error("Erro ao inserir lixeiras:", err.message);
      else console.log("Lixeiras inseridas com sucesso!");
    });

      // Reciclagem
db.run(`CREATE TABLE IF NOT EXISTS reciclagem (
    id_reciclagem INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_lixeira INTEGER,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_residuo TEXT,
    quantidade INTEGER DEFAULT 1,
    pontos_gerados INTEGER,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY(id_lixeira) REFERENCES lixeiras(id_lixeira)
  )`, (err)=>{
    if (err) console.error("Erro ao criar tabela Reciclagem")
        else{
            console.log("Tabela criada com sucesso")
    }
});

  //Medalhas

  db.run(`CREATE TABLE IF NOT EXISTS medalhas (
    id_medalha INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_reciclagem INTEGER,
    detalhe_medalha TEXT,
    pontos_adicionados INTEGER,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY(id_reciclagem) REFERENCES reciclagem(id_reciclagem)
  )`, (err)=>{
    if (err) console.error("Erro ao criar tabela Medalhas")
        else{
            console.log("Tabela criada com sucesso")
    }
});

  // Recompensas
db.run(`CREATE TABLE IF NOT EXISTS recompensas (
    id_recompensa INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    valor_pontos INTEGER
  )`, (err)=>{
    if (err) console.error("Erro ao criar tabela Recompensas")
        else{
            console.log("Tabela criada com sucesso")
    }
});

  // Resgates
db.run(`CREATE TABLE IF NOT EXISTS resgates (
    id_resgate INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_recompensa INTEGER,
    data_resgate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY(id_recompensa) REFERENCES recompensas(id_recompensa)
  )`, (err)=>{
    if (err) console.error("Erro ao criar tabela Resgates")
        else{
            console.log("Tabela criada com sucesso")
    }
});

  // Relatórios
db.run(`CREATE TABLE IF NOT EXISTS relatorios (
    id_relatorio INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    data_relatorio DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao_dados TEXT,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
  )`, (err)=>{
    if (err) console.error("Erro ao criar tabela Relatórios")
        else{
            console.log("Tabela criada com sucesso")
    }
});




});

module.exports = db;
// Fecha o banco após a criação
