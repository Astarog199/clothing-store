const API = 'https://raw.githubusercontent.com/Astarog199/online-store-api/main/';

const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    RepeatPassword:'',
    user:{
        FirstName:'', 
        LastName:'', 
        Gender:'', 
        Password:'',
        Email: '', 
        Status:'user'
      },
      users:[
        {FirstName:'Admin', 
        LastName:'Admin', 
        Gender:'Male', 
        Password:'Admin',
        mail: 'admin@mail.ru', 
        Status:'Administrator'},
  ],
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    add_newUser(){
      console.log('click')
      this.users.push(this.user);
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
  computed:{
    
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
