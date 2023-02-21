<template>
  <div>
    <!-- <div class="SideRight">
         <div class="side" v-if="role=='新闻发布者'"> 
          <el-button type="primary" @click="editnews(newsdetail.news_id)">编辑新闻</el-button>
        </div>
         <div class="side" v-if="role=='新闻发布者'"> <el-button type="primary" @click="pushnews">确认发布</el-button></div>
         <div class="side" v-if="role=='新闻发布者'"> <el-button type="danger" icon="el-icon-delete" circle v-on:click="deletenews"></el-button></div>
       </div> -->
    <div class="sidebar">
      <div class="side">
        <img
          src="~/assets/images/点赞.svg"
          class="tubiao"
          @click="addlike"
          v-if="isture"
        />
        <img
          src="~/assets/images/点赞选中.svg"
          class="tubiao"
          @click="addlike"
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
          @click="readComment"
        />
      </div>
      <div class="side">
        <img
          src="~/assets/images/评论.svg"
          class="tubiao"
          @click="addComment"
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
            <!-- <span>更新时间:{{newsdetail.update_time}}</span> -->
          </h6>
          <h6>
            <span>创建时间:{{ newsdetail.updatetime }}</span>
          </h6>
        </div>
      </div>
      <div class="mydetail">
        <h5>{{ newsdetail.detail }}前言</h5>
        <hr class="hr" />
      </div>
      <div class="note">
        本文主要给大家带来今年2022年，互联网寒冬下，我的一些面试经历和经验，希望这篇文章能给正在找工作的同学们一点参考和帮助。
      </div>
      <div class="note" style="font-weight: 700">
        如果这篇文章对你有帮助，还请点赞+收藏
      </div>
      <div class="content">
        先说一下我的个人情况：本科毕业(一本)工作经验2年，2020年7月入职上一家公司，技术栈为Vue，在职期间做过前端监控SDK、监控告警平台、在线协作文档&表格等，参与过技术选型调研、架构设计等；
      </div>
      <div class="content">
        投了简历后面了字节、阿里，还有一些中小公司、非互联网公司，最后拿下字节、阿里等offer，入职了阿里，地点杭州；
      </div>
    </div>
    <!-- <div class="pass" v-if="role=='管理员'">
            <el-button type="primary">审核通过</el-button>
        </div> -->
    <!-- <div class="bbtwo" v-if="role=='新闻发布者'">
          <el-button type="primary" @click="pushnews">编辑新闻</el-button>
          <el-button type="primary" @click="pushnews">确认发布</el-button>
         <el-button type="danger" icon="el-icon-delete" circle v-on:click="deletenews"></el-button>
        </div> -->
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
    // console.log("新闻Id"+this.$store.state.news_id);
    //   console.log("身份"+this.$store.state.role);
    //   console.log("token="+this.$store.state.token);
    //   if(this.$store.state.role=="普通用户"){
    //     this.getdetail();
    //   }else if(this.$store.state.role=="新闻发布者"){
    //     this.pdetail();
    //   }else{
    //     this.Adetail()
    //   }
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
  methods: {
    changeValue(e) {
      this.$forceUpdate();
    },
    addlike() {
      let params = { news_id: this.$store.state.news_id };
      this.$axios({
        method: "post",
        url: "/api/ordinary/addlike",
        params: params,
        headers: {
          token: this.$store.state.token,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 200) {
          this.isadd = true;
          this.isture = false;
        }
      });
    },
    editnews(n) {
      Cookie.set("news_id", n);
      this.$router.push("drafts");
    },
    pushnews() {
      let data = {
        news_id: this.newsdetail.news_id,
        title: this.newsdetail.title,
        content: this.newsdetail.content,
        category: this.newsdetail.category_name,
      };
      this.$axios
        .post("/api/publisher/publishNews", data, {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.$message("发布成功!");
            this.$router.push("home");
          }
        });
    },
    deletenews() {
      let data = {
        news_id: this.$store.state.news_id,
      };
      this.$axios
        .post("/api/publisher/deleteNews", data, {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.$message("删除成功!");
            this.$router.push("home");
          } else if (response.data.code == 5108) {
            this.$message("正在审核中的新闻无法删除!");
          }
        });
    },
    pdetail() {
      let data = {
        news_id: this.$store.state.news_id,
      };
      this.$axios
        .post("/api/publisher/getNews", data, {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.newsdetail = response.data.data;
        });
    },
    Adetail() {
      console.log("新闻Id" + this.$store.state.news_id);
      let params = {
        news_id: this.$store.state.news_id,
      };
      this.$axios({
        method: "post",
        url: "/api/admin/getNewsDetailByNews_id",
        params: params,
        headers: {
          token: this.$store.state.token,
        },
      }).then((res) => {
        console.log(res);
        this.newsdetail = res.data.data;
      });
    },
    getdetail() {
      let params = { news_id: this.$store.state.news_id };
      this.$axios({
        method: "post",
        url: "/api/ordinary/detailnews",
        params: params,
      }).then((result) => {
        console.log(result);
        this.newsdetail = result.data.data;
      });
    },
    readComment() {
      this.$router.push("comment_user");
    },
    addComment() {
      this.$prompt("请输入评论", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then((content) => {
          this.$axios({
            headers: {
              token: this.$store.state.token,
            },
            method: "post",
            url: "/api/ordinary/addCommnets",
            params: {
              news_id: this.$store.state.news_id,
              content: content.value,
            },
          }).then((result) => {
            console.log(result);
            this.$message({
              type: "success",
              message: "评论成功！",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消评论",
          });
        });
    },
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
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  margin-right: 43.6rem;
  margin-bottom: 2rem;
  float: right;
  /* background-color: rgb(47, 78, 78); */
  display: inline;
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
  height: 45rem;
  width: 52.5vw;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.1rem 1rem rgb(222, 218, 218);
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
  margin-top: 7rem;
  background-color: rgb(255, 255, 255);
  /* box-shadow: 0 0.1rem 1rem  rgb(222, 218, 218); */
}
.mydetail h5 {
  margin-left: 1rem;
  color: rgb(94, 124, 224);
  font-size: 1.2rem;
}
.hr {
  width: 96%;
  color: #ccc;
}
</style>
