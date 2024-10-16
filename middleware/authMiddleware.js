const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ auth: false, mensaje: 'No se proporcionó el token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, mensaje: 'Fallo en la autenticación del token' });
    req.userId = decoded.id;
    next();
  });
};
