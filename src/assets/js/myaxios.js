import axios from 'axios'
var myaxios = {}
//添加一个install方法
myaxios.install = function(Vue){
    //统一挂载请求路径
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
    //将axios挂载到vue的原型上
    Vue.prototype.$http = axios
}
//暴露出去
export default myaxios