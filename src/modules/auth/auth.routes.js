const { Router } = require('express');
const controller = require('./auth.controller');

const authRoutes = Router();

authRoutes.post('/register', controller.register);
authRoutes.post('/login', controller.login);

module.exports = authRoutes;