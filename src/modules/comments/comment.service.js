const knex = require('../../config/database').knex;

const checkTaskOwnership = async (taskId, userId) => {
  const task = await knex('tasks')
    .join('projects', 'projects.id', '=', 'tasks.project_id')
    .join('workspaces', 'workspaces.id', '=', 'projects.workspace_id')
    .where({ 'tasks.id': taskId, 'workspaces.user_id': userId })
    .first();

  if (!task) throw new Error('Tarefa não encontrada ou acesso negado');
  return task;
};

const create = async (taskId, userId, body) => {
  await checkTaskOwnership(taskId, userId);

  const [id] = await knex('comments').insert({
    task_id: taskId,
    author_id: userId,
    body
  });

  return { id, task_id: taskId, author_id: userId, body };
};

const list = async (taskId) => {
  return await knex('comments')
    .where({ task_id: taskId })
    .select('*');
};

module.exports = { create, list };