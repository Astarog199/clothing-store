Vue.component('filter_block', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
    <div>
        <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <button class="btn-search" type="submit">
                <img src="style/img/search.png" alt="search">
            </button>
            <input type="text" class="search-field" v-model="userSearch">
        </form>
    </div>`
});
