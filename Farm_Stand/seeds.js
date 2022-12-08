// Fisier folosit pentru popularea bazei de date, SEPARAT de aplicatia in sine, pentru development purposes (good practice!)

const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(e => {
        console.log("MONGO CONNECTION ERROR!")
        console.log(e)
    })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Milk',
        price: 2.59,
        category: 'dairy'
    }
]

// daca avem cel putin un obiect din array care nu trece validarea, atunci array-ul nu va fi inserat in BD!
Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(e => console.log(e))