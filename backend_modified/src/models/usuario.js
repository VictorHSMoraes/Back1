module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(255), allowNull: false },
    data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: 'usuarios', timestamps: false });
};
