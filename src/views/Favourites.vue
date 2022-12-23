<template>
  <TasksList mode="favourites"></TasksList>
</template>

<script>
import TasksList from '@/components/TasksList.vue';

export default {
  name: 'Tasks',
  components: {
    TasksList
  },
}
</script>

<style>
</style>
