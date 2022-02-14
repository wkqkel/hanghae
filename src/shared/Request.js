import axios from "axios"

const instance = axios.create({ baseURL: "http://13.125.190.53" })

// instance.defaults.headers.common["Authorization"] = USER_TOKEN;

export default instance
