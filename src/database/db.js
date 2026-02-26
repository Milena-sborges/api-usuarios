const sqlite3 = require('sqlite3').verbose();


const path=require('path');

//define o caminho do banco de dados
const dbpath= path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbpath, (err)=>{
    if(err){
        console.error('Erro ao conectar no banco', err.message);

    }
    else{
        console.log('Conectado ao Banco');
    }
}
);

db.serialize(()=>{
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'ativo',
    created_at DATETIME DEFAULT CURRRENT_TIMESTAMP

    )
    `, (err) =>{
        if(err){
            console.error("Erro ao criar a tabela usuários", err.message);
        }

    });
}
);

module.exports=db;