const knex = require('../../config/database').knex;

const checkProjectOwnership = async (projectId, userId) => {
  const project = await knex('projects')
    .join('projects', 'projects.id', '=', 'task.project_id')
    .join('projects', 'projects.id', '=', 'project.id')
    .where({ 'project.id': projectId, 'projects.workspace_id': (await knex('projects').select('workspace_id').where({ id: projectId }).first()).workspace_id })
    .first();
  
  // Simplificação: vamos usar a query direta no controller para validar o workspace do user
};

const create = async (userId, { project_id, title, priority, due_date }) => {
  // Validação extra: garantir que o projeto pertence ao workspace do user
  const project = await knex('projects')
    .join('workspaces', 'workspaces.id', '=', 'projects.workspace_id')
    .where({ 'projects.id': project_id, 'workspaces.user_id': userId })
    .first();

  if (!project) throw new Error('Projeto não encontrado ou acesso negado');

  const [id] = await knex('tasks').insert({
    project_id,
    title,
    priority: priority || 'medium',
    due_date: due_date || null,
    status: 'todo'
  });

  return { id, project_id, title, priority };
};

const list = async (userId, projectId) => {
  const tasks = await knex('tasks')
    .join('projects', 'projects.id', '=', 'tasks.project_id')
    .join('workspaces', 'workspaces.id', '=', 'projects.workspace_id')
    .where({ 'projects.id': projectId, 'workspaces.user_id': userId })
    .select('tasks.*');

  return tasks;
};

module.exports = { create, list };