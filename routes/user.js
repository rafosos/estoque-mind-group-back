const express = require('express');
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require('../middlewares/auth');
const sequelize = require('../db');

router.use(authMiddleware);

router.patch('/', async (req, res) => {
    const fieldsToUpdate = req.body;

    try{
        await User.update(fieldsToUpdate, {where: {id: req.userId}});
        res.status(200).json({updatedFields: fieldsToUpdate});
    } catch(error){
        res.status(402).json({error});
    }
});

router.get("/", async (req, res) => {
    const userId = req.userId;
    try{

        let user = await sequelize.query(`
            SELECT 
                u.nome,
                u.email,
                p.qtdProdutos,
                p.somaProdutos
            FROM users u 
            LEFT JOIN (
                SELECT 
                    count(*) as qtdProdutos, 
                    sum(quantidade) as somaProdutos,
                    userId 
                    from produtos group by userId) p
                on p.userId = u.id
            WHERE u.id = ?`, {replacements: [userId], type: sequelize.QueryTypes.SELECT});
        if (user && user.length)
            user = user[0]
        res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.status(402).json({error});
    }
})

module.exports = router;