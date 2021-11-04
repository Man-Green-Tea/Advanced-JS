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
        console.log('addBasket');
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

const removeFromBasket = (path, item_id) => {
    return new Promise((resolve, reject) => {
        console.log('removeFromBasket');
        readItems(path).then((items) => {
            const resultItems = [...items];
            resultItems.filter(() => {
                console.log(item);
                return (item != item_id)
            })
            fs.writeFile(path, resultItems).then((_resultItems) => {
                resolve(_resultItems);
            }).catch((err) => {
                reject(err);
            })
        })
    })
}


module.exports = {
    addItems,
    removeFromBasket
}