const knex = require('../../config/database').knex;

// Cria um workspace para o usuário logado
const create = async (userId, name) => {
  // Insere no banco usando o userId que veio do middleware
  const [id] = await knex('workspaces').insert({
    user_id: userId,
    name
  });

  return { id, name };
};

// Lista todos os workspaces do usuário logado
const list = async (userId) => {
  return await knex('workspaces')
    .where({ user_id: userId }) // SEGURANÇA: Filtra pelo dono
    .select('*');
};

module.exports = {
  create,
  list
};