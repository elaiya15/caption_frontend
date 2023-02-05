/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import "./table.scss";
import React,{useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import{useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode";



 const Tables= () => {
  const navigate=useNavigate();

  const [userStateData, setUserStateData] = useState([]);
  useEffect(() => {

    async function getData(){
      const decodedToken =jwt_decode(localStorage.getItem("token"));
      console.log(decodedToken);
      if (decodedToken.exp*1000<Date.now()) {
        navigate("/")
      } else { 
        const res =await axios.get("https://caption-back-end.onrender.com/products/get",{
          headers:{
            accesstoken:localStorage.getItem("token"),
          },
        });
        console.log(res.data) 
        setUserStateData(res.data)
       }  
    }
  getData();  
  },[]);
return (
    <>
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">CATEGORY</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">QUANTITY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userStateData.map((row) => (
            <TableRow
              key={row._id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.Category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  )
}

export default Tables

