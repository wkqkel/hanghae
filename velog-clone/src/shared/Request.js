import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.125.157.182:3000", // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`;
// }
export default instance;
