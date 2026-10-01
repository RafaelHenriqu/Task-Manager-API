const { Router } = require('express');
const controller = require('./comment.controller');
const authMiddleware = require('../../middlewares/auth');

const commentRoutes = Router();
commentRoutes.use(authMiddleware);

// /:taskId é a parte dinâmica da URL
commentRoutes.get('/:taskId', controller.list);
commentRoutes.post('/:taskId', controller.create);

module.exports = commentRoutes;