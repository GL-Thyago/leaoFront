import Axios from "axios";

const api = Axios.create({
  baseURL: 'https://uni-leao-back.qyxfvu.easypanel.host/api',  
  img: 'https://uni-leao-back.qyxfvu.easypanel.host',  

  // baseURL: 'http://192.168.15.164:8000/api', 
  // img: 'http://192.168.15.164:8000', 
  // baseURL: 'http://127.0.0.1:8000/api', 
  // img: 'http://127.0.0.1:8000', 
// 

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;