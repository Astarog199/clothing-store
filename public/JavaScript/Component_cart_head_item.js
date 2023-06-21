Vue.component('cart_head', {
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
        /*
      addProduct(product) {
        
          this.$parent.getJson(`/api/cart`)
              .then(data => {
                  if (data.result === 1) {
                      this.countGoods++;
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
      },*/
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
        <span class="IconWrap cartIcon">
            <a class="" href="cart.html"> <img src="style/img/icon2.png" alt="basket"></a>
        <span type="button" @click="isNone=!isNone"> {{countGoods}}</span>
        </span>
        <div class="basket" :class="{ hidden: isNone, show:!isNone}" :cartItems= "cartItems" >
    
        <div class="basketRow basketHeader">
            <div>Фото товара</div>
            <div>Название товара</div>
            <div>Количество</div>
            <div>Цена за шт.</div>
            <div>Итого</div>
        </div>

        <cart_head_item class="basketRow" v-for="Item_header of cartItems" :key="Item_header.id" :Item_header="Item_header">
           
        </cart_head_item>

        <div class="basketTotal">
            Товаров в корзине на сумму:
            $<span class="basketTotalValue">{{carttotal}}</span>
        </div>
    </div>

    </div>`

});


Vue.component('cart_head_item', {
    props: ['Item_header'],
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
});