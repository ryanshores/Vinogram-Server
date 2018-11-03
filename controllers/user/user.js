const express = require('express');

const { getAnimals } = require('./userActions');

const router = express.Router({mergeParams: true});

router.get('/animals', getAnimals);

module.exports = router;
