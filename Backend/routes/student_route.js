const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Student GET');
});

router.post('/', (req, res) => {
    res.send('Student POST');
});

router.put('/', (req, res) => {
    res.send('Student PUT');
});

router.delete('/', (req, res) => {
    res.send('Student DELETE');
});

module.exports = router;