const App = {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async createUser() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };
      // console.log(data);
      const res = await fetch('/v1/users/registerNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const info = await res.json();
      // console.log(info);
      window.location = 'v1/users';
    },
  },
};

Vue.createApp(App).mount('#app');
