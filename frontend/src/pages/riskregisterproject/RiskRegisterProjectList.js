import React, {useState, useEffect} from 'react'
import RiskRegisterProjectAPI from '../../API/RiskRegisterProjectAPI'

function RiskRegisterProjectList() {
  const [riskregisterprojects , setRiskRegisterProjects] = useState([])
  const [staffs , setStaffs] = useState([])
  const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchStaff()
        fetchRiskRegisterProject()
    },[])

    const fetchRiskRegisterProject = () => {
        RiskRegisterProjectAPI.get('/')
        .then((res) => {
            setRiskRegisterProjects(res.data)
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
        RiskRegisterProjectAPI.delete(`/${id}/`).then((res) => {
            fetchRiskRegisterProject();
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
      name: 'News Date',
      selector: (row) => row.news_date,
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
const data = worknews.map((worknew) => {
const person_name = staffs.find((staff) => staff.id === worknew.person_name)?.name  
return {
  id: worknew.id,
  person_name : person_name,
  headline : worknew.headline,
  textbrief : worknew.textbrief,
  news_date : worknew.news_date,
  more_info : <Link to={`/newsedit/${worknew.id}`}><FontAwesomeIcon icon={faPen } /></Link> ,
  // more_info : "More Info",
  delete: (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onDelete(worknew.id)}
    />
  ),
  // delete: "Delete",

}
})
setRecords(data);
}, [worknews])

  return (
    <div className="row justify-content-center"> 
    <h1 className="row justify-content-center mt-5">News List</h1>
      
      <div className="mt-4 col-md-10 m row justify-content-center">
      <div className="row justify-content-around">
      <Button href="/newsadd" variant="secondary" className="mb-4 col-md-2">
                      Add News
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

export default RiskRegisterProjectList