import axios from 'axios'

export function request1(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1'
  })

  // 添加请求拦截
  instance.interceptors.request.use(config => {
    // 在发送请求之前做某事
    // console.log(config);
    return config;
  }, err => {
    // 请求失败做某事
    // console.log(err);
  })

  // 添加响应拦截
  instance.interceptors.response.use(res => {
    // 对响应数据做些事
    // console.log(res);
    return res.data;
  }, err => {
    // 响应失败做某事
    // console.log(err);
  })

  return instance(config)
}

