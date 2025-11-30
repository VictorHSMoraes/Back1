module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Local', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(120), allowNull: false }
  }, { tableName: 'locais', timestamps: false });
};
