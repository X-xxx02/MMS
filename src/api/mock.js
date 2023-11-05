import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import user from "./mockServeData/user";
import mall from "./mockServeData/mall";
import permission from "./mockServeData/permission";
//使用Mock.js库来模拟接口请求
//将匹配到/api/home/getData路径的get请求映射到homeApi.getStatisticalData处理函数
//这里返回的是主页的图表数据
Mock.mock("/api/home/getData", homeApi.getStatisticalData);

//用户列表数据

//当用户发起请求时，负责拦截post请求，将请求路径映射到对应的处理程序，调用函数并返回模拟数据
Mock.mock(/api\/user\/getUser/,  user.getUserList);
Mock.mock("/api/user/add", "post", user.creatUser);
Mock.mock("/api/user/edit", "post", user.updateUser);
Mock.mock("/api/user/del", "post", user.deleteUser);

//拦截请求，请求商品数据
Mock.mock(/api\/mall\/getMall/,  mall.getMallList);
Mock.mock("/api/mall/add", "post", mall.creatMall);
Mock.mock("/api/mall/edit", "post", mall.updateMall);
Mock.mock("/api/mall/del", "post", mall.deleteMall);

//返回菜单数据
Mock.mock(/api\/permission\/getMenu/, "post", permission.getMenu);
