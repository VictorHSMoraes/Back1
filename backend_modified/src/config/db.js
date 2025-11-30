const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false
});

async function testAndSync() {
  try {
    await sequelize.authenticate();
    console.log('SQLite conectado com sucesso.');
    await sequelize.sync();
    console.log('Modelos sincronizados.');
  } catch (err) {
    console.error('Erro ao conectar ao SQLite:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, testAndSync };
