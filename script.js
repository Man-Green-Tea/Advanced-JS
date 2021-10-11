const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest;
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject;
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(callback) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      callback();
    })
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  calcItems() { //так понимаю что далее это пойдёт в корзину
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price
    });
  }
}

class CartItem { }
class CartList { }
onload = function () {
  const list = new GoodsList();
  list.fetchGoods(() => {
    list.render();
  })
}



