import axios from "axios";
import qs from 'qs';
axios.defaults.transformRequest = [data => qs.stringify(data)];//请求使用表单形式
