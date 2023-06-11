import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import AuthContext from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
import HSEManagementAPI from '../../API/HSEManagementAPI';

function HsemanagementOLD() {
  const [hsemanagements , setHSEManagements] = useState([])
  const [state, setState] = useState({
    title: '',
    content: '',
    image: null
  });
  const {authTokens} = useContext(AuthContext);

  useEffect(() => {
    fetchHSEManagement()
  },[])

  const fetchHSEManagement = () => {
    HSEManagementAPI.get('/')
    .then((res) => {
      setHSEManagements(res.data)
    })
    .catch(console.log)
  }
  


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
      },
      responseType: 'blob'
    })
      .then(res => {
        const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'image.jpg'); // Specify the desired file name
        document.body.appendChild(link);
        link.click();
        link.remove();
        // console.log(res.data);
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

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {hsemanagements.map((hsemanagement) => {
            return(
              <tr key={hsemanagement.id}>
                <td>{hsemanagement.id}</td>
                <td>{hsemanagement.title}</td>
                <td>{hsemanagement.content}</td>
                {/* <td>{hsemanagement.image}</td> */}
                <td>
                {/* <a href={`${hsemanagement.image}`} download>
                    Download
                  </a> */}
                {/* <a href={`${hsemanagement.image}`}>
                    Download
                  </a> */}
                {/* <a href={`${hsemanagement.image}`} download>
                    Download
                  </a> */}
                  {/* <a href={`${hsemanagement.image}`} download>Download</a> */}
                  {/* <a href={hsemanagement.image} download>Download</a> */}
                  <a href={hsemanagement.image}>Image</a>
                </td>
              </tr>
            )
          })}



        </tbody>

      </Table>

    </div>
  )
}

export default HsemanagementOLD
