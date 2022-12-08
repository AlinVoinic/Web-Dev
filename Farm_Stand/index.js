/*  cd  ~/OneDrive/Desktop/Front\ End\ Dev/EXPRESS_MONGO\(ose\)
    Vom crea o mini aplicatie web in care vom efectua operatii CRUD pe anumite informatii direct din interfata, ce au efect in BD.
    Aplicatia presupune managerierea inventarului unui magazin de alimente din ferma (ce/cate alimente avem, care sunt sold out etc)

    npm init -y
    npm i express  ejs  mongoose method-override
*/

const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(e => {
        console.log("MONGO CONNECTION ERROR!")
        console.log(e)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

// dorim sa aplicam in mod dinamic categoria unui produs astfel incat sa apara categoria corecta!
const categories = ['fruit', 'vegetable', 'dairy']  // line 45,64 + new.ejs si eit.ejs
// de asemenea daca se adauga ulterior alta categorie, nu mai trebuie sa hardcodam acel <option>


app.get('/products', async (req, res) => {
    // async route handler cu await pe un query (mongoose operation) este FOARTE DES intalnit!
    const { category } = req.query;
    if (category) {  // daca exista categoria in query, afisam toate elementele care au categoria!
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});  // asteptam thenable response
        res.render('products/index', { products, category: "All" }); // pasam modelul in template
    }
})


app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
app.post('/products', async (req, res) => { //line 27
    const newProduct = new Product(req.body); //nu tine cont de validare sau error handling!
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
})


app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const oldProduct = await Product.findById(id);
    res.render('products/edit', { oldProduct, categories })
})
// POST salveaza, PUT schimba tot, PATCH modifica partial!
app.put('/products/:id', async (req, res) => { // line 15 / 30
    const { id } = req.params;
    const newProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    // puteam folosi doar findById, inlocuiam fiecare proprietate cu valorile din req.body, apoi save() (rula validarea automat!)
    res.redirect(`/products/${newProduct._id}`) // redirect opreste utilizatorul din a reface request-ul + better UI/UX.
    // puteam folosi si doar 'id', dar folosim '_id' pentru a verifica ca primim produsul updatat!
    // daca nu asteptam thenable-ul, nu vom putea accesa _id, care este id-ul documentului updatat!
})


app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


app.listen(8080, () => {
    console.log("Listening on port 8080!")
})