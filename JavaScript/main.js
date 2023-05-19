const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    catalogUrl: "DATAbase_clothing-store/catalogDATA.json",
    basketUrl: "DATAbase_clothing-store/getBasket.json",
    products: [],
    cartItems: [],
    filtered: [],
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
    remove(item) {
      this.getJson(`${API}DATAbase_clothing-store/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
              this.countGoods = -1;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
          }
        })
    },
    addProduct(product) {
      this.getJson(`${API}DATAbase_clothing-store/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id === product.id);
            if (find) {
              find.quantity++;
              this.countGoods = +1;
            } else {
              let prod = Object.assign({ quantity: 1 }, product);
              this.cartItems.push(prod);
            }
          } else {
            alert('Error');
          }
        })
    },
    filter() {
      let regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.title));
    },

    func_countGoods() {
      this.getJson(`${API}DATAbase_clothing-store/getBasket.json`)
        .then(data => {
          for (let el of data.contents) {
            this.countGoods += el.quantity
          }
        })
    },
  },

  beforeCreate() {
  },

  created() {
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

    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });
    this.func_countGoods(el);

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
