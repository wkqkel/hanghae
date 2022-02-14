import axios from "axios"

const instance = axios.create({ baseURL: "http://13.125.190.53" })

instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("token")
//  timeout: 180000
//  withCredentials: false
//  headers: {
//    "Content-Type": "application/json"
//    Authorization: `Bearer ${localStorage.getItem("token")}`
//  }
export default instance
