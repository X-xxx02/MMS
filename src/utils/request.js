import axios from "axios";

//创建axios实例--http
const http = axios.create({
  //配置通用请求的地址前缀
  baseURL: "/api",
  //配置超时时间,最大请求时间
  timeout: 1000,
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // config是当前请求的配置对象，我们拦截到后可以修改config，添加请求头、修改请求参数
    return config; //返回修改后的config对象，以便继续发送请求
  },
  function (error) {//捕获错误对象
    // 返回一个被拒绝的Promise
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
