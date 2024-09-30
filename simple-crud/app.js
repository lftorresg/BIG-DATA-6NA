const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/simple-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const ItemSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/', async (req, res) => {
    const items = await Item.find({});
    res.render('index', { items });
});

app.post('/items', async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        email: req.body.email
    });
    await newItem.save();
    res.redirect('/');
});

app.get('/items/:id/edit', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item });
});

app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email
    });
    res.redirect('/');
});

app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

const PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});