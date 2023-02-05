
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/PasswordReset";
import Register from "./pages/login/Register";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// eslint-disable-next-line no-unused-vars
import Table from './components/table/Table.jsx'


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>

            <Route  path="/nav" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register/>} />
            <Route path="/password-reset" element={<ForgotPassword/>} />
            <Route path="/table" element={<Table />} />
            <Route path="/products" element={<List/>} />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
