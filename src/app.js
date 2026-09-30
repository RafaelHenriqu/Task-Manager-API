const express = require("express")
const app = express()
const workspaceRoutes = require('./modules/workspaces/workspace.routes');

// No topo
const authRoutes = require('./modules/auth/auth.routes');
const authMiddleware = require('./middlewares/auth');

// Embaixo dos outros middlewares
app.use(express.json());
app.use('/auth', authRoutes); // Registra as rotas de auth
app.use('/workspaces', workspaceRoutes);
// Exemplo de rota protegida (teste)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Acesso permitido!', 
    userId: req.userId 
  });
});
module.exports = app