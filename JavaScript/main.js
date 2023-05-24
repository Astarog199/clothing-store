const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    // func_countGoods() {
    //   this.getJson(`${API}DATAbase_clothing-store/getBasket.json`)
    //     .then(data => {
    //       for (let el of data.contents) {
    //         this.countGoods += el.quantity
    //       }
    //     })
    // },
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
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
