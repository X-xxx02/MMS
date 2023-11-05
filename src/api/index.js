import http from "../utils/request";

//请求首页数据
export const getData = () => {
  //这里返回的是resolvedpromise或者rejectpromise，
  //然后前端那里再通过then()或catch()做相应处理
  return http.get("/home/getData");
};

//定义一个请求函数
export const getUser = (params) => {
  console.log(params, "params");
  //返回用户列表
  return http.get("/user/getUser", params);
};

//添加用户信息
export const addUser = (data) => {
  //将用户信息添加到/user/add接口
  return http.post("/user/add", data);
};

//更新用户信息
export const editUser = (data) => {
  return http.post("/user/edit", data);
};

//删除用户信息
export const delUser = (data) => {
  return http.post("/user/del", data);
};

//获取菜单
export const getMenu = (data) => {
  return http.post("/permission/getMenu", data);
};

//商品列表部分
//定义一个请求函数
export const getMall = (params) => {
  console.log(params, "params");
  //返回用户列表
  return http.get("/mall/getMall", params);
};

//添加商品信息
export const addMall = (data) => {
  //将用户信息添加到/user/add接口
  return http.post("/mall/add", data);
};

//更新商品信息
export const editMall = (data) => {
  return http.post("/mall/edit", data);
};

//删除商品信息
export const delMall = (data) => {
  return http.post("/mall/del", data);
};
