<template>
  <div id="container">
    <img
      :src="imageurl"
      alt=""
    />
    <div class="onload">
      <img
        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png"
        alt=""
      />
      <p>下载稀土掘金APP</p>
      <p>一个帮助开发者成长的社区</p>
    </div>
    <div class="writer">
      <span>🎖️作者榜</span>
      <ul>
        <li v-for="(p,index) in writerList" :key="index">
          <img
            :src="'http://localhost:1337'+p.avatar[0].url"
            alt=""
          />
          <span>
            <i>{{p.name}}</i>
            <img
              :src="level"
              alt=""
            />
            <p>{{p.Introduce}}</p>
          </span>
        </li>
      </ul>
      <p>完整榜单 ></p>
    </div>
  </div>
</template>

<script>
export default {
    name:"rightList",
    data(){
        return{
          level:"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-5.d08789d.png",
          imageurl:'',
            writerList:[
                // {
                //     imgUrl:"https://p3-passport.byteimg.com/img/user-avatar/f00ed7cb67569c31d1f314fda68d87b4~100x100.awebp",
                //     writer:"云牧",
                //     level:"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-5.d08789d.png",
                //     profile:"B站Up@云下牧羊人"
                // },
                // {
                //     imgUrl:"https://p3-passport.byteimg.com/img/user-avatar/61130727b6e6bf9ed813434aeaed8ac3~100x100.awebp",
                //     writer:"GUGGZ",
                //     level:"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-7.5da15b8.png",
                //     profile:"公众号:前端充电宝"
                // },
                // {
                //     imgUrl:"https://p3-passport.byteimg.com/img/user-avatar/2f795a3e8faa2fe3dacb94148b57425b~100x100.awebp",
                //     writer:"程序员老鱼",
                //     level:"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-4.a78c420.png",
                //     profile:"前端工程师,自媒体人"
                // }
            ]
        }
    },
    created(){
      this.$axios({
        method:'get',
        url:'http://localhost:1337/auhors',
      }).then((result)=>{
        console.log(result);
        let author=result.data[0]
        for(let i=1;i<result.data.length;i++){
          if(result.data[i].ranking<=author.ranking)
          {
            this.writerList[i-1]=result.data[i];
          }
          else{
            this.writerList[i-1]=author;
            author=result.data[i];
          }
        }
        console.log(this.writerList);
      }),
      this.$axios({
        method:'get',
        url:'http://localhost:1337/advertisements/1',
      }).then((result)=>{
        console.log(result);
        this.imageurl='http://localhost:1337'+result.data.Image.url
        console.log(this.imageurl)
      })
    }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 240px;
  position:absolute;
  right:170px;  
  top:125px;
}
#container > img {
  width: 240px;
  height: 200px;
  margin-bottom: 10px;
}
#container .onload {
  width: 240px;
  height: 74px;
  /* border:1px solid red; */
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 0.5rem  rgb(222, 218, 218);
}

#container .onload img {
  width: 50px;
  height: 50px;
  float: left;
  margin: 10px 0px 0px 10px;
}
#container .onload p {
  line-height: 22px;
  font-size: 12px;
  display: block;
  float: left;
  margin-left: 20px;
}
#container .onload p:nth-child(2) {
  font-size: 14px;
  line-height: 30px;
  margin-top: 10px;
  /* color:red */
}
#container .onload p:nth-child(3) {
  color: #86909c;
}

#container .writer {
  width: 240px;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 0.5rem  rgb(222, 218, 218);
}
#container .writer > span {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  border-bottom: 1px solid #86909c;
  display: block;
  margin-bottom: 5px;
  margin-left: 5px;
}
#container .writer ul {
  width: 240px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 0.5rem  rgb(222, 218, 218);
}
#container .writer ul li {
  width: 240px;
  height: 60px;
  padding: 15px 0px 10px 0px;
  list-style-type: none;
}
#container .writer ul li:hover {
  background-color: #f4f5f5;
  cursor: pointer;
}
#container .writer ul li img {
  width: 45.6px;
  height: 45.6px;
  border-radius: 50px;
  margin-left: 10px;
  float:left;
}
#container .writer ul li span {
  float: left;
  display: block;
  margin-left:10px; 
}
#container .writer ul li span > img {
  width: 35px;
  height: 16px;
 
}
#container .writer ul li span >i{
    float:left;
}
#container .writer ul li span > p {
  color: #909090;
  font-size: 12px;
  clear:both
}
#container .writer > p {
  text-align: center;
  color: #007fff;
  cursor: pointer;
  margin-top:10px;
  height:30px;  
}
</style>