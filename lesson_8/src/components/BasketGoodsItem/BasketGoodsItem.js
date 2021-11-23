Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
      <div class="basket-goods-item">
        <div>{{ item.title }}</div>
        <div></div>
        <div>{{ item.price }}</div>
        <button class="delete-button" @click="$emit('click', item)">Удалить</button>
      </div>
    `,
});