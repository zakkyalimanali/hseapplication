import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/hseapp/safetycardphotos/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})