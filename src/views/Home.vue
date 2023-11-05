<template>
  <el-row>
    <!-- 左侧 -->
    <el-col :span="9" style="padding-right: 10px">
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img src="../assets/images/user.png" alt="用户头像" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="logininfo">
          <p>上次登陆时间<span>2023-10-24</span></p>
          <p>上次登录地点<span>武汉</span></p>
        </div>
      </el-card>
      <!-- 统计表格 -->
      <el-card style="margin-top: 20px; height: 400px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(key, val) in tabelLabel"
            :key="key"
            :prop="val"
            :label="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="15" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="i in countData"
          :key="i.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${i.icon}`"
            :style="{ backgroundColor: i.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ i.value }}</p>
            <p class="desc">{{ i.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 220px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 220px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 208px">
          <!-- 柱状图 -->
        <div ref="echarts2" style="height:206px"></div>
        </el-card>
        <el-card style="height: 208px">
        <!-- 饼状图 -->
        <div ref="echarts3" style="height:150px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api"; //解构赋值
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [
        // {
        //   name: "oppo",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "vivo",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "苹果",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "小米",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "三星",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
        // {
        //   name: "魅族",
        //   todayBuy: 100,
        //   monthBuy: 300,
        //   totalBuy: 800,
        // },
      ],
      tabelLabel: {
        name: "品牌",
        todayBuy: "日销量",
        monthBuy: "月销量",
        totalBuy: "总销量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 655,
          icon: "s-goods",
          color: "#5abe1f",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 655,
          icon: "s-goods",
          color: "#5abe1f",
        },
      ],
    };
  },
  //在mounted请求数据
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      console.log(tableData);
      this.tableData = tableData; //给当前组件实例对象上的tableDat赋值我们请求到的数据

      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var echarts1Option = {};
      //处理数据xAxis
      const { orderData,userData,videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };

      echarts1Option.tooltip = {};
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);

      //柱状图

      //实例化一个echarts实例对象
      const echarts2 = echarts.init(this.$refs.echarts2);
      //配置这个echarts2对象
      const echarts2Option = {
        legend:{
          //图例文字颜色
          textStyle:{
            color:"#333"
          }
        },
        grid:{
          left:"20%"
        },
        //提示框
        tooltip:{
          trigger:"axis"
        },
        xAxis:{
          type:"category",//类目轴
          data: userData.map(item => item.date),
          axisLine:{
            lineStyle:{
              color:"#17b3a3"
            }
          },
          axisLabel:{
            inteval:0,
            color:"#333"
          }
        },

        yAxis:[
          {
            type:"value",
            axisLine:{
              lineStyle:{
                color:"#17b3a3"
              }
            }
          }
        ],
        color:["#2ec7c9","#b6a2de"],
        series:[
          {
            name:'新增用户',
            data:userData.map(item=>item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:userData.map(item=>item.active),
            type:'bar'
          }
        ]

      }
      echarts2.setOption(echarts2Option);

       //饼状图
    const echarts3 = echarts.init(this.$refs.echarts3);//拿到echarts实例对象
    const echarts3Option = {
        //提示框
        tooltip:{
          trigger:"item"
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series:[
            {
              data:videoData,
              type:'pie'
            }
        ],
    }
    echarts3.setOption( echarts3Option)

    });

   
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 14px;
  border-bottom: 1px solid #ccc;

  img {
    width: 100px;
    height: 100px;
    margin-right: 40px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 1px;
    }
    .access {
      color: #999999;
    }
  }
}
.logininfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 25px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>