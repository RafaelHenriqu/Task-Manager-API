const knex = require('../../config/database').knex;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Schema de validação com Zod
const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const register = async (data) => {
  // 1. Valida com Zod
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Dados inválidos: ' + parsed.error.errors[0].message);
  }

  const { name, email, password } = parsed.data;

  // 2. Verifica se email já existe
  const existingUser = await knex('users').where({ email }).first();
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  // 3. Criptografa senha
  const password_hash = await bcrypt.hash(password, 10);

  // 4. Salva no banco
  const [id] = await knex('users').insert({
    name,
    email,
    password_hash
  });

  // 5. Gera Token JWT
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Expira em 7 dias
  });

  return { id, name, email, token };
};

const login = async (data) => {
  // 1. Valida
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Dados inválidos');
  }

  const { email, password } = parsed.data;

  // 2. Busca usuário
  const user = await knex('users').where({ email }).first();
  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  // 3. Compara senha
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error('Credenciais inválidas');
  }

  // 4. Gera Token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  return { id: user.id, name: user.name, email: user.email, token };
};

module.exports = { register, login };