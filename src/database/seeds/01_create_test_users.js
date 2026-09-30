const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // 1. Limpa a tabela (opcional, mas bom para testes repetidos)
  await knex('users').del();

  // 2. Criptografa a senha (ex: '123456')
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 3. Insere o usuário de teste
  await knex('users').insert([
    {
      name: 'Teste User',
      email: 'test@test.com',
      password_hash: hashedPassword,
      created_at: new Date()
    },
    {
      name: 'Admin User',
      email: 'admin@test.com',
      password_hash: hashedPassword,
      created_at: new Date()
    }
  ]);
};