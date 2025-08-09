const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

router.post('/shorten' , async(req , res) => {
    const {originalUrl} = req.body;

    if(!originalUrl){
        return res.status(400).json({error: 'Original URL is required'});
    }

    try{
        let existingUrl = await Url.findOne({originalUrl});
        if(existingUrl){
            return res.json({shortUrl : `http://localhost:5000/${existingUrl.shortCode}`})
            
        }

        const newUrl = new Url({originalUrl});
        await newUrl.save();

        res.json({shortUrl: `http://localhost:5000/${newUrl.shortCode}`});
    }catch(err){
     console.error(err);
     res.status(500).json({error: 'Server Error'});
    }

});

router.get('/:shortCode', async(req,res) => {
    try{
        const url = await Url.findOne({shortCode: req.params.shortCode});

        if(url){
            url.visitCount++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({error:"URL not found"});
        }
    } catch(err) {
console.error(err);
res.status(500).json({error: 'Server error'});
    }
})
module.exports = router;