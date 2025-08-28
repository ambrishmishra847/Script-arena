const express = require('express');
const router = express.Router();
const { createSubmission } = require('../controllers/submissionController');
const auth = require('../middleware/auth');

router.post('/', auth, createSubmission);

module.exports = router;
