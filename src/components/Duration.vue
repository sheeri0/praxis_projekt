<template>
  <div>
    {{ formattedTime }}
  </div>
</template>

<script>

export default {
  name: 'Duration',
  props: ['seconds'],
  data() {
      return { 
        
      }
  },
  methods: {
    formatSeconds: function(secondsToShow) {
          var minutes = Math.floor(secondsToShow / 60);
          var seconds = secondsToShow - minutes * 60;
          return minutes + ":" + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    }
  },
  computed: {
    formattedTime: function() {
      return this.formatSeconds(this.seconds);
    }
  }
}
</script>

<style scoped>

</style>