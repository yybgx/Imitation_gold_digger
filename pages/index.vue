<template>
  <div class="leftindex">
    <Bar />
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

</style>