import axios from "axios"

const instance = axios.create({ baseURL: "http://13.125.190.53" })

instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("token")

export default instance
