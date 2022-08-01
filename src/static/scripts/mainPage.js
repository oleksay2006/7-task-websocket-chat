const App = {
  data() {
    return {
    };
  },
  methods: {
    async logoutUser() {
      const id = window.location.pathname.slice(15, 39);
      const res = await fetch(`/v1/users/logout/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const info = await res.json();
      console.log(info);
      window.location = 'v1/users/';
    },
  },
};

Vue.createApp(App).mount('#app');
