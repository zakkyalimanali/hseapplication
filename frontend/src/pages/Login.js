// import NumIncidents from "./charts/NumIncidents"

// export default function Login() {
//     return(
//         <div>
//             <h1>Login Page</h1>
//             <div className="display-border col-4">
//             <NumIncidents/>
//             </div>
//         </div>
//     )
// }
import LoginAPI from '../API/LoginAPI';
import React, { useState } from 'react';
import { login } from "../API/LoginAPI";

function Login() {
  const [smartCardNo, setSmartCardNo] = useState('');
  const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     try {
//       const response = await LoginAPI.login(smartCardNo, password);
//       // Handle successful login
//     } catch (error) {
//       // Handle login error
//     }
//   }
const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await login(smartCardNo, password);
      console.log(response); // handle successful login
    } catch (error) {
      console.error(error); // handle login error
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Smart Card Number:</label>
        <input type="text" value={smartCardNo} onChange={(event) => setSmartCardNo(event.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;