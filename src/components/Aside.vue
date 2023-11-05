<template>
 
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%;"
    >
      <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
      <!-- 无子菜单的 menu-->
      <!-- 这里clickMenu()需要拿到变量i保存的数据，即菜单项 -->
      <el-menu-item @click="clickMenu(i)" v-for="i in noChildren" :key="i.name" :index="i.name" >
        <i :class="`el-icon-${i.icon}`"></i>
        <span slot="title">{{ i.label }}</span>
      </el-menu-item>

      <!-- 有子菜单的 menu -->
      <el-submenu v-for="i in hasChildren" :key="i.label" :index="i.label">
        <template slot="title">
          <i :class="`el-icon-${i.icon}`"></i>
          <span slot="title">{{ i.label }}</span>
        </template>
        <!-- 动态渲染每个子菜单项 -->
        <el-menu-item-group  v-for="sub in i.children" :key="sub.path">
          <!-- 子菜单项 -->
          <!-- 这里clickMenu需要拿到变量sub保存的数据，即子菜单项 -->
          <el-menu-item @click="clickMenu(sub)" :index="sub.path">{{ sub.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  
</template>


  
  <script>
  import Cookie from "js-cookie";
export default {
  name: "Aside",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击侧边导航菜单时，进行一个路由的跳转
    //这个item是个变量，
    //因为我们的menu-item和sub-item都不是死数据，是我们根据data中的数据动态渲染出来的，
    clickMenu(item){
      
      //只有当前页面的路由与我们要跳转的路由不一致时，才让路由跳转
      //还有一种情况让路由跳：当前页面路由为'/home'且跳转的路由不是'/home'时
      //首先，首页展示的是'/',这个路径对应的组件是Main，Main组件只负责展示子路由，本身没有内容
      //但是不能让首页一片空白呀，于是乎当路由为‘/’时，将路由重定向为"/home"
      //这回，首页就展示的是'/home'路由，对应的组件是Home.vue
      //但是，想一想，当你点击导航栏中的首页菜单时，首页菜单的path为'/'
      //你要跳转的路由为：‘/’，你当前页面的路由为：‘/home’
      //所以&&前面的判断行不通，
      //实际上，当你点击***首页menu**时，你当前路由和要跳转路由都是‘/home’(上面提到过，‘/’会重定向为‘/home’)
      //所以，在哪种情况下，点击***首页menu**时，路由可以跳转呢??
      //即，在当前页面路由等于‘/home’情况下，判断要跳转的路由是否与当前页面路由相等
      //不相等则进入逻辑走跳转，相等则不可以跳。
      //2个判断任何一个判断返回false，说明糟糕的情况发生了，但幸好我们用得是逻辑与
      //所以最终返回的总判断为false，即不会发生跳转
     if (this.$route.path !== item.path && !((this.$route.path === '/home')&&(item.path === '/'))) {
      console.log('要跳转的路由为：',item.path)
      this.$router.push(item.path)
     }
     this.$store.commit('selectMenu',item)
     
  
      
    }
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    //如果cookie里面有menu,就从cookie里拿，没有（首次登陆）就从store中拿menu，动态渲染菜单
    menuData(){
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
     //拿到修改后的state，在模板中使用计算属性isCollapse
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    }
  },
 
  mounted(){
    console.log('当前页面的路由:',this.$route);
  },
};
</script>


<style lang="less" scoped>

 
  
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}
.el-menu{
  height: 100vh;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
}
}


</style>