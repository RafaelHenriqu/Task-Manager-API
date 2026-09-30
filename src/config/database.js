const knex = require('knex')(require('../../knexfile').development);

const testConnection = async () => {
  const result = await knex.raw('SELECT 1');
  console.log('DB Connected:', result);
};

module.exports = { knex, testConnection };