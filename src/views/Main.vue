<template>
  <div class="text-center">
      <h1>{{msg}}</h1>
      <div v-if="task != null" :class={}>
            <h1 class="display-1">{{ task.title }}</h1> <h3 v-if="task.favourite != false">⭐</h3>
            <h2 class="text-secondary">{{ task.project.name }}</h2>
            <p v-if="task.dueDate != null"> Data wykonania: {{ task.dueDate }}</p>
            <h1 class="display-1"><duration :seconds="currentDuration"></duration></h1>
        <div>
            <button class="btn btn-success mr-1" @click="start" :disabled="this.task.status == 'started'"><i class="bi-play" /></button>
            <button class="btn btn-warning m-1" @click="pause"  :disabled="this.task.status == 'stopped'"><i class="bi-pause" /></button>
            <button class="btn btn-danger m-1" @click="finish"  :disabled="this.task.status == 'finished'"><i class="bi-stop" /></button>
        </div>      
      </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import { EventBus } from '@/plugins/event-bus.js';
import Duration from '@/components/Duration.vue';

export default {
  name: 'Main',
  components: { Duration },
  data() {
      return {
        task: null,
        msg: null,
        timer: null,
        retrieveTime: null,
        currentDuration: null
      }
  },
  methods: {
      getCurrentTask() {
         this.stopTimer();
         axios
            .get('api/currentTask')
            .then(response => {
                this.msg = null;
                this.task = response.data;

                if(response.status == 204) {
                    this.msg = "Nie masz przypisanego żadnego zadania";
                    this.task = null;
                } else {
                    if(this.task.status == "started") {
                        this.startTimer();
                    } else {
                        this.showStaticTime();
                    }
                }
            }).catch(
                error => {
                    this.msg = error.response;
                    return Promise.reject(error)
            });          
      },
      clearCurrentTask() {
         axios
            .post('api/currentTask/clear')
            .then(() => {
                this.getCurrentTask();
            }, 
            (error) => {
                this.msg = error.response.data.message;
            })
      },       
      start: function() {
         axios
            .post('api/currentTask/start')
            .then(() => {
                this.getCurrentTask();
            }, 
            (error) => {
                this.msg = error.response.data;
            })
      },       
      pause: function() {
         axios
            .post('api/currentTask/pause')
            .then(() => {
                this.getCurrentTask();
            }, 
            (error) => {
                this.msg = error.response.data;
            })
      },       
      finish: function() {
         axios
            .post('api/currentTask/finish')
            .then(() => {
                this.getCurrentTask();
            }, 
            (error) => {
                this.msg = error.response.data;
            })
      },
      stopTimer: function() {
          if(this.timer != null) {
              clearInterval(this.timer);
          }
      },
      startTimer: function() {
          this.retrieveTime = new Date();
          this.executeTimer()
          this.timer = setInterval(this.executeTimer, 1000);
      },
      executeTimer: function() {
          var secondsFromRetrieval = (new Date().getTime() - this.retrieveTime.getTime()) / 1000;
          var secondsFromStart = Math.round(this.task.currentDuration + secondsFromRetrieval);
          this.currentDuration = secondsFromStart;
      },
      showStaticTime: function() {

          if(this.task!=null) {
            this.currentDuration = this.task.currentDuration;
          } else {
            this.currentDuration = null;
          }
      }
  },
  mounted () {
    this.getCurrentTask();
    this.title = "Aktualne zadanie:";

    EventBus.$on('task-cleared', () => {
      this.getCurrentTask();
    });
  }
}
</script>

<style scoped>
</style>
