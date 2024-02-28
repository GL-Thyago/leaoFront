import Axios from "axios";

const api = Axios.create({
  baseURL: 'https://leao-leao-back.jx1fyp.easypanel.host/api',
  img: 'https://leao-leao-back.jx1fyp.easypanel.host',

  // baseURL: 'http://192.168.15.3:8000/api',
  // img: 'http://192.168.15.3:8000',


  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;