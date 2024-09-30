const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Conectar ao MongoDB local
mongoose.connect('mongodb://localhost:27017/simple-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Configurar o middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Para suportar PUT e DELETE

// Definir o schema do MongoDB
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', ItemSchema);

// Rota principal (listar todos os itens)
app.get('/', async (req, res) => {
    const items = await Item.find({});
    res.render('index', { items });
});

// Rota para criar um novo item
app.post('/items', async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });
    await newItem.save();
    res.redirect('/');
});

// Rota para editar um item
app.get('/items/:id/edit', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item });
});

// Atualizar um item
app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    });
    res.redirect('/');
});

// Deletar um item
app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});