const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testAndSync } = require('./config/db');
const { Categoria, Local, StatusItem } = require('./models');

const authRoutes = require('./routes/auth');
const itensRoutes = require('./routes/itens');
const commonRoutes = require('./routes/common');

const app = express();
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(UPLOAD_DIR));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/itens', itensRoutes);
app.use('/api', commonRoutes);

app.get('/', (req, res) => res.json({ message: 'API Achados e Perdidos (SQLite) OK' }));

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await testAndSync();

    // seed defaults if empty
    const cats = await Categoria.count();
    if (!cats) {
      await Categoria.bulkCreate([
        { nome: 'Documentos' },
        { nome: 'Eletrônicos' },
        { nome: 'Acessórios' },
        { nome: 'Roupas' },
        { nome: 'Mochilas / Bolsas' },
        { nome: 'Chaves' },
        { nome: 'Outros' }
      ]);
      console.log('Categorias padrão criadas.');
    }

    const locs = await Local.count();
    if (!locs) {
      await Local.bulkCreate([
        { nome: 'Bloco A' },
        { nome: 'Bloco B' },
        { nome: 'Biblioteca' },
        { nome: 'Pátio Principal' },
        { nome: 'Estacionamento' },
        { nome: 'Quadra' },
        { nome: 'Outro' }
      ]);
      console.log('Locais padrão criados.');
    }

    const stats = await StatusItem.count();
    if (!stats) {
      await StatusItem.bulkCreate([
        { nome: 'Perdido' },
        { nome: 'Encontrado' },
        { nome: 'Devolvido' }
      ]);
      console.log('Status padrão criados.');
    }

    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
