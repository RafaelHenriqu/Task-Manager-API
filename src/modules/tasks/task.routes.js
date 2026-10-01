const { Router } = require('express');
const controller = require('./task.controller');
const authMiddleware = require('../../middlewares/auth');

const taskRoutes = Router();
taskRoutes.use(authMiddleware);

taskRoutes.get('/', controller.list);
taskRoutes.post('/', controller.create);

module.exports = taskRoutes;