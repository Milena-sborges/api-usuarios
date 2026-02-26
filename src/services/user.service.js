const db = require('../database/db');

const createUser = async (nome, email) => {
  const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [nome, email], function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

const getAllUsers = async () => {
  const sql = `SELECT * FROM usuarios`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getUserById = async (id) => {
  const sql = `SELECT * FROM usuarios WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updateUserNameAndStatus = async (id, name, status) => {
  const sql = `UPDATE usuarios SET nome = ?, status = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [name, status, id], function(err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

const deleteUser = async (id) => {
  const sql = `UPDATE usuarios SET status = 'inativo' WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [id], function(err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserNameAndStatus,
  deleteUser
};