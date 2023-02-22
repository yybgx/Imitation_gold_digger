<template>
    <div class="Bar">
          <ul class="ba">
            <li v-for="(p,index) in navs" :key="index" >
              <span class="bartext">{{ p.tapname}}</span>
            </li>
          </ul>
    </div>
  </template>
  <script >
  export default {
  data() {
    return {
         navs: [],
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://localhost:1337/taps/",
    }).then((result) => {
      console.log(result);
      this.navs= result.data;
    });
  },
  }
  </script >
  
  <style >
 .Bar{
  text-align: center;
 }
  .ba{
    margin-left: 13rem;
    margin-top: 0rem;
    margin-top: auto;
    display: flex;
  text-align: center;
  list-style:none
  }
  .ba li {
    padding: 0 1vw;
    cursor: pointer;
    margin: auto 0;
  }
  
  </style>