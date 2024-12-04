const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Rota para cadastrar usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário.' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido.', user });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;
