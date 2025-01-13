const express = require('express');
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.patch('/', async (req, res) => {
    const fieldsToUpdate = req.body;

    try{
        await User.update(fieldsToUpdate, {where: {req.userId}});
        res.status(200).json({updatedFields: fieldsToUpdate});
    } catch(error){
        res.status(402).json({error});
    }
});

module.exports = router;