const express = require('express');
const connect = require('./db/connect');
const notFound = require('./middleware/not-Found');
const errorHandler = require('./middleware/error-Handler');
const app = express();
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use('/productImages', express.static('./data/productImage'))
app.use(express.json());
app.use(cors());

app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/products', require('./routes/products'));
app.use('/userinfo', require('./routes/userinfo'));
app.use('/cart', require('./routes/cart'));
app.use('/admin', require('./routes/admin'));
app.use('/buy', require('./routes/buy'));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`We are live on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
