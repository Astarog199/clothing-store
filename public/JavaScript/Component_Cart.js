Vue.component('cart', {
    data() {
        return {
            cartItems: [], 
            carttotal: 0, 
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id === product.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },

        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                            console.log(this.cartItems.indexOf(item));
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },

    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
                this.carttotal = data.amount;
                this.countGoods = data.countGoods;
            });
    },

    template: `
    <div> 
        <img style="padding: 50px;" v-if="!cartItems.length" src="./style/img/cart_empty.png" alt="cart is empty">
        <cart_item v-for="Item of cartItems" :key="Item.id" :Item="Item" @remove="remove">
        </cart_item>
    </div>`
});

Vue.component('cart_item', {
    props: ['Item', 'carttotal'],
    template: `
    <div class="lot">
        <img class="img" :src=Item.foto alt="img">
            <div class="lot-specification">
                <p class="lot-h">{{Item.title}} <br> T-SHIRT</p>
                <p class="lot-p">Price: $ {{ Item.price }} </p>
                <p class="lot-p">Color: Red</p>
                <p class="lot-p">Size: Xl </p>
                <p class="lot-p">Quantity: {{Item.quantity}} </p>
                <button class="del-btn" @click="$emit('remove', Item)">delete</button>
            </div>
        </div>
    </div>`
});

Vue.component('cart_total', {
    data() {
        return {
            carttotal: 0,
        }
    },
    props: ['carttotal'],
        mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                this.carttotal = data.amount;
            });
    },

    template: `
        <p class="p2-pay"> GRAND TOTAL {{carttotal}} $</p>
    `
});
