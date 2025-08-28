const express = require('express');
const router = express.Router();
const { handleAiRequest } = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/request', auth, handleAiRequest);

module.exports = router;
