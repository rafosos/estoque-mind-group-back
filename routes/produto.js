const express = require('express');
const Produto = require("../models/produto");
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const { Sequelize } = require('sequelize');

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

router.patch('/movimentacao', async (req, res) => {
    const {produtos} = req.body;
    
    try{
        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
            console.log(produto)
            await Produto.update({quantidade: produto.quantidade}, {where: {id: produto.id}});            
        }
        res.status(200).send("Produtos atualizados com sucesso")
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
        throw "asdasd";
        res.status(200).json(produtos);
    }catch(error){
        console.log('asdasd')
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

router.get('/filtro/:filtro', async(req,res) => {
    const {filtro} = req.params;
    let {idsEscolhidos} = req.query;
    let where = {
        userId: req.userId,
        nome: {[Sequelize.Op.like]: `%${filtro}%`},
    }

    if(idsEscolhidos){
        where["id"] = {[Sequelize.Op.notIn]: typeof idsEscolhidos == 'string' ? [idsEscolhidos] : idsEscolhidos}
    }

    try{
        const produtos = await Produto.findAll({
            attributes: ['id',  'nome', 'imagem', 'valor', 'quantidade'],
            where
        });
        res.status(200).json(produtos);
    }catch(error){
        console.log(error)
        res.status(402).json({error});
    }
})

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