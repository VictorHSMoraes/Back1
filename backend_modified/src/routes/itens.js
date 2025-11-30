const express = require('express');
const router = express.Router();
const itensController = require('../controllers/itensController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', itensController.getItems);
router.get('/:id', itensController.getItemById);

router.post('/', authMiddleware, upload.single('imagem'), itensController.createItem);
router.put('/:id', authMiddleware, upload.single('imagem'), itensController.updateItem);
router.delete('/:id', authMiddleware, itensController.deleteItem);

module.exports = router;
