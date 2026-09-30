const { Router } = require('express');
const controller = require('./workspace.controller');
const authMiddleware = require('../../middlewares/auth');

const workspaceRoutes = Router();

// Todas as rotas daqui pra baixo exigem token válido
workspaceRoutes.use(authMiddleware);

workspaceRoutes.get('/', controller.list);
workspaceRoutes.post('/', controller.create);

module.exports = workspaceRoutes;