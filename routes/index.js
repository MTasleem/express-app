const express = require('express');
const router = express.Router();

router.route('/hello').get((req, res) => {
    res.status(200).json({ message: 'Its working...' })
});

module.exports = router;
