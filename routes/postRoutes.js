const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Cambiar a un almacenamiento en la nube en producción

router.post('/', verifyToken, upload.single('imagen'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

module.exports = router;
