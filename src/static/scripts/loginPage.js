const App = {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      const data = {
        email: this.email,
        password: this.password,
      };
      console.log(JSON.stringify(data));
      const res = await fetch('/v1/users/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const info = await res.json();
      const id = info.data._id;
      // console.log(id);
      window.location = `v1/users/chat/${id}`;
    },
  },
};

Vue.createApp(App).mount('#app');
