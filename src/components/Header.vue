<template>
<div>
    <b-navbar toggleable="md" type="light" variant="light">
        <b-navbar-brand href="#"><img src="@/assets/logo.png" alt="Logo Apki"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto text-center">
                <b-nav-item to="/" :active="$route.name=='main'">Bieżące</b-nav-item>
                <b-nav-item to="/favourites" :active="$route.name=='favourites'">Ulubione</b-nav-item>
                <b-nav-item to="/tasks" :active="$route.name=='tasks'">Zmień</b-nav-item>
                <b-nav-item to="/trash" :active="$route.name=='trash'">Kosz</b-nav-item>
                <b-nav-item to="/about" :active="$route.name=='about'">Info</b-nav-item>
                <b-nav-item to="/new" :active="$route.name=='new'">Nowe</b-nav-item>
                <b-nav-item @click="clearCurrentTask">Wyczyść</b-nav-item>
                <b-nav-item @click="logoutAction">Wyloguj</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import axios from "@/plugins/axios";
import { EventBus } from '@/plugins/event-bus.js';
import router from "@/router";

export default {
  name: 'Header',
  data() {
      return {}
  },
  methods: {
      clearCurrentTask: function() {
         axios
            .post('api/currentTask/clear')
            .then(response => {
                console.log("Odpowiedź:" + response.status);
                EventBus.$emit('task-cleared');
            }, 
            (error) => {
                console.log("Odpowiedź:" + error.status)
            })
        },
        logoutAction: function() {
            localStorage.removeItem("token");
            router.push('login');
        } 
}
}
</script>

<style scoped>
nav {
    background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 10%, rgb(207, 39, 89) 50%, rgba(252,176,69,1) 100%);
}

a {
    text-decoration:none;
    color:black; 
}
</style>