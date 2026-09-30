require('dotenv').config();
const knex = require('./src/config/database');

async function test() {
  try {
    const result = await knex.raw('SELECT 1 as test');
    console.log('Conexão estabelecida com sucesso!', result);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao conectar:', error);
    process.exit(1);
  }
}

test();