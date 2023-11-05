import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import "./api/mock";

// 按需引入element-ui，只引入我们需要的button组件,可以减小打包后文件的体积
import {
  Button,
  Row,
  Col,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  menuItemGroup,
  menuItem,
  Dropdown,
  dropdownMenu,
  dropdownItem,
  Card,
  Table,
  tableColumn,
  Breadcrumb,
  breadcrumbItem,
  Tag,
  Dialog,
  Form,
  formItem,
  Input,
  Select,
  Option,
  datePicker,
  Pagination,
  MessageBox,
  Message,
  Steps,
  Step
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Cookie from "js-cookie";

Vue.config.productionTip = false;

Vue.component(Button.name, Button); //全局注册Button组件
Vue.component(Row.name, Row);
Vue.component(Container.name, Container);
Vue.component(Aside.name, Aside);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.use(tableColumn);
Vue.use(Table);
Vue.use(Card);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Tag);
Vue.use(Submenu);
Vue.use(Dialog);
Vue.use(menuItemGroup);
Vue.use(menuItem);
Vue.use(Dropdown);
Vue.use(dropdownMenu);
Vue.use(dropdownItem);
Vue.use(Breadcrumb);
Vue.use(breadcrumbItem);
Vue.use(Form);
Vue.use(formItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(datePicker);
Vue.use(Pagination);
Vue.use(Steps);
Vue.use(Step);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = Cookie.get("token");
  //token不存在并且路由不为Login，说明当前用户未登录，跳转到Login
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    //当用户已经进入系统，不能跳回Login页面
    next({ name: "home" });
  } else {
    next();
  }
});

// //应用程序初始化逻辑
// function initializeApp() {
//   //检查缓存中是否有menu
//   const storeMenu = Cookie.get("menu");
//   if (storeMenu) {
//     const menu = JSON.parse(storeMenu);
//     //获取菜单数据，存入store中
//     store.commit("setMenu", menu);
//     store.commit("addMenu", router);
//   }
// }


new Vue({
  render: (h) => h(App),
  router, //将router挂载到root，从而让整个应用都有路由功能
  store,
  created() {//页面刷新，vue实例重新加载时，重新添加动态路由
    store.commit('addMenu',router);
  },
}).$mount("#app");

// initializeApp();