const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { GOODS_PATH, BASKET_GOODS_PATH } = require('./constants');

const readItems = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        })
    })
}

const writeItems = function (path, items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(items), (err) => {
            if (err) {
                reject(err);
            }
            resolve(items);
        })
    })
}

const addItems = (path, item) => {
    return new Promise((resolve, reject) => {
        readItems(path).then((items) => {
            const resultItems = [...items];
            resultItems.push(item);
            writeItems(path, resultItems).then((_resultItems) => {
                resolve(_resultItems)
            }).catch((err) => {
                reject(err);
            })
        })
    });
}



const removeFromBasket = function (path, item) {
    return new Promise((resolve, reject) => {
        readItems(path).then((items) => {
            const resultItems = [...items];
            resultItems = resultItems.filter(item);
            writeItems(path, resultItems).then((_resultItems) => {
                resolve(_resultItems);
            }).catch((err) => {
                reject(err);
            })
        })
    })
}

// function updateBasket(items) {
//     items.countGoods = 0;
//     items.amount = 0;
//     items.contents.forEach(item => {
//         items.countGoods += item.quantity;
//         items.amount += item.quantity * item.price;
//     });
// }

module.exports = {
    addItems,
    removeFromBasket
}