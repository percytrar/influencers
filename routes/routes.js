const express = require('express');
const router = express.Router();

const influencer = require('../controllers/influencers');

router.get('/influencers', influencer.getInfluencers);

module.exports = router;