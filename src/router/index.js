import Vue from "vue";
//vue-router依赖vue，所以先加载vue包
import Router from "vue-router";
//导入路由组件
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Main from "../views/Main.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue"
//2.模块化机制 使⽤Router
Vue.use(Router);
//3.创建路由器对象
const router = new Router({
  //mode: 'history', //history模式 干净的网页地址 没有#/之类的符号存在,\
  //但是等项目打包部署到服务器上时，需要后端配合我们，否则，用户向服务器请求页面时，会将路由当作资源，会报错
  routes: [
    //主路由
    {
      path: "/",
      name:'main',
      component: Main,
      redirect: "/home", //将'/'重定向到'/home'
      //借助meta配置项来决定是否守卫路由，特别适合路由组件多的情景
      meta: { isAuth: true },
      //子路由
      children: [
        // {
        //   name: "home",
        //   path: "home",
        //   component: Home,
        // },
        // {
        //   name: "user",
        //   path: "user",
        //   component: User,
        // },
        // {
        //   name: "mall",
        //   path: "mall",
        //   component: Mall,
        // },
        // {
        //   name: "page1",
        //   path: "page1",
        //   component: PageOne,
        // },
        // {
        //   name: "page2",
        //   path: "page2",
        //   component: PageTwo,
        // },
      ],
    },
    {
      path: "/login",
      name:'login',
      component: Login,
    }
  ],
});

export default router;
