<template>
  <div>
    <Bar />
     <newslist />
      <!-- <rightbar/> -->
  </div>
 
</template>
<script >
export default {
  name: 'IndexPage',
  methods:{
       increment(step) {
          this.$store.commit('increment', step);
       },
       
       asyncIncrement (step) {
          this.$store.dispatch('asyncIncrement', step);
       }
    }
}
</script>
<style>  
  
</style>