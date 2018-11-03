const express = require('express');

const { signup, signin } = require('./authActions');
const imageParser = require('../cloudinary/cloudinary');

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Hello user' }));

router.post('/signup', imageParser.single('image'), signup);

router.post('/signin', signin);

module.exports = router;
