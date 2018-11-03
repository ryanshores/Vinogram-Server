const express = require('express');

const { postComment } = require('./commentsActions');


const router = express.Router({ mergeParams: true });

router.post('/:wineid', postComment);

module.exports = router;