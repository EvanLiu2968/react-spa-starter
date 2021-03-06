/**
 * Created by evanliu2968
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';
// import store from '../../vuex/store.js';

axios.defaults.withCredentials = true; //跨域cookie设置

// 创建axios实例，设置默认参数
const service = axios.create({
  baseURL: '/',  // api的base_url
  headers: {
  'Content-Type': 'application/json;charset=UTF-8' // 'application/json' || 'application/x-www-form-urlencoded'
  },
  withCredentials : true, //跨域携带cookie
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

/**
 * 请求数据调用方法
 * @param method     请求方法
 * @param url     请求地址
 * @param data   post请求参数
 * @param params   get请求参数
 */

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * 下面的注释为通过response自定义status来标示请求状态，当status返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  const res = response.data;
  if (!res) {
  // if (res.status !== 200) {
    // message.error(res.msg || '请求异常');
    // 400:非法请求; 401:未授权;  403:服务器拒绝请求; 404:资源未找到
    // if (res.status === 401 || res.status === 403) {
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '提示', {
    //   confirmButtonText: '重新登录',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    //   }).then(() => {
    //   store.commit('loginOut');
    //   })
    // }
    return Promise.reject(res);
  } else {
    return res;
  }
  },
  error => {
  message.error(error.message || '请求错误');
  return Promise.reject(error);
  }
);

export default service;
