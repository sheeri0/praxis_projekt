<template>
  <div>
      <h1 class="text-center">{{ msg }}</h1>
     <form onsubmit="return false;">
        <div class="form-group">
            <label for="inputTitle">Login</label>
            <input type="text" class="form-control" id="inputLogin" v-model="login" placeholder="Login">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model="password" placeholder="Hasło">
        </div>
        <button type="submit" @click="loginAction" class="btn btn-primary">Zaloguj</button>
      </form>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: 'Login',
  data() {
      return {
        login: null,
        password: null,
        msg: null
      }
  },
  methods: {
      loginAction: function() {
    axios
    .post(`api/auth/signin`, { "login": this.login, "password": this.password })
      .then(response => {
        localStorage.token = response.data.token;
        this.$router.push('/');
      },
    error => {
      this.msg ="Błąd:" + error.response.data.message;
    })
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
