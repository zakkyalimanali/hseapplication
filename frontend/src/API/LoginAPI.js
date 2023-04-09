// import axios from "axios";

// export default axios.create({
//     baseURL: "http://127.0.0.1:8000/hseapp/login/",
//     headers: {
//         'Accept':'application/json',
//         'Content-Type':'application/json',
//     }
// })

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/hseapp/login/", // change to your Django Rest Framework API endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (smartCardNo, password) => {
  try {
    const response = await axios.post(
      "/token-auth/",
      { smart_card_no: smartCardNo, password: password },
      { headers: { "Content-Type": "application/json" } }
    );

    // store the token in local storage for subsequent requests
    localStorage.setItem("token", response.data.token);

    // return the response data
    return response.data;
  } catch (error) {
    throw error;
  }
};