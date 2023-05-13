
const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';


const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: "DATAbase_clothing-store/catalogDATA.json",
    products:[],
  },
      methods: {
    getJson(url){
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },
    addProduct(good) {
      console.log(good);
    }
  },
  beforeCreate() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for(let el of data){
            this.products.push(el);
          }
        });
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
