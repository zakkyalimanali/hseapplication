import axios from "axios";
import API_BASE from "../utils/apiBase";

export default axios.create({
    baseURL: `${API_BASE}/hseapp/safeworkpractice/`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})
