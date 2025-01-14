const express = require('express');
const router = express.Router();
const Produto = require("../models/produto");
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const {nome, descricao, imagem, valor, quantidade} = req.body;

    try{
        const prod = await Produto.create({nome, descricao, imagem, valor, quantidade, userId: req.userId});
        res.status(201).json({prod});
    }catch(error){
        res.status(402).json({error});
    }
});

router.patch('/:id/quantidade', async (req, res) => {
    const {quantidade} = req.body;
    const {id} = req.params

    try{
        await Produto.update({quantidade}, {where: {id}});
        res.status(200).json({quantidade})
    } catch(error){
        res.status(402).json({error})
    }
});

router.get('/', async(req, res) => {
    try{
        const produtos = await Produto.findAll({where: {userId: req.userId}});
        res.status(200).json(produtos);
    }catch(error){
        res.status(402).json({error});
    }
});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        await Produto.destroy({where: {id: id, userId: req.userId}});
        res.status(200).json({id});
    }catch(error){
        res.status(402).json({error});
    }
});

module.exports = router;