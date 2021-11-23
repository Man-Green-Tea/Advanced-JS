const cors = require('cors');
const express = require('express');
const { BASKET_GOODS_PATH } = require('./constants');
const { addItems, removeFromBasket } = require('./commonFunctions')


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));

app.patch('/api', (res, req) => {
    console.log(res.body);
    addItems(BASKET_GOODS_PATH, res.body).then((items) => {
        req.setHeader('Content-type', 'application/json');
        req.send(items);
    })
});

app.delete('/basket', (res, req) => {
    console.log(res.body);
    removeFromBasket(BASKET_GOODS_PATH, res.body.id).then((items) => {
        req.setHeader('Content-type', 'application/json');
        req.send(items);
    })
});

app.listen('8000', () => {
    console.log('server is run!');
})