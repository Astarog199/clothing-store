const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    RepeatPassword: '',
    user: {
      FirstName: '',
      LastName: '',
      Gender: '',
      Password: '',
      Email: '',
      Status: 'user'
    },
    users: [
      {
        FirstName: 'Admin',
        LastName: 'Admin',
        Gender: 'Male',
        Password: 'Admin',
        mail: 'admin@mail.ru',
        Status: 'Administrator'
      },
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

    add_newUser() {
      console.log('click')
      this.users.push(this.user);
    },

    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        });
    },

    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        });
    },

    deleteJson(url, data) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        });
    },

  },
  computed: {

  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    console.log(this);
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  }
});