// 简单封装axio
import axios from 'axios';
//http request 拦截器
axios.interceptors.request.use(
    config =>{
        if(config.method!='get'){
            config.data = JSON.stringify(config.data);
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let token = window.sessionStorage.getItem("TOKEN");
        if(token){
            config.params = {'token':token}
        }
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
)
// http response 拦截器
axios.interceptors.response.use(
    response =>{
        //自己配置一些状态码
        // if(response.data.errCode == 2){
        // }
        return response;
    },
    error =>{
    //与后台人员协商配置
        return Promise.reject(error)
    }
)
 /**
 * get
 * @param url
 * @param params
 * @returns {Promise}
 */
 export function get(url,params={}){
     return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        })
        .then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            reject(err)
        })
     })
 }
 
 /**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
 export function post(url,params = {}){
     return new Promise((resolve,reject)=>{
         axios.post(url,params)
         .then(res=>{
            resolve(res.data)
         })
         .catch(err=>{
            reject(err)
         })
     })
 }
