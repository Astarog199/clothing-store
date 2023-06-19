Vue.component('katalog', {
    data() {
        return {
            catalogUrl: "",//DATAbase_clothing-store/catalogDATA.json
            products: [],
            filtered: [],
            userSearch: this.userSearch
        };
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
            this.products.forEach(el => {
                const block = document.querySelector(`.card-products[data-id="${el.id}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.remove('show');
                    block.classList.add('hidden');
                } else {
                    block.classList.remove('hidden');
                    block.classList.add('show');
                }
            })
        },

        //     func_countGoods() {
        //     this.getJson(`${API}DATAbase_clothing-store/getBasket.json`)
        //     .then(data => {
        //       for (let el of data.contents) {
        //         this.countGoods += el.quantity
        //       }
        //     })
        // },
    },
    computed: {

    },
    mounted() {
        this.$parent.getJson(`/api/katalog`) // parent == main.js
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
    <div>
        <product  v-for="product of products" :key="product.id" :product="product" class="card-products" :data-id=product.id>  </product>
    </div>
    `,
});

Vue.component('product', {
    props: ['product'],
    template: `
<div>
    <div class="card">
        <div>
            <a class="card-link" href="product.html">
                <img class="card-img" :src=product.foto alt="товар">
            </a>
        </div>
        <div class="add-to-cart">
            <span class="ButToCard" @click="$root.$refs.cart_head.addProduct(product)"> <img src="./style/img/icon2.png" alt="add-to-cart"> &nbsp Add to
                Cart</span>
        </div>
    </div>
    <div class="card-text">
        <h1 class="h1-products">{{product.title}}</h1>
        <p class="p-cci">{{product.text}}</p>
        <br>
        <p class="price"> $ {{product.price}} </p>
    </div>  
    
</div>
`
});

Vue.component('filter_block', {
    props: ['filtered', 'userSearch'],
    template: `
<div>
    <form action="#" class="search-form" @submit.prevent="filter">
        <button class="btn-search" type="submit">
            <img src="style/img/search.png" alt="search">
        </button>
        <input type="text" class="search-field" v-model="userSearch">
    </form>
</div>`
})