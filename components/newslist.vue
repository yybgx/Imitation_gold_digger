<template>
    <div class="box-card">
    <div class="head">
        <span>最新</span>
        <span>|</span>
        <span>最热</span>
        <span>|</span>
        <span>热榜</span>
    </div>
    <div class="item"  v-for="(news,index) in newslist" :key="index" v-on:click="todeatil(news.id)">
      <hr style="width:100%;">
      <div  class="gu">
        <span class="guangao" v-if="news.categories[0].Categoryname=='广告'">广告</span>
        <img :src="'http://localhost:1337'+news.image[0].url" class="item-img">
      </div>
      <div class="item-info"> 
          <span>{{news.auhors[0].name}}</span>
          <span>{{news.updatetime}}</span>
          <span>{{news.categories[0].Categoryname}}</span>
        <div class="item-text"><h4>{{ news.Newsname}}</h4></div>
        </div>

      </div>
    </div>
  </template>
  <script>
import axios from 'axios';
import Cookie from 'js-cookie';
  export default {
  data() {
  return {
       category:'',
       imageurl:'',
       newslist: [],
    categorylist:[1]
  }
},
created(){
  // this.load()
      console.log(this.$store.state.category_id+"22222")
      this.category_id=this.$store.state.category_id;
      if(this.category==0){
        this.$axios({
        method:'get',
        url:'http://localhost:1337/newslists/',
      }).then((result)=>{
        console.log(result);
        this.newslist=result.data;
        // this.imageurl='http://localhost:1337'+result.data[0].image[0].url;
        console.log('http://localhost:1337'+result.data[0].image[0].url);
        console.log(result.data[0].auhors[0].name);
      })
       Cookie.set('category','首页');
      }else{
        this.$axios({
        method:'get',
        url:'http://localhost:1337/categories/'+this.$store.state.category_id,
      }).then((result)=>{
        console.log(result);
        this.newslist=result.data;
        // this.imageurl='http://localhost:1337'+result.data[0].image[0].url;
        console.log('http://localhost:1337'+result.data[0].image[0].url);
        console.log(result.data[0].auhors[0].name);
      })
      }
},
  methods:{
    todeatil(n){
      Cookie.set('news_id',n);
      console.log(this.$store.state.news_id)
      this.$router.push('news_detail')
    },
    load(){
      let params={categorylist: 1};
      this.$axios({
        method:'post',
        url:'/api/ordinary/briefnews',
        params:params
      }).then((result)=>{
        console.log(result);
        this.newslist=result.data.data;
      })
    }
    }
}
  </script >
  
  <style >
  .gu{
    float: right;
    width: 8rem;
  }
  .guangao{
    margin-right: 0.8rem;
    float: right;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    text-align: center;
    width: 2rem;
    height: 1.5rem;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 0.2rem  rgb(123, 125, 126);
  }
  .head{
    width: 100%;
    height: 5vh;
  }
  .head span{
    font-size: large;
    margin-left: 1rem;
  }
  .head hr{
    border-color: #dcdcdc;
  }
  .box-card {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 55vw;
    background-color: rgb(255, 255, 255);
    margin-left: 14vw;
    box-shadow: 0 0.1rem 1rem  rgb(222, 218, 218);
  }
  .item{
  margin-left: 0.5rem;
  display: inline-block; 
  margin-bottom: 2rem;
  width: 54vw;
  /* background-color: rgb(255, 255, 255); */
  /* box-shadow: 0 0.1rem 0.5rem  rgb(222, 218, 218); */
}
.item-text{
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  width:45vw;
  /* background-color: green; */
}
.item-info{
  float: left;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width:45vw;
  /* background-color: rgb(127, 55, 86); */
}
/* .Aimg{
  margin-left: 0;
  background-color: rgb(92, 76, 146);
  float:left;
} */
.item-info span{
  border-right:1px solid #909090;
  margin-left:10px;
  padding-right:5px;
}
.item-img{
  margin-top: 0.2rem;
  margin-right: 0rem;
  float: right;
  width: 8rem;
  height: 6rem;
}
</style>