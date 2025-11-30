const { Item, Categoria, Local, StatusItem, Usuario } = require('../models');
const { Op } = require('sequelize');

exports.createItem = async (req, res) => {
  try {
    const { titulo, descricao, categoria_id, local_id, data_ocorrido } = req.body;
    const usuario_id = req.user.id;
    const imagem = req.file ? req.file.filename : null;

    const item = await Item.create({
      titulo, descricao, categoria_id: categoria_id || null,
      local_id: local_id || null, usuario_id, data_ocorrido: data_ocorrido || null,
      imagem
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar item' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const where = {};
    const { categoria, local, status, q } = req.query;
    if (categoria) where.categoria_id = categoria;
    if (local) where.local_id = local;
    if (status) where.status_id = status;
    if (q) where.titulo = { [Op.like]: `%${q}%` };

    const items = await Item.findAll({
      where,
      include: [Categoria, Local, StatusItem, { model: Usuario, attributes: ['id','nome','email'] }],
      order: [['data_registro', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar itens' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, { include: [Categoria, Local, StatusItem, Usuario] });
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });

    if (item.usuario_id !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para editar' });
    }

    const updates = req.body;
    if (req.file) updates.imagem = req.file.filename;
    await item.update(updates);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    if (item.usuario_id !== req.user.id) return res.status(403).json({ message: 'Sem permissão' });
    await item.destroy();
    res.json({ message: 'Item deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar' });
  }
};
