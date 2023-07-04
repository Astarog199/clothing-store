Vue.component('katalog', {
    data() {
        return {
            catalogUrl: "",
            products: [],
            filtered: [],
        };
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        },
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
        <product  v-for="product of filtered" :key="product.id" :product="product" class="card-products" :data-id=product.id>  </product>
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
