const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: "DATAbase_clothing-store/catalogDATA.json",
    basketUrl: "DATAbase_clothing-store/getBasket.json",
    products: [],
    cartItems: [],
    carttotal: 0,
    countGoods: 0,
    isNone: true,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(good) {
      console.log(good);
    },
    filter(value) {
      const regexp = new RegExp(value, 'i');
      this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
      this.allProducts.forEach(el => {
        const block = document.querySelector(`.product-item[data-id="${el.id}"]`);
        if (!this.filtered.includes(el)) {
          block.classList.remove('show');
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
          block.classList.add('show');
        }
      })
    }
  },
  beforeCreate() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      });

  },
  beforeMount() {

  },
  mounted() {
    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
        this.carttotal = data.amount;
        this.countGoods = data.countGoods;
      });
  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  }
})
