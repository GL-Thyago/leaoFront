import Axios from "axios";

const api = Axios.create({
  baseURL: 'https://uni-leao-back.jagkzv.easypanel.host/api',  
  img: 'https://uni-leao-back.jagkzv.easypanel.host',  
  // // baseURL: 'http://127.0.0.1:8000/api', 
  // img: 'http://127.0.0.1:8000', 

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // dataType: 'jsonp',
  },
});

export default api;