const projectService = require('./project.service');

const create = async (req, res) => {
  try {
    const { workspace_id, name } = req.body;
    if (!workspace_id || !name) {
      return res.status(400).json({ error: 'workspace_id e name são obrigatórios' });
    }
    const result = await projectService.create(req.userId, { workspace_id, name });
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === 'Workspace não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const { workspace_id } = req.query;
    if (!workspace_id) return res.status(400).json({ error: 'workspace_id é obrigatório' });
    const result = await projectService.list(req.userId, workspace_id);
    return res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Workspace não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { create, list };