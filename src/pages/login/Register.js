import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"
import{useNavigate} from "react-router-dom"
const Register = () => {
    const navigate = useNavigate();
    const [passShow, setPassShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role:"admin"
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-unused-vars
        const { name, email, password, confirmPassword, role } = inpval;

        if (name === "") {
            toast.warning("name is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (confirmPassword === "") {
            toast.error("confirmPasswordis required!", {
                position: "top-center"
            });
        }
        else if (confirmPassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        // eslint-disable-next-line eqeqeq
        } else if (password !== confirmPassword) {
            toast.error("pass and confirmPassword are not matching!", {
                position: "top-center"
            });
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("https://caption-back-end.onrender.com/register/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password,confirmPassword,role
                })
            });

            // eslint-disable-next-line no-unused-vars
            const res = await data.json();
            toast.success("Registration Successfully done 😃!", {
                position: "top-center"
            });
            // eslint-disable-next-line eqeqeq
                setInpval({ ...inpval, name: "", email: "", password: "", confirmPassword: "" });
                navigate("/login");
            }
        }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!confirmPasswordShow ? "password" : "text"} value={inpval.confirmPassword} onChange={setVal} name="confirmPassword" id="confirmPassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}>
                                    {!confirmPasswordShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register