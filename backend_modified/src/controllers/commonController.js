const { Categoria, Local, StatusItem } = require('../models');

exports.listCategorias = async (req, res) => {
  const rows = await Categoria.findAll({ order: [['nome','ASC']] });
  res.json(rows);
};

exports.listLocais = async (req, res) => {
  const rows = await Local.findAll({ order: [['nome','ASC']] });
  res.json(rows);
};

exports.listStatus = async (req, res) => {
  const rows = await StatusItem.findAll({ order: [['id','ASC']] });
  res.json(rows);
};
