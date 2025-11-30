module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING(150), allowNull: false },
    descricao: { type: DataTypes.TEXT },
    categoria_id: { type: DataTypes.INTEGER },
    local_id: { type: DataTypes.INTEGER },
    status_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    data_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    data_ocorrido: { type: DataTypes.DATEONLY },
    imagem: { type: DataTypes.STRING(255) }
  }, { tableName: 'itens', timestamps: false });
};
