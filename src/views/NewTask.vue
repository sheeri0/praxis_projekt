<template>
  <div>
      <b-form class="container" v-on:submit.prevent>
        <b-form-group label="Nazwa zadania" label-for="inputTitle">
          <b-form-input type="text" id="inputTitle" v-model="task.title" :class="{ 'is-invalid': errors.title }" @input="validate('title')" />
          <b-form-invalid-feedback v-if="errors.title">{{ errors.title }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Projekt" label-for="inputProject">
          <b-form-select id="inputProject" v-model="idProject" :options="projects" value-field="id" text-field="name" :class="{ 'is-invalid': errors.project }" @input="mapProject"></b-form-select>
          <b-form-invalid-feedback v-if="errors.project">{{ errors.project }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Priorytet" label-for="inputPriority">
          <b-form-input type="text" id="inputPriority" v-model="task.priority"  :class="{ 'is-invalid': errors.priority }" @input="validate('priority')" />
          <b-form-invalid-feedback v-if="errors.priority">{{ errors.priority }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Termin realizacji" label-for="inputDueDate">
          <b-form-datepicker id="inputDueDate" :locale="locale" v-bind="datePickerLabels[locale] || {}" :min="min" v-model="task.dueDate"  :class="{ 'is-invalid': errors.dueDate }" @input="validate('dueDate')"> </b-form-datepicker>
          <b-form-invalid-feedback v-if="errors.dueDate">{{ errors.dueDate }}</b-form-invalid-feedback>
        </b-form-group>
        <div>
          <b-button type="submit" @click="saveTask" variant="dark">Zapisz</b-button>
        </div>
      </b-form>
      {{ msg }}
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: 'NewTask',
  data() {
      return {
        task: { title: null, project: null, priority: null, dueDate: null},
        errors: {  title: null, project: null, priority: null, dueDate: null },
        idProject: null,
        projects: [],
        wasValidated: false,
        msg: null,
        min: null,
        locale: "pl",
        datePickerLabels:  {
          pl: {
            labelPrevDecade: 'Poprzednia dekada',
            labelPrevYear: 'Poprzedni rok',
            labelPrevMonth: 'Poprzedni miesiąc',
            labelCurrentMonth: 'Aktualny miesiąc',
            labelNextMonth: 'Następny miesiąc',
            labelNextYear: 'Następny rok',
            labelNextDecade: 'Następna dekada',
            labelToday: 'Dziś',
            labelSelected: 'Ausgewähltes Datum',
            labelNoDateSelected: 'Brak wybranej daty',
            labelCalendar: 'Kalendarz',
            labelNav: 'Kalendarzonawigacja',
            labelHelp: 'Możesz nawigować strzłkami, a jak!'
          },
        }
      }
  },
  methods: {
      saveTask() {         
         if(!this.validate()) {
           return;
         }
         axios
            .post('api/tasks', this.task)
            .then(response => {
                this.msg = null;
                this.task = response.data;
                this.$router.push('/tasks');
            }).catch(
                error => {
                    if(error.response.status==400) {
                      this.msg = error.response.data.message;
                      console.log(error.response.data.errors);
                      if(error.response.data.errors) {
                        for (var index = 0; index < error.response.data.errors.length; index++) { 
                            var e = error.response.data.errors[index];
                            this.errors[e.field] = e.defaultMessage; 
                        } 
                      }
                    } else {
                      this.msg = error.response.data;
                    }
                    return Promise.reject(error)
            });          
      },
      getProjects() {         
         axios
            .get('api/projects')
            .then(response => {
                this.projects = response.data;
            }).catch(
                error => {
                  this.msg = error.response.data;
            });          
      },
      findById(project) {
        return project.id == this.idProject;
      },
      mapProject() {

        this.task.project = this.projects.filter(this.findById)[0];
        this.validate('project');
      },
      clearValidation() {
        this.wasValidated = false;
        this.errors.title = null;
        this.errors.project = null;
        this.errors.priority = null;
        this.errors.dueDate = null;
      },
      validate(field) {
        console.log("Walidacja");
        this.clearValidation();
        var ok = true;
        if(!field || field == 'title') {
          if(!this.task.title) {
            this.errors.title = "Tytuł jest wymagany";
            ok = false;
            console.log("Brak tytułu");
          }
        }
        if(!field || field == 'project') {
          if(!this.task.project) {
            this.errors.project = "Projekt jest wymagany";
            ok = false;
            console.log("Brak projektu");
          }
        }
        if(!field || field == 'priority') {
          if(!this.task.priority) {
            this.errors.priority = "Priorytet jest wymagany.";
            ok = false;
            console.log("Brak priorytetu");
          }
        }
        if(!field || field == 'dueDate') {
          if(!this.task.dueDate) {
            this.errors.dueDate = "Data jest wymagana";
            ok = false;
            console.log("Brak daty");
          }
        }

        console.log("Wynik walidacji "+ok);
        this.wasValidated = true;
        return ok;
      }
  },
  mounted () {
    this.getProjects();
    this.min = new Date();
  }
}
</script>

<style scoped>
</style>
