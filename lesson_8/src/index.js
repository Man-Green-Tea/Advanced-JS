import { GET_GOODS_URL, ADD_GOOD_URL, REMOVE_GOOD_URL, GET_BASKET_GOODS_URL } from './constants';
import { service } from './services';
import * as components from './components';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    basketCardVision: false,
    search: ''
  },
  mounted: function () {
    service('GET', GET_GOODS_URL).then((goods) => {
      // const resultGoods = transformGoods(goods);
      this.goods = goods;
      this.filteredGoods = goods;
    });
    service('GET', GET_BASKET_GOODS_URL).then((basketGoods) => {
      this.basketGoods = basketGoods;
    })
  },
  methods: {
    filterGoods: function (event) {
      this.filteredGoods = this.goods.filter(({ title }) => {
        return new RegExp(this.search, 'i').test(title);
      })
    },
    openBasketCard: function () {
      this.basketCardVision = true;
    },
    closeBasketCard: function () {
      this.basketCardVision = false;
    },
    addGood: function ({ title, price, id }) {
      console.log({ title, price, id });
      service('PATCH', ADD_GOOD_URL, JSON.stringify({
        id,
        title,
        price
      })).then((_basketGoods) => {
        this.basketGoods = _basketGoods
      })
    },
    deleteGood: function ({ title, price, id }) {
      // console.log({ title, price, id }); для проверки
      service('DELETE', REMOVE_GOOD_URL, JSON.stringify({ title, price, id })).then((_basketGoods) => {
        this.basketGoods = _basketGoods
      })
    },
  }
});






















// function makeGETRequest(url, callback) {
//   // let xhr;
//   // if (window.XMLHttpRequest) {
//   //   xhr = new XMLHttpRequest;
//   // } else if (window.ActiveXObject) {
//   //   xhr = new ActiveXObject;
//   // }

//   // xhr.onreadystatechange = function () {
//   //   if (xhr.readyState === 4) {
//   //     callback(xhr.responseText);
//   //   }
//   // }
//   // xhr.open('GET', url, true);
//   // xhr.send();
//   fetch(url)
//     .then(response => response.json())
//     .then(data => callback(data))
// }

// class GoodsItem {
//   constructor(product_name, price) {
//     this.product_name = product_name;
//     this.price = price;
//   }
//   render() {
//     return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
//   }
// }
// class GoodsList {
//   constructor() {
//     this.goods = [];
//     this.filteredGoods = [];
//   }

//   fetchGoods(callback) {
//     makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//       this.goods = goods;
//       this.filteredGoods = goods;
//       callback();
//     });
//   }

//   filterGoods(value) {
//     const regexp = new RegExp(value, 'i');
//     this.filterGoods = this.goods.filter(good => regexp.test(good.product_name));
//     this.render();
//   }

//   render() {
//     let listHtml = '';
//     this.filteredGoods.forEach(good => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       listHtml += goodItem.render();
//     });
//     document.querySelector('.goods-list').innerHTML = listHtml;
//   }

//   calcItems() { //так понимаю что далее это пойдёт в корзину
//     let sum = 0;
//     this.goods.forEach(good => {
//       sum += good.price
//     });
//   }
// }
// searchButton.addEventListener('click', (e) => {
//   const value = searchInput.value;
//   list.filterGoods(value);
// });
// class CartItem { }
// class CartList { }
// onload = function () {
//   const list = new GoodsList();
//   list.fetchGoods(() => {
//     list.render();
//   })
// }



