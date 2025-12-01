const express = require('express');
const ownerModel = require('../models/owner-model');

const router = express.Router();

router.get( '/',function(req, res){
    res.send('owner model is working')
})

router.post('/create', async(req, res)=>{

    let owner = await ownerModel.find();
    if(owner.length > 0){
        return res.status(500).send('You doesnot create Owner');
    }else{

    let {FullName, email,password} = req.body;
    
    let createdOwner = await ownerModel.create({
        FullName,
        email,
        password,
        })

    res.send(createdOwner);
    }
})

module.exports = router;