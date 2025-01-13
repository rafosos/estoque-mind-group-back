require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Token é obrigatório!' });
    }
    
    const [, token] = authHeader.split(' ');
    
    try {
        const senha = process.env['JWT_PASSWORD'];
        jwt.verify(token, senha, 
            function(err, decodedToken) {
                if(err) return res.status(401).json({message: "Erro com token.", erro: err});
                else{
                    req.userId = decodedToken.id
                }
            });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token Inválido!' });
    }
};

module.exports = auth;