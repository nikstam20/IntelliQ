// TODO: require paths should be updated, waiting on the files & locations


const express = require('../node_modules/express');
const router = express.Router();
const pool = require('../connect');

router.get('/:username', function(req, res) {
    const { username } = req.params;
    // what does this endpoint do? vesk says return username?
});

module.exports = router;