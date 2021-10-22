const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_URL = "/catalogData.json";

const GOODS = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const transformGoods = function (goods) {
  return goods.map((_good) => {
    return {
      id: _good.id_product,
      title: _good.product_name,
      price: _good.price
    }
  })
}

const service = (method, postfix) => (
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${API_URL}${postfix}`, true);
    xhr.send();
    xhr.onload = (event) => {
      resolve(JSON.parse(event.target.response));
    }
  })
);

Vue.component('basket-goods-item', {
  props: ['item'],
  template: `
    <div class="basket-goods-item">
      <div>{{ item.title }}</div>
      <div></div>
      <div>{{ item.price }}</div>
      <button class="delete-button">Удалить</button>
    </div>
  `,
});

Vue.component('goods-item', {
  props: ['item'],
  template: `
    <div class="goods-item">
      <div>{{ item.title }}</div>
      <div>{{ item.price }}</div>
      <button class="add-button">Добавить</button>
    </div>
  `,
});

Vue.component('basket-card', {
  template: `
  <div class="basket-card">
  <slot></slot>
  </div>
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    goods: GOODS,
    filteredGoods: GOODS,
    basketCardVision: false,
    search: ''
  },
  mounted: function () {
    service('GET', GET_GOODS_URL).then((goods) => {
      const resultGoods = transformGoods(goods);
      this.goods = resultGoods;
      this.filteredGoods = resultGoods;
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
  }
})






















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



