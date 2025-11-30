const express = require('express');
const router = express.Router();
const common = require('../controllers/commonController');

router.get('/categorias', common.listCategorias);
router.get('/locais', common.listLocais);
router.get('/status', common.listStatus);

module.exports = router;
