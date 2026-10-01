const { Router } = require('express');
const controller = require('./project.controller');
const authMiddleware = require('../../middlewares/auth');

const projectRoutes = Router();
projectRoutes.use(authMiddleware); // Protege todas as rotas abaixo

projectRoutes.get('/', controller.list);
projectRoutes.post('/', controller.create);

module.exports = projectRoutes;