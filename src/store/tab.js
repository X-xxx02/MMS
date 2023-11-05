import Cookie from "js-cookie";
//管理菜单相关的数据
export default {
  state: {
    isCollapse: false, //控制菜单的展开还是收起
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ], //面包屑数据
    menu: [],
  },
  mutations: {
    //修改菜单展开还是收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //更新面包屑数据
    selectMenu(state, val) {
      console.log(val, "val");
      //判断添加的数据是否为首页
      if (val.name !== "home") {
        //如果它不是首页，并且在tabList数组中它不存在，那就把这个val push到tabList数组中
        //这样就可以在header组件中拿到并显示它啦
        //这里主要是拿到当前对象中的name属性去判断它是否存在于数组，如果它存在于数组，那么findIndex返回它的索引，如果不存在，就返回-1
        const index = state.tabList.findIndex((item) => item.name === val.name);
        //如果不存在，就可以将数据添加到tabList
        if (index === -1) {
          state.tabList.push(val);
        }
      }
    },
    //点击tab，清除tablist中的数据
    closeTag(state, item) {
      console.log("closeTag被调用了", item);
      const index = state.tabList.findIndex((val) => val.name === item.name);
      this.state.tab.tabList.splice(index, 1);
      console.log(item, "此时的item");
    },
    //将login传递过来的menu的数据存入state以便其他组件使用
    setMenu(state, val) {
      console.log(val);
      state.menu = val;//val->data.menu
      //持久化存储，以防页面刷新，数据丢失and数据跨页面共享
      Cookie.set("menu", JSON.stringify(val));
      // console.log('cookie!!',Cookie.get('menu'))
    }, 
    //动态注册路由
    addMenu(state, router) {
      //容错判断，判断当前缓存中是否有数据
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      //组装动态路由的数据
      const menuArray = [];
      menu.forEach((item) => {
        //有子菜单的情况
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);//给子路由添加component属性
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });

      //子路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute("main",item);
      });
    },
  },
};
