<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Tag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    //点击Tag跳转的功能
    changeMenu(item) {
      console.log(item, "item");
      //判断目标路由是否与当前路由相同
      if (this.$route.name !== item.name) {
        //点击某个tab，主内容区域跟着跳转，即跳到对应的路由
        this.$router.push({ name: item.name });
      }
    },
    //点击tag删除
    handleClose(item, index) {
      console.log("index:", index);
      //只要点击删除tag，length就已经是删除之后的长度了
      this.closeTag(item);
      console.log(this.tags, "删除后");
      const length = this.tags.length;

      //删除之后的跳转
      //1.删除未被选中的tag，即item.name !== this.$route.name,那就什么都不做
      if (item.name !== this.$route.name) return;

      //2删除的是tags[]中的最后一项，那就需要把它的前一项设置成当前路由
      //注意，if里的index是我们删除的这一项的tag的索引
      if (index === length) {
        this.$router.push(
          { name: this.tags[index - 1].name } //这里是根据name、找到对应的route
        );
      } else {
        //如果删除的是选中的并且不是最后一项的tag，那么其后面的元素会自动补齐
        this.$router.push({ name: this.tags[index].name });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>