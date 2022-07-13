//axios 的封装
// 导入axios
import Vue from 'vue';
import axios from 'axios'
import {getCookies} from "../utils/cookie";
import { Toast } from 'vant';
Vue.use(Toast);
//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: 'https://tpuat.tongpumed.com/prod-api', // https://tpuat.tongpumed.com/prod-api  http://192.168.0.163:8842/prod-api https://www.tongpumed.com/prod-api
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 7 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    console.log(config, 'config')
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers =config.headers["Access-Control-Allow-Origin"]?{...config.headers} :  {
        "Access-Control-Allow-Origin":true,
        "Content-Type": "application/json;charset=UTF-8"
    }
    //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    // const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
    const token = getCookies("token")||"";
    if(token){
        console.log(token)
        // config.params = {'token':token} //如果要求携带在参数中
        config.headers.accesstoken= token; //如果要求携带在请求头中
    }
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        const status = response.data.status;
        const msg = response.data.msg;
        const res = response.data;
        console.log(response,'ppppp')
        if (response.config.responseType !== 'blob') {
            // console.log(response.config,'yyyyyy')
            if (status !== 200) {
                Toast(res.msg);
                return Promise.reject(new Error(msg || 'Error'))
            } else {
                return res
            }
        }
        return res
    },
    (error) => {
        let res = error.response
        if (error.response) {
            if (res.status == 401) {
                console.log(res, 'res')
            }
        }
        return Promise.reject(error)
    }
)

export default service
