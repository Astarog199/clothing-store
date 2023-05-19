Vue.component('some-el', {
    data() {
        return {

        };
    },
    methods: {

    },
    computed: {

    },
    mounted() {
        console.log('components', this);
    },
    template: `<form action="#" class="search-form" @submit.prevent="filter">
                <input type="text" v-model="userSearch">
                <button type="submit">найти</button>
                </form>`,
})