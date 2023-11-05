<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请输入性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button @click="handleAdd" size="mini" type="primary">
        + 新增</el-button
      >
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template></el-table-column
        ></el-table
      >
      <div class="paper">
        <el-pagination
          layout="prev,pager,next"
          :total="total"
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      //校验表单
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //0表示新增的弹窗，1表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //点击新增时
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //表单提交时验证合法性
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单数据的处理
          if (this.modalType === 0) {
            //通过校验并且是新开的弹窗，将用户信息添加到user列表中
            addUser(this.form).then((response) => {
              //post请求成功，即返回的是resolvedPromise，重新获取列表的接口
              console.log(response); //请求成功时返回的response
              //重新请求列表接口
              this.getList();
            });
          } else {
            editUser(this.form).then((response) => {
              console.log(response);
              //post请求成功，重新请求列表的接口
              this.getList();
            });
          }
          //清空表单的数据
          this.$refs.form.resetFields();
          //  console.log(this)

          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    //弹窗关闭的时候
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //点击取消按钮时
    cancle() {
      this.handleClose();
    },
    //处理提交
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      //对当前行进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },
    async handleDelete(row) {
      try {
        const confirmResult = await this.$confirm(
          "此操作将永久删除该文件，是否继续？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch(() => "cancle"); //当点击取消时，返回的是rejectedPromise，捕获到后，返回cancle给变量confirmResult

        //然后根据用户点击的结果，做相应处理
        if (confirmResult === "confirm") {
          await delUser({ id: row.id });
          this.$message.success("删除成功");
          this.getList();
        } else if (confirmResult === "cancle") {
          this.$message.info("已取消删除");
        }
      } catch (error) {
        this.$message.error("操作失败");
      }
    },

    //获取列表的数据
    getList() {
      //发起请求
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },

    //选择页码的回调函数
    handlePage(val) {
      //console.log(val,'val')
      this.pageData.page = val;
      this.getList();
    },

    //查询列表
    onSubmit() {
      this.getList();
    },
  },

  mounted() {
    this.getList();
  },
};
</script>
  
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 10px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>