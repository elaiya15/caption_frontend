
import React,{ useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

// eslint-disable-next-line no-unused-vars
import{useNavigate} from "react-router-dom"


const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  
  const[fromData,setFormData]= useState({
    email:"",
    password:"",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    const response = await axios.post("https://caption-back-end.onrender.com/register/signin",{
      ...fromData,
    });
    console.log(response);
    if(response.data){
      localStorage.setItem("token",response.data);
     navigate("/products");
    }

    
  };


 return (
  
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={fromData.email}
              onChange={(e)=>
              setFormData({...fromData,email:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
               value={fromData.password}
              onChange={(e)=>
              setFormData({...fromData,password:e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password-reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" to="/">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )};
