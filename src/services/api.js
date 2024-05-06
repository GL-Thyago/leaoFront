import Axios from "axios";

const api = Axios.create({
  baseURL: 'https://uni-back-leao.h6bl0d.easypanel.host/api',  
  img: 'https://uni-back-leao.h6bl0d.easypanel.host',  

  // baseURL: 'http://192.168.43.4:8000/api', 
  // img: 'http://192.168.43.4:8000', 
// 

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
