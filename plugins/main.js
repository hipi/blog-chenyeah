import axios from "axios";
import qs from 'qs';
let isFormData = (v) => {
  return Object.prototype.toString.call(v) === '[object FormData]';
}
axios.defaults.transformRequest = [data =>isFormData(data)?data:qs.stringify(data)];//请求使用表单形式
