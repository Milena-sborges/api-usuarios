const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!email || !nome) {
      return res.status(400).json({ error: "Email e nome são obrigatórios" });
    }

    const id = await userService.createUser(nome, email);
    res.status(201).json({ id, nome, email, status: 'ativo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserNameAndStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const change = await userService.updateUserNameAndStatus(id, name, status);

    if (change === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const change = await userService.deleteUser(id);

    if (change === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserNameAndStatus,
  deleteUser
};