<template>
  <div class="leftindex">
    <header class="hb"><Bar /></header>
    <newslist />
    <div class="rightindex">
      <rightList />
    </div>
  </div>
</template>
<script >
import rightList from '../components/rightLIst'
export default {
  name: 'IndexPage',
  components:{
    rightList
  },
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
.hb{
   margin: 0;
    position: relative;
    width: 100%;
    height: 2rem;
    background-color: rgb(255, 255, 255);
    padding: 1rem;
    box-shadow: 0 0.1rem 0.5rem  rgb(222, 218, 218);
    margin-bottom: 1rem;
}
</style>