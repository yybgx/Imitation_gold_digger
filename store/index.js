const cookieparser =require('cookieparser')
//存储公共数据
export const state = ()=>({
    userId:11,
    role:'',
    token:'',
    category:'首页',
    category_id:0,
    news_id:'',
})
//完成数据的同步修改
export const mutations = {
    //修改用户信息
    updateUserId(state, payload) {
       state.userId=payload;
    },
    updateRole(state, payload) {
        state.role=payload;
     },
     updateToken(state, payload) {
        state.token=payload;
     },
     updatecategory_id(state, payload) {
      state.category_id=payload;
   },
   updatenews_id(state, payload) {
      state.news_id=payload;
   },
   updatecategory(state, payload) {
      state.category=payload;
   },
   setTheme(state, theme) {
      if (state.themes.includes(theme)) {
        state.theme = theme
        Cookies.set('theme', theme)
      }
    },
}


export const actions = {
   //  只能使用在store/index.js中的actoins中
   nuxtServerInit({commit}, {req}){
      let token='';
      let role='';
      let userId='';
      let news_id='';
      let category_id='';
      console.log("cookie——"+req.headers.cookie);
      //判断用户是否已登录
      if(req.headers.cookie){
         let parser=cookieparser.parse(req.headers.cookie);
         //修改token
         role=parser.role;
         userId=parser.userId;
         token=parser.token;
         news_id=parser.news_id;
         category_id=parser.category_id;
      }
      commit('updateToken',token);
      commit('updateRole',role);
      commit('updateUserId',userId);
      commit('updatenews_id',news_id);
      commit('updatecategory',category_id);
   }
}