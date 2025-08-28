const express = require('express');
const router = express.Router();
const { getProblems, getProblemById } = require('../controllers/problemController');
const auth = require('../middleware/auth');

router.get('/', auth, getProblems);
router.get('/:id', auth, getProblemById);

module.exports = router;
