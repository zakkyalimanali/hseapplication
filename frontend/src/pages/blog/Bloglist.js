import {useEffect , useState} from 'react'
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import BlogAPI from '../../API/BlogAPI';
import StaffAPI from '../../API/StaffAPI';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons'
// import {   } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

function Bloglist() {
    const [blogs , setBlogs] = useState([])
    const [staffs , setStaffs] = useState([])
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchStaff()
        fetchBlog()
    },[])

    const fetchBlog = () => {
        BlogAPI.get('/')
        .then((res) => {
            setBlogs(res.data)
        })
        .catch(console.log)
    }

    const fetchStaff = () => {
        StaffAPI.get('/')
        .then((res) => {
            setStaffs(res.data)
        })
        .catch(console.log)
    }

    const onDelete = (id) => {
        BlogAPI.delete(`/${id}/`).then((res) => {
            fetchBlog();
        }).catch(console.log)
    }

    const customStyles = {
        headCells : {
          style: {
            border: '1px solid black',
      
          },
            },
        cells : {
          style: {
            border: '1px solid black'
          },
        },
      }

      const columns = [
        {
          name: 'Id',
          selector: (row) => row.id,
          sortable: true,
          // width: '6rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Person Name',
          selector: (row) => row.person_name,
          sortable: true,
          // width: '8rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Headline',
          selector: (row) => row.headline,
          sortable: true,
          // width: '8rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Brief',
          selector: (row) => row.textbrief,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Blog Date',
          selector: (row) => row.blog_date,
          sortable: true,
          // width: '12rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'More Info',
          selector: (row) => row.more_info,
          // width: '6rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
        {
          name: 'Delete',
          selector: (row) => row.delete,
          // width: '6rem'
          // style: {
          //   background: 'rgba(251,212,124, 0.5)',
          // },
        },
      ];



useEffect(() => {
  const data = blogs.map((blog) => {
    const person_name = staffs.find((staff) => staff.id === blog.person_name)?.name  
    return {
      id: blog.id,
      person_name :person_name,
      headline : blog.headline,
      textbrief : blog.textbrief,
      blog_date : blog.blog_date,
      more_info : <Link to={`/blogedit/${blog.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
    //   more_info : "More Info",
      delete: (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onDelete(blog.id)}
        />
      ),
    //   delete: "Delete",

    }
  })
  setRecords(data);
}, [blogs])


  return (
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-5">Blogs List</h1>
      
      <div className="mt-4 col-md-10 m row justify-content-center">
      <div className="row justify-content-around">
      <Button href="/blogadd" variant="secondary" className="mb-4 col-md-2">
                      Add Blog
      </Button>

        {/* <Button href="/permittoworkadd" variant="secondary" className="col-md-2 mb-4">Add Permit to Work</Button> */}
        {/* <div className="col-md-2 mb-4"><input className="text-center" type="text" placeholder="Search..." onChange={handleFilter}/></div> */}
      </div>

       
  
            <div>
            <div className="table-container mb-5">
              <DataTable 
                customStyles={customStyles}
                //  style={{backgroundColor: 'rgba(235,114,106, 0.5)'}}
                //  className='stripe'
                columns={columns}
                data={records}
                selectableRows
                fixedHeader
                pagination
              >
              </DataTable>
            </div>
            </div>

       
          </div>
        </div>
  )
}

export default Bloglist
