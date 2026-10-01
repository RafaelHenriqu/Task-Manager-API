const express = require("express")
const app = express()
const workspaceRoutes = require('./modules/workspaces/workspace.routes');
const projectRoutes = require('./modules/projects/project.routes');
const authRoutes = require('./modules/auth/auth.routes');
const commentRoutes = require('./modules/comments/comment.routes');
const authMiddleware = require('./middlewares/auth');
const taskRoutes = require('./modules/tasks/task.routes');
app.use(express.json());
app.use('/auth', authRoutes); // Registra as rotas de auth
app.use('/workspaces', workspaceRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/tasksComment', commentRoutes);
// Exemplo de rota protegida (teste)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Acesso permitido!', 
    userId: req.userId 
  });
});
module.exports = app