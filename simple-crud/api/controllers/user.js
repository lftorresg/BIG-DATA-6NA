import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const insertUsers = async (req, res) => {
  const { nome, email, fone, data_nascimento } = req.body;

  try {
    const newUser = new User({ nome, email, fone, data_nascimento });
    await newUser.save();
    return res.status(200).json("Usuário criado com sucesso.");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUsers = async (req, res) => {
  const { nome, email, fone, data_nascimento } = req.body;

  try {
    await User.findByIdAndUpdate(req.params.id, { nome, email, fone, data_nascimento });
    return res.status(200).json("O Update foi efetuado com sucesso.");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("O usuário foi excluído com sucesso!");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};