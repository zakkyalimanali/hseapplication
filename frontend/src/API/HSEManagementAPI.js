import axios from "axios";
import API_BASE from "../utils/apiBase";

export default axios.create({
    baseURL: `${API_BASE}/hseapp/hsemanagement/`,
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})