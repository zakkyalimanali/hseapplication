import React, { useState, useContext } from 'react';
import axios from 'axios'
import AuthContext from "../../context/AuthContext";

function Hsemanagement() {
  const [state, setState] = useState({
    title: '',
    content: '',
    image: null
  });
  const {authTokens} = useContext(AuthContext);
  

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setState({
      ...state,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    let form_data = new FormData();
    form_data.append('image', state.image, state.image.name);
    form_data.append('title', state.title);
    form_data.append('content', state.content);
    let url = 'http://127.0.0.1:8000/hseapp/hsemanagement/';
    // let token = authTokens ? authTokens.accessToken : '';
    let token = authTokens.access
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };

  console.log(authTokens)

  return (
    <div className="App">
      {/* <p>{authTokens}</p> */}
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={state.title}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Content"
            id="content"
            value={state.content}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/jpg,"
            onChange={handleImageChange}
            required
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Hsemanagement
