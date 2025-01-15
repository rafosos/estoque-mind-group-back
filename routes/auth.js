const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await User.findOne({where: { email }});
    if (!usuario) {
        res.status(402).send('Usuário não encontrado');
        return;
    }

    if (await bcrypt.compare(senha, usuario.senha)) {
        const token = jwt.sign({ 
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_PASSWORD,
            { expiresIn: '2d' }
        );
        res.status(200).json({
            nome: usuario.nome,
            token: token
        });
    }
    else {
        res.status(401).send('Senha incorreta!');
    }
});

router.post('/cadastro', async (req, res) => {
    const {nome, email, senha} = req.body;

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const usuario = {nome, email, senha: senhaCrypt};

    try{
        const user = await User.create(usuario);  
        res.status(201).json({user});
    }catch(error){
        res.status(402).json({error});
    }
});

module.exports = router;