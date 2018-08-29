import qs from "qs";
let isFormData = v => {
    return Object.prototype.toString.call(v) === "[object FormData]";
};
export default function({ $axios, redirect }) {
    $axios.defaults.transformRequest = [
        data => (isFormData(data) ? data : qs.stringify(data))
    ]; //请求使用表单形式
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 400) {
            redirect("/400");
        }
    });
}
