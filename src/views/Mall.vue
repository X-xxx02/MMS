<template>
  <div class="manage">
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
      center
    >
      <div class="dialog-form">
        <!-- 添加商品 -->
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="80px"
          style="width: 55%"
        >
          <el-form-item label="商品品牌" prop="brand">
            <el-select v-model="form.brand" placeholder="请选择商品品牌">
              <el-option label="苹果" value="苹果"></el-option>
              <el-option label="vivo" value="vivo"></el-option>
              <el-option label="oppo" value="oppo"></el-option>
              <el-option label="魅族" value="魅族"></el-option>
              <el-option label="三星" value="三星"></el-option>
              <el-option label="小米" value="小米"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品价格" prop="money" style="width: 47%">
            <el-input v-model="form.money" type="number"></el-input>
          </el-form-item>

          <el-form-item label="上架日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择上架日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="商品数量" prop="count" style="width: 47%">
            <el-input v-model="form.count" type="number"></el-input>
          </el-form-item>
        </el-form>
      </div>

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
      <el-form :inline="true" :model="mallForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="mallForm.name"></el-input>
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
        <el-table-column prop="brand" label="品牌">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="价格"> </el-table-column>
        <el-table-column prop="date" label="上架日期"> </el-table-column>
        <el-table-column prop="count" label="库存"> </el-table-column>

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
import { getMall, editMall, delMall, addMall } from "../api";
export default {
  name: "Mall",
  data() {
    return {
      active: 0,
      dialogVisible: false,
      form: {
        brand: "",
        money: "",
        date: "",
        count: "",
      },
      //校验表单
      rules: {
        brand: [{ required: true, message: "请输入品牌" }],
        money: [{ required: true, message: "请输入价格" }],
        date: [{ required: true, message: "请选择日期" }],
        count: [{ required: true, message: "请输入商品数量" }],
      },
      tableData: [], //表格数据
      modalType: 0, //0表示新增的弹窗，1表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      mallForm: {
        name: "",
      },
    };
  },
  methods: {
    //点击新增时，显示弹窗
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //新增表单提交时验证合法性
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单数据的处理
          if (this.modalType === 0) {
            //通过校验并且是新开的弹窗，将用户信息添加到mall列表中
            addMall(this.form).then((response) => {
              //post请求成功，即返回的是resolvedPromise，重新获取列表的接口
              console.log(response); //请求成功时返回的response
              //重新请求列表接口
              this.getList();
            });
          } else {
            editMall(this.form).then((response) => {
              //修改已有商品
              console.log(response,"修改过后的response");
              //post请求成功，重新请求列表的接口
              this.getList();
            });
          }
           //清空表单的数据
         this.$refs.form.resetFields();
          console.log('走到了')
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
    //处理修改
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      //对当前行进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },
    //处理删除
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
          await delMall({ id: row.id });
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
      const params = {
        ...this.mallForm,
        ...this.pageData,
        ...this.tableData,
        ...this.brandMap,
      };
      //发起请求
      getMall({ params }).then(({ data }) => {
        console.log(data, "返回的Data");
        this.tableData = data.list;
        console.log(this.tableData,"tableData数据")

        this.total = data.count || 0;
      });
    },

    //选择页码的回调函数
    handlePage(val) {
      //console.log(val,'val')
      this.pageData.page = val;
      this.getList();
    },

    //查询列表
    onSubmit() {
      console.log(this.mallForm.name,"拿到的是什么？")
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
  .dialog-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>