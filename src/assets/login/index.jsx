import React, { useState } from "react";
import style from "./style.module.css";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { ToastAlert } from "../Alerts/toast";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const loginHandler = (event) => {
    event.preventDefault();
    console.log("hhhhha");
    if (!email || !password) {
    //   console.log("required fields are missing");
      ToastAlert("required Fields are missing","warning")
      
      return;
    }
    console.log(email, password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in 
        const userId = userCredential.user.uid;
        const userData = await getDoc(doc(db, "user", userId))
        localStorage.setItem("uid",userId)
        localStorage.setItem("user",JSON.stringify(userData.data()))
        // console.log(userData)
        ToastAlert("succsesfully login","success")
        // console.log(userData.data().type)

        if(userData.type == "admin"){
          navigate("/dashboard")
        }else{
          navigate("/information")
        }
        // navigate("/dashboard")

        // console.log(user,"usser login")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAlert(errorCode ||errorMessage,"error")
       

        // console.log(errorCode,"eroor login")


      });
  };


  return (
    <>
      <div className={style.pageWraper}>
        <div className={style.loginWrwap}>
          <h1 >LOGIN</h1>
          {/* <Divider sx={{ mt: "10px" }} /> */}

          <Box
            component={"form"}
            onSubmit={loginHandler}
            className={style.inputValues}
          >
            <TextField
              sx={{ width: "90%" , input : {
                color : "white"
              }
            }}
              id=""
              label="Gmail"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />

            <TextField
              sx={{ width: "90%" , input:{
                color:"white"
              } }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value) }
            />
            <Typography
              textAlign={"right"}
              mt={2}
              color={"white"}
              
              sx={{ cursor: "pointer", marginRight: "50px" }}
            >
              Create Account
            </Typography>

            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
