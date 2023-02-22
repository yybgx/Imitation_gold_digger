<template>
  <div>
    <div class="sidebar">
      <div class="side">
        <img
          src="~/assets/images/点赞.svg"
          class="tubiao"
          v-if="isture"
        />
        <img
          src="~/assets/images/点赞选中.svg"
          class="tubiao"
          v-if="isadd"
        />
      </div>
      <div class="side">
        <img src="~/assets/images/收藏 .svg" class="tubiao" />
      </div>
      <div class="side">
        <img
          src="~/assets/images/note.svg"
          class="tubiao"
        />
      </div>
      <div class="side">
        <img
          src="~/assets/images/评论.svg"
          class="tubiao"
        />
      </div>
      <hr />
      <div class="side">
        <img src="~/assets/images/举报.svg" class="tubiao" />
      </div>
    </div>
    <div class="detail" v-if="state">
      <h2>{{ newsdetail.Newsname }}【2022面经】：offer总结</h2>
      <div class="mytitle">
        <div class="A"><img :src="avatar" /></div>
        <div class="B">
          <h6>
            <span>作者:{{ this.authorname }}</span>
            <span>
              <img
                src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-5.d08789d.png"
                alt=""
                style="width: 35px; height: 16px"
            /></span>
          </h6>
          <h6>
            <span>创建时间:{{ newsdetail.updatetime }}</span>
          </h6>
        </div>
      </div>
      <div class="mydetail">
        <h5>前言：{{ newsdetail.title }}</h5>
        <hr class="hr" />
      </div>
      <div class="note">
        本文主要给大家带来今年2022年，互联网寒冬下，我的一些面试经历和经验，希望这篇文章能给正在找工作的同学们一点参考和帮助。
      </div>
      <div class="note" style="font-weight: 700">
        如果这篇文章对你有帮助，还请点赞+收藏
      </div>
      <div class="content">
        {{ newsdetail.detail}}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      avatar: "",
      authorname: "",
      news_id: "",
      state: true,
      isture: true,
      isadd: false,
      role: "",
      newsdetail: [],
      comments: [{}],
    };
  },
  created() {
    this.role = this.$store.state.role;
    this.news_id = this.$store.state.news_id;
    this.$axios({
      method: "get",
      url: "http://localhost:1337/newslists/" + this.news_id,
    }).then((result) => {
      console.log(result);
      this.newsdetail = result.data;
      this.authorname = result.data.auhors[0].name;
      this.avatar =
        "http://localhost:1337" + result.data.auhors[0].avatar[0].url;
      // this.imageurl='http://localhost:1337'+result.data[0].image[0].url;
      console.log(this.newsdetail);
    });
  },

};
</script>

<style>
.content {
  width: 90%;
  font-size: 1rem;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 0 2rem;
  line-height: 1.5rem;
  margin-bottom: 4rem;
}
.note {
  width: 80%;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  box-shadow: -0.2rem 0rem rgb(94, 124, 224);
  background-color: rgb(242, 245, 252);
}
.A {
  /* background-color: aqua; */
  width: 2rem;
  height: 2rem;
  float: left;
  margin-bottom: 2rem;
}
.A img {
  margin-left: 1rem;
  width: 50px;
  height: 50px;
}
.B {
  margin-left: 5rem;
}
.B h6 {
  margin: 0;
}
.SideRight {
  text-align: center;
  margin-top: 10rem;
  margin-right: 15vw;
  float: right;
  width: 5rem;
}
.sidebar {
  margin-top: 10rem;
  margin-left: 10vw;
  float: left;
  width: 5rem;
}
.side {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}
.pass {
  margin-left: 2rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;
  height: 10%;
  width: 10%;
  box-shadow: 0 0.1rem 1rem rgb(222, 218, 218);
  background-color: rgb(255, 255, 255);
  display: inline-block;
}
.bbtwo {
  margin-left: 2rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;
  height: 12%;
  width: 10%;
  box-shadow: 0 0.1rem 1rem rgb(222, 218, 218);
  background-color: rgb(255, 255, 255);
  display: inline-block;
}
.bbtwo el-button {
  margin-top: 2rem;
}
.detail {
  display: inline-block;
  margin-left: 2vw;
  margin-top: 1rem;
  height:100%;
  width: 52.5vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 1rem rgb(222, 218, 218);
}
.detail h2{
  margin-left: 2rem;
  margin-right: 1rem;
}
.comment {
  display: inline-block;
  margin-left: 17vw;
  margin-top: 2rem;
  height: 100%;
  width: 52.5vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 1rem rgb(222, 218, 218);
}
.mytitle {
  /* display: inline; */
  /* text-align: center; */
  margin-right: 1rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}
.mytitle h2 {
  margin-left: 1rem;
}
.mydetail {
  padding-left: 0.2rem;
  padding-top: 0.2rem;
  /* padding-bottom: 0.5rem; */
  margin-right: 1rem;
  margin-left: 0.8rem;
  margin-top: 2rem;
  background-color: rgb(255, 255, 255);
  /* box-shadow: 0 0.1rem 1rem  rgb(222, 218, 218); */
}
.mydetail h5 {
  margin-left: 1rem;
  color: rgb(94, 124, 224);
  font-size: 1.2rem;
  margin-right: 1rem;
}
.hr {
  width: 96%;
  color: #ccc;
}
</style>
