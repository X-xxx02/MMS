<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="less" >
html,body{
  margin:0;
  height:100%;
}
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
#app{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
