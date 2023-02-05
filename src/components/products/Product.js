/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */


import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./product.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';  
import jwt_decode from "jwt-decode";
import{useNavigate} from "react-router-dom"


const Product = () => {
  const navigate=useNavigate();
  let formValues={
    _id:"",
    name:"",
    Category:"",
    price:"",
    quantity:""
    };
    const[formData, setFormData]=useState(formValues);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function getData(){
      const decodedToken =jwt_decode(localStorage.getItem("token"));
     
      if (decodedToken.exp*1000<Date.now()) {
        navigate("/")
      } else { 
        const res =await axios.get("https://caption-back-end.onrender.com/products/get",{
          headers:{
            accesstoken:localStorage.getItem("token"),
          },
        });
        setUserData(res.data)
       }  
    }
  getData();  
  },[]);

  const onPopulateData = (_id) => {
    const selectedData = userData.filter((row) => row._id === _id)[0];
   
    setFormData({
      ...formData,
      ...selectedData,
    });
  };
  const handleDelete = async (_id) => {
    await axios.delete(`https://caption-back-end.onrender.com/products/delete/${_id}`,{
         headers:{
          accesstoken:localStorage.getItem("token")
        }
      }
      );
      navigate("/nav")
navigate("/products")
    // const user = userData.filter((row) => row._id !== response.data._id);
    // setUserData(user);
  };








const handleSubmit = async(e) =>{
     e.preventDefault();
     
     const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key != "error" && key != "id") {
        return key;
      }
    });


const decodedToken =jwt_decode(localStorage.getItem("token"));
// console.log(decodedToken);
if (decodedToken.exp*1000<Date.now()) {
  navigate("/")}
if (formData._id) {
      // Update
      const response = await axios.put(
        `https://caption-back-end.onrender.com/products/update/${formData._id}`,
        {  
          products:{ name: formData.name,
            Category: formData.Category,
            price:  formData.price,
            quantity :  formData.quantity,}
        },{
          headers:{
            accesstoken:localStorage.getItem("token")
          }
        }
      );
      navigate("/nav")
      navigate("/products")
      // let users = [...userData];
      // let index = users.findIndex((row) => row._id === response.data._id);
      // users[index] = response.data;
      // setUserData(users);
     } else {
      const decodedToken =jwt_decode(localStorage.getItem("token"));
      // console.log(decodedToken);
      if (decodedToken.exp*1000<Date.now()) {
        navigate("/")
      }else {
        // eslint-disable-next-line no-unused-vars
  const response = await axios.post("https://caption-back-end.onrender.com/products/create",{
    products:{ name: formData.name,
      Category: formData.Category,
      price:  formData.price,
      quantity :  formData.quantity,}
  },{
    headers:{
      accesstoken:localStorage.getItem("token")
    }
  }

  );
  

  setUserData([...userData,response.data])
        
      }
     }
     setFormData({
      id:"",
name:"",
Category:"",
price:"",
quantity:"" 
     })
  };



  return (
    <div>

    <h1> Products</h1>
      <Box
        component="form"
      
      autoComplete="off"
      onSubmit={handleSubmit}
    
    >
 
      <TextField  sx={{'& > :not(style)': { m: 0, width: '20ch' },}}
      id="name" label="name" variant="outlined"   
      // name="name"
        value={formData.name}
        onChange={(e)=>setFormData({...formData, name:e.target.value})}
        required
      />
      <TextField  sx={{
        '& > :not(style)': { m: 0, width: '20ch' },
      }}
      id="category" label="Category" variant="filled" 
      // name="category"
      value={formData.Category}
      onChange={(e)=>setFormData({...formData, Category:e.target.value})} 
      required   
      />
      <TextField  sx={{
        '& > :not(style)': { m: 0, width: '20ch' },
      }}
       id="price" label="price" variant="outlined" 
       type="number"
      //  name="price"
      value={formData.price}
      required
      onChange={(e)=>setFormData({...formData, price:e.target.value})}
      />
      <TextField  sx={{
        '& > :not(style)': { m: 0, width: '20ch' },
      }}
       id="quantity" label="Quantity" variant="filled" 
       type="number"
      //  name="quantity"
      value={formData.quantity}
      required
      onChange={(e)=>setFormData({...formData, quantity:e.target.value})}
      />
      
      <Button  sx={{m: 1, top:-5, width: '18ch' , height:50, 
      }}
     variant="contained"  type="submit"  >
        ADD PRODUCTS
      </Button>
   </Box>
   <div className="listContainer">
    <TableContainer component={Paper}>
      <Table sx={{m:0, minWidth:50 ,height:50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">CATEGORY</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">QUANTITY</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => (
            <TableRow 
              key={row._id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.Category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell> 
              <TableCell  align="right">
              
              <Button sx={{m:0.5}}  variant="outlined" onClick={() => handleDelete(row._id)} startIcon={<DeleteIcon />}>Delete</Button><br/>
              <Button sx={{m:0.5}} variant="outlined"  onClick={() => onPopulateData(row._id)}  startIcon={<UpdateIcon/>}>Update</Button>
              
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
     
   

    </div>
  )
}

export default Product
