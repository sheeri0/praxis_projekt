<template>
  <div>
      <h1 v-if="msg != null" class="text-center">{{ msg }}</h1>
      <b-form onsubmit="return false;">
        <div class="input-group">
           <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
           </div>
          <input type="text" class="form-control font-weight-bold" name="searchFilter" v-model="searchFilter" @input="getTasks" placeholder="Wyszukaj" />
        </div>
      </b-form>

      <div v-if="tasks != null && tasks.length > 0" class="card-deck">
        <b-table :items="tasks" :fields="fields" striped> 
          <template #cell(project)="data">
            {{ data.item.project.name }}
          </template>
          <template #cell(currentDuration)="data">
            <Duration :seconds="data.item.currentDuration"></Duration>
          </template>
        </b-table>
      </div>
  </div>
  
</template>

<script>
import axios from "@/plugins/axios";
import Duration from '@/components/Duration.vue';

export default {
  name: 'TasksTable',
  props: ['mode'],
  components: { Duration },
  data() {
      return {
        tasks: [],
        fields: [ 
          { key: 'title', sortable: true, label: 'Tytuł' }, 
          { key: 'project', sortable: true, label: 'Projekt' }, 
          { key: 'priority', sortable: true, label: 'Priorytet'  }, 
          { key: 'dueDate', sortable: true, label: 'Termin' }, 
          { key: 'currentDuration', label: 'Czas trwania', class: "text-right" } 
        ],
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
