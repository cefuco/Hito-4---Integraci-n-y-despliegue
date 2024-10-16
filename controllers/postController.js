const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

exports.createPost = async (req, res) => {
  const { titulo, descripcion, precio, categoria } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const post = new Post({
      titulo,
      descripcion,
      precio,
      imagen_url: result.secure_url,
      categoria,
      usuario_id: req.userId,
    });
    await post.save();
    res.status(201).json({ mensaje: 'Publicación creada', post });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('usuario_id', 'nombre');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('usuario_id', 'nombre');
    if (!post) return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
};
