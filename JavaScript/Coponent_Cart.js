Vue.component('cart', {
    data() {
        return {
            basketUrl: "DATAbase_clothing-store/getBasket.json",
            cartItems: [],
            carttotal: 0,
            countGoods: 0,
            isNone: true,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}DATAbase_clothing-store/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id === product.id);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        remove(item) {
            this.$parent.getJson(`${API}DATAbase_clothing-store/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        // this.countGoods--;
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },

    mounted() {
        this.$parent.getJson(`${API + this.basketUrl}`)
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
    props: ['Item',],
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
    </div>
    `
})

Vue.component('cart_head', {
    props: ['countGoods', 'isNone'],
    template: `

<div>
    <span class="IconWrap cartIcon">
        <a class="" href="cart.html"> <img src="style/img/icon2.png" alt="basket"></a>
        <span @click="isNone=!isNone"> {{countGoods}}</span>
    </span>

    <div class="basket" :class="{ hidden: isNone, show:!isNone}">
    
        <div class="basketRow basketHeader">
            <div>Фото товара</div>
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>

        <cart_head_item class="basketRow" v-for="Item_header of cartItems" :key="Item_header.id" :Item_header=Item_header>
           
        </cart_head_item>

        <div class="basketTotal">
            Товаров в корзине на сумму:
            $<span class="basketTotalValue">{{carttotal}}</span>
        </div>
    </div>
</div>`
});

Vue.component('cart_head_item', {
    props: ['cartItems', 'carttotal'],
    template: `
<div>
    <div> <img class="Item_header_pictures" :src=Item_header.foto alt="Some image"> </div>
    <div>
        <p>{{Item_header.title}}</p>
    </div>
    <div> <span class="productCount">{{Item_header.quantity}}</span> шт. </div>
    <div> $ {{Item_header.price}}</div>
    <div>
        $<span class="productTotalRow">{{Item_header.quantity * Item_header.price}}</span>
    </div>
</div>
`
})