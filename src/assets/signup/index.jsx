import React, { useState } from 'react'
import style from "./style.module.css";
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastAlert } from '../Alerts/toast';
import { doc, setDoc } from 'firebase/firestore';


const Signup = () => {
  const navigate = useNavigate()
 
  const signupHandler  = (event) =>{
    event.preventDefault()
    // console.log("hhhhha")
    if(!email ||!password){
      // console.log("required fields are missing")
      ToastAlert("required Fields are missing","warning")
      return
    }
    console.log(email,password)
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      // ToastAlert("user Signup", "success");
      const userData =await setDoc(doc(db, "user", user.uid), {
        name: "Super Admin",
        email,
        password,
        type : "admin",
       
      });

      
      //  navigate("/")
      //  ToastAlert("succsesfully signup","success")

      console.log(userData)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("error",errorCode)
      ToastAlert(errorCode, "error");
  
      // ..
    });
   
  }

  const [email , seteEmail]= useState("")
  const [password , setPassword]= useState("")


  return (
    <>
      <div className={style.pageWraper}>
        <div className={style.loginWrwap}>
          <h1>Signup</h1>
          {/* <Divider sx={{ mt: "10px" }} /> */}


          <Box component={"form"}  onSubmit={signupHandler} className={style.inputValues}  >
          <TextField sx={{ width:"90%"}} 
           id="" 
           label="Gmail" 
           variant="outlined" 
           onChange={(e)=>seteEmail(e.target.value)}
           />
          <br />
          <br />

          <TextField
          sx={{ width:"90%" }} 
          
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
            <Typography
                textAlign={"right"}
                mt={2}
                color={"white"}
                sx={{ cursor: "pointer" , marginRight : "50px"}
            }
              >
                Already have Account?
              </Typography>
            
          

          <Button type='submit'  variant="contained">Signup</Button>
          </Box>

      
        </div>
      </div>
    </>
  );
}

export default Signup
