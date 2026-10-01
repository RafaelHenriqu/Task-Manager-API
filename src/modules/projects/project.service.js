const knex = require('../../config/database').knex;

const checkWorkspace = async (workspaceId, userId) => {
  const ws = await knex('workspaces').where({ id: workspaceId, user_id: userId }).first();
  if (!ws) throw new Error('Workspace não encontrado');
  return ws;
};

const create = async (userId, { workspace_id, name }) => {
  await checkWorkspace(workspace_id, userId);
  const [id] = await knex('projects').insert({ workspace_id, name });
  return { id, workspace_id, name };
};

const list = async (userId, workspaceId) => {
  await checkWorkspace(workspaceId, userId);
  return await knex('projects').where({ workspace_id: workspaceId }).select('*');
};

module.exports = { create, list };