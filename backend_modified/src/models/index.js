const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = require('./usuario')(sequelize, DataTypes);
const Categoria = require('./categoria')(sequelize, DataTypes);
const Local = require('./local')(sequelize, DataTypes);
const StatusItem = require('./status_item')(sequelize, DataTypes);
const Item = require('./item')(sequelize, DataTypes);

// Associations
Categoria.hasMany(Item, { foreignKey: 'categoria_id' });
Local.hasMany(Item, { foreignKey: 'local_id' });
StatusItem.hasMany(Item, { foreignKey: 'status_id' });
Usuario.hasMany(Item, { foreignKey: 'usuario_id', onDelete: 'CASCADE' });

Item.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Item.belongsTo(Local, { foreignKey: 'local_id' });
Item.belongsTo(StatusItem, { foreignKey: 'status_id' });
Item.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = { Usuario, Categoria, Local, StatusItem, Item, sequelize };
