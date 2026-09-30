const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // O token vem como "Bearer <token>"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Injeta o user_id na requisição para usar nas rotas depois
    req.userId = decoded.id;
    req.userEmail = decoded.email; // Opcional, mas útil
    
    return next(); // Permite passar para a rota
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = auth;