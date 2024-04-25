import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button } from 'reactstrap';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import { delUserAPI, getUserAPI } from '../../api';
const UsersList = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: <h6>Id</h6>,
      selector: (row) => row.id,
    },
    {
      name: <h6>Name</h6>,
      selector: (row) => row.fname,
    },
    {
      name: <h6>Gender</h6>,
      selector: (row) => row.gender,
    },
    {
      name: <h6>DOB</h6>,
      selector: (row) => row.dob,
    },
    {
      name: <h6>Mobile</h6>,
      selector: (row) => row.mobile,
    },
    {
      name: <h6>Email</h6>,
      selector: (row) => row.email,
    },
    {
      name: <h6>User Name</h6>,
      selector: (row) => row.user_name,
    },
    {
      name: <h6>Password</h6>,
      selector: (row) => row.password,
    },
    {
      name: <h6>Hobbies</h6>,
      selector: (row) => row.hobbies,
    },
    {
      name: <h6>State</h6>,
      selector: (row) => row.state,
    },
    {
      name: <h6>District</h6>,
      selector: (row) => row.district,
    },
    {
      name: <h6>City</h6>,
      selector: (row) => row.city,
    },
    {
      name: <h6>Profile Picture</h6>,
      cell: (row) => (
        <img src={`http://localhost:9000/task/img/1714046553661-appointment.png`} height='30px' width="40px" alt='path not found' />
      ),

    },
    {
      name: <h6>Document</h6>,
      cell: (row) => (
        <img src={`http://localhost:9000/task/img/1714046553661-appointment.png`} height='30px' width="40px" alt='path not found' />
      ),
    },
    {
      name: <h4>Status</h4>,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
          {row.status === true ? "Active" : "InActive"}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: <h6>Action</h6>,
      cell: (row) => (
        <>
          <Button outline color={`warning`} className={`me-2`} onClick={() => handleEdit(row)} >
            <FaRegEdit />
          </Button>
          <Button outline color={`danger`} onClick={() => handleDel(row)} >
            <FaTrash />
          </Button>
        </>
      ),

    },
  ];

  const handleDel = (data) => {
    console.log(data.id, "del--")
    delUserAPI(data.id)
      .then((res) => {
        if (res.data.status === "Success") {
          getUsertList();
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (e) => {
    console.log(e, "edit")

  }
  useEffect(() => {
    getUsertList();
  }, [])

  const getUsertList = () => {
    getUserAPI()
      .then((res) => {
        if (res.data.status === "Success") {
          console.log(res.data)
          setData(res.data.data);
        } else {
          console.log("errr");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={`row`}>

        <DataTable
          data={data}
          columns={columns}
          pagination
          subHeader={false}
          persistTableHead
          onColumnOrderChange
          striped={true}
          responsive={true}

        />

      </div>

    </>
  )
}

export default UsersList;