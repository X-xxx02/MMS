<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <Tag/>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
  
  <script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Tag from "@/components/Tag";
export default {
  name: "Main",
  data() {
    return {};
  },
  components: {
    Aside,
    Header,
    Tag,
  },
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-aside {
  height: 100vh;
}
</style>


  