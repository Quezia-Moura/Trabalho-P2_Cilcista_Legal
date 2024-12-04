const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { description, userId } = req.body;
    const newReport = new Report({ description, userId });
    await newReport.save();
    res.status(201).json({ message: 'Denúncia criada com sucesso!', report: newReport });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar denúncia.' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar denúncias.' });
  }
});

module.exports = router;
