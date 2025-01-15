const express = require('express');
const Produto = require("../models/produto");
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');

const router = express.Router();
router.use(authMiddleware);
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('image'), async (req, res) => {
    const {nome, descricao, valor, quantidade} = req.body;
    const imagemBuffer = req.file?.buffer;

    try{
        const prod = await Produto.create({nome, descricao, imagem: imagemBuffer, valor, quantidade, userId: req.userId});
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

router.put('/:id', upload.single('image'), async (req, res) => {
    const {nome, descricao, valor, quantidade} = req.body;
    const imagemBuffer = req.file?.buffer;
    const {id} = req.params;
    
    try{
        await Produto.update({nome, descricao, imagem: imagemBuffer, valor, quantidade}, {where:{id}});
        res.status(201).json({id});
    }catch(error){
        res.status(402).json({error});
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

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const produto = await Produto.findOne({where: {userId: req.userId, id}});
        res.status(200).json(produto);
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