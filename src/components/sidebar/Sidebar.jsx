/* eslint-disable no-unused-vars */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Button from '@mui/material/Button'

const Sidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = ()=> { 
    localStorage.removeItem("token")
    navigate("/login")
  }
   
    
    const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
      <Button variant="contained" onClick={()=>handleLogout()}>Logout</Button>
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
          {/* <span className="logo">Admin</span> */}
        {/* </Link> */}
      </div>
      <hr />
      <div className="center">
        <ul>
         
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
         
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
      
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
