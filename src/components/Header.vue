<template>
  <div class="header-container">
    <div class="left-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->

      <el-breadcrumb separator="/">
        <!-- 动态渲染 -->
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="用户头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancle">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      
    };
  },
  methods: {
    //提交mutations，调用collapseMenu()修改state中的isCollapse
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      console.log("登出！！！");
      //退出系统时清除token
      if (command === "cancle") {
        //清除cookie中的token
        Cookie.remove("token");
        //清除cookie中的
        Cookie.remove("menu");
        //跳回登陆页面
        this.$router.push("/login");
      }
    },
   
  },
  computed: {
    //这里使用ES6结构语法，将mapState返回的对象*解构*直接拿到tags这个对象
    ...mapState({
      //给这个对象起个别名叫tags
      tags: (state) => state.tab.tabList, //调用此函数，它会返回一个对象
    }),
  },
  mounted() {
    console.log(this.tags, "tags");
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .right-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .left-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }

    //样式穿刺/deep/
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
          font-weight: normal;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>