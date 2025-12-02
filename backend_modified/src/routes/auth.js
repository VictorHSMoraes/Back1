const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put("/update", auth, controller.update);
router.get("/me", auth, controller.me);


module.exports = router;
