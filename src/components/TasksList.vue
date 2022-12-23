<template>
  <div>
      <h1 v-if="msg != null" class="text-center">{{ msg }}</h1>
      <b-form onsubmit="return false;">
        <div class="input-group">
           <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
           </div>
          <input type="text" class="form-control font-weight-bold" name="searchFilter" v-model="searchFilter" @input="getTasks" placeholder="Wyszukaj" />
           <div class="input-group-prepend">
              <b-dropdown right v-bind:text="currentFilter">
                <b-dropdown-item @click="sortBy('title', $event)">Tytuł</b-dropdown-item>
                <b-dropdown-item @click="sortBy('project', $event)">Projekt</b-dropdown-item>
                <b-dropdown-item @click="sortBy('priority', $event)">Priorytet</b-dropdown-item>
                <b-dropdown-item @click="sortBy('due-date', $event)">Data</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
      </b-form>

      <div v-if="tasks != null && tasks.length > 0" class="card-deck">
            <div v-for="task in tasks" :key="task.id" class="col-lg-3 col-md-4 col-sm-6 pt-4">
              <div class="card m-0" :style="setTaskBackground(task.project.color, task.priority)">
                <div class="card-body">
                  <h5 class="card-title">{{ task.title }}</h5>
                  <p class="card-text">{{ task.project.name }} </p>
                  <p class="card-text">{{ task.dueDate }} </p>
                  <div>
                    <a href="#" v-if="mode == 'finished'" class="btn btn-warning float-left" v-on:click="restoreTask(task.id)">Przywróć</a>
                    <a href="#" v-else class="btn btn-dark float-left" v-on:click="setCurrentTask(task.id)">Wybierz</a>
                    <span class="float-right" v-if="task.favourite" @click="removeFavourite(task.id)">⭐</span>
                    <span class="float-right" v-else style="filter:grayscale(100%); opacity:0.3;" @click="setFavourite(task.id)">⭐</span>
                  </div>
                </div>
            </div>
            </div>
      </div>
      <div v-else class="alert alert-secondary mt-5 col-12">
        <h5 v-if="mode == 'finished'">Kosz jest pusty, przejdź do <router-link to="/tasks">listy zadań</router-link></h5>
        <h5 v-else-if="searchFilter != null && mode != 'favourites'">Nie znalazłem takich zadań, może są w <router-link to="/trash">koszu</router-link></h5>
        <h5 v-else-if="mode != 'favourites'">To dobry dzień, nie masz zadań do wykonania</h5>
        <h5 v-if="mode == 'favourites'">Nie zaznaczono ulubionych zadań, przejdź do <router-link to="/tasks">listy zadań </router-link> i oznacz je klikając gwiazdkę! ⭐</h5>
      </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: 'TasksList',
  props: ['mode'],
  data() {
      return {
        tasks: [],
        msg: null,
        searchFilter: null,
        sort: null,
        currentFilter: "Sortuj"
      }
  },
  methods: {
    getTasks: function() {
            axios
            .get('api/tasks', { params: {
                        search: this.searchFilter,
                        mode: this.mode,
                        sort: this.sort
                    }})
            .then(response => {
                this.tasks = response.data;
                if (response.status == 204) {
                  this.msg = "Brak dostępnych zadań"
                }
            }, error =>{
              this.msg = "Błąd:" + error.status;
            })
        },
  setCurrentTask: function(taskId) {
    axios
    .post(`api/tasks/${taskId}/setCurrent`)
    .then(() => {
      this.$router.push('/');
    },
    error => {
      this.msg ="Błąd:" + error.response.data;
    })
  },
  restoreTask: function(taskId) {
    axios
    .post(`api/tasks/${taskId}/restore`)
    .then(() => {
      this.getTasks();
      // this.$router.push('/tasks');
    },
    error => {
      this.msg ="Błąd:" + error.response.data;
    })
  }, 
  setFavourite: function(taskId) {
    axios
    .post(`api/tasks/${taskId}/setFavourite`)
    .then(() => {
      this.getTasks();
    },
    error => {
      this.msg ="Błąd:" + error.response.data;
    })
  }, 
  removeFavourite: function(taskId) {
    axios
    .post(`api/tasks/${taskId}/removeFromFavourites`)
    .then(() => {
      this.getTasks();
    },
    error => {
      this.msg ="Błąd:" + error.response.data;
    })
  },
  convertToRGB: function(hex){
    hex = hex.replace("#","");
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
},
  setTaskBackground: function(hexColor, priority) {
    if (priority === 0) {
      priority = 0.25;
    }
    let bColor = this.convertToRGB(hexColor);
    bColor.push(1 * (priority * 0.20));
    let backgroundRGBA = `rgba(${bColor[0]},${bColor[1]},${bColor[2]},${bColor[3]})`
    return {
      backgroundColor: backgroundRGBA
    }
  },
  sortBy: function(field, element) {
    this.currentFilter = element.currentTarget.innerHTML;
    this.sort = field;
    this.getTasks();
  }
  },
  mounted () {
      this.getTasks()
      this.msg = "Twoje zadania:";
  }
}
</script>

<style scoped>
.card h5 { font-weight: bold; }
</style>
