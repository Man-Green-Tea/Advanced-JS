Vue.component('goods-item', {
    props: ['item'],
    template: `
      <div class="goods-item">
        <div>{{ item.title }}</div>
        <div>{{ item.price }}</div>
        <button class="add-button" @click="$emit('click', item)">Добавить</button>
      </div>
    `,
});