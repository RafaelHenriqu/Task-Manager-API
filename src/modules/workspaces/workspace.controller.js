const workspaceService = require('./workspace.service');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    // req.userId veio do middleware JWT
    const result = await workspaceService.create(req.userId, name);
    return res.status(201).json(result);
  } catch (err) {
    console.log(req.body)
    return res.status(500).json({ error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const workspaces = await workspaceService.list(req.userId);
    return res.status(200).json(workspaces);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  list
};