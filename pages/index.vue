<template>
  <div>
    <Bar />
    <newslist />
    <div>
      <!-- <nuxt-link :to="{name: 'about', params: {id: 3306 }}">params传参</nuxt-link> -->
    </div>
    <rightList />
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