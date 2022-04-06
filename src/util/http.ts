import axios from "axios";

const config = {
  baseURL: "http://localhost:3000",
  timeout: 10000
};

const http = axios.create(config);

// 默认 post 请求，使用 application/json 形式
http.defaults.headers.post["Content-Type"] = "application/json";

// http response 拦截器
http.interceptors.response.use(
  (response) => {
    //拦截响应，做统一处理
    if (response.data.code) {
      // console.log(response.status);
      switch (response.status) {
        case 301:
          console.log("登录过期");
      }
    }
    return response.data;
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error.response.status); // 返回接口返回的错误信息
  }
);

export default http;
