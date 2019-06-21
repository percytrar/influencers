const express = require('express');
const router = express.Router();

const influencer = require('../controllers/influencers');

router.use('/', (req,res,next)=>{
    next();
})
router.get('/influencers', influencer.getInfluencers);

module.exports = router;