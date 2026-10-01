const taskService = require('./task.service');

const create = async (req, res) => {
  try {
    const { project_id, title } = req.body;
    if (!project_id || !title) {
      return res.status(400).json({ error: 'project_id e title são obrigatórios' });
    }
    const result = await taskService.create(req.userId, req.body);
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === 'Projeto não encontrado ou acesso negado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const { project_id } = req.query;
    console.log(req.query)
    if (!project_id) return res.status(400).json({ error: 'project_id é obrigatório' });
    const result = await taskService.list(req.userId, project_id);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Projeto não encontrado ou acesso negado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { create, list };