module.exports = (sequelize, DataTypes) => {
  return sequelize.define('StatusItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(50), allowNull: false }
  }, { tableName: 'status_itens', timestamps: false });
};
