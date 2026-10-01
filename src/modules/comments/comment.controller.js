const commentService = require('./comment.service');

const create = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ error: 'Body é obrigatório' });
    }

    const result = await commentService.create(taskId, req.userId, body);
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === 'Tarefa não encontrada ou acesso negado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const result = await commentService.list(taskId);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Tarefa não encontrada ou acesso negado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { create, list };