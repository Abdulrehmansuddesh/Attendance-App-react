import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { ToastAlert } from '../Alerts/toast'
import { Box, Button, Grid } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { InputFields } from '../../components'

const Setting = () => {
  const [fullName , SetfullName]= useState("")
  const [email , Setemail]= useState("")
  const [ course, Setcourse]= useState("")
  const [disable , setdisable]=useState(true)
  const [stdimg, Setstdimg]= useState("")
  const [stdData, setstdData]= useState("")

    useEffect(()=>{
        const UserFetchData = async()=>{
        try {
             const Uid = localStorage.getItem("uid")
            
                const UserData =  await getDoc(doc(db,"user",Uid))
                // console.log(UserData.data(),"UserData")
                setstdData(UserData.data())
                SetfullName(UserData.data().name)
                Setemail(UserData.data().email)
                Setcourse(UserData.data().course)
                Setstdimg(UserData.data().imageURl)
        } catch (error) {
            ToastAlert(error.code ,"error")
        }
        

        }
        UserFetchData()
    },[])
    const UpdateStd = async()=>{
      try {
        const Uid = localStorage.getItem("uid")
        await updateDoc(doc(db,"user",Uid),{
          name : fullName,
          course
        })
        ToastAlert("succesfully Updated","success")

      } catch (error) {
        ToastAlert(error.code || error.message ,"error")
      } 

    }
    // console.log(stdData)

  return (
    <>
    <Box display={'flex'} alignItems={"center"} gap={"10px"}  marginTop={"-20px"}>
      <h1>Profile</h1>
      <ModeEditIcon sx={{cursor:"pointer"}} onClick={()=>{setdisable(!disable)}}/>
    </Box>
    <Grid container columnSpacing={5} rowSpacing={5} mt={5}> 
    {/* // <img src="" alt="" /> */}
    <Grid item sm={12} npm  marginTop={"-60px"}  >
      <img src={stdimg} alt="" width={150} height={150}  />
    </Grid>

    <Grid item sm={6}>
    <InputFields disabled={disable}value ={fullName}label='Full Name' onChange={(e)=>SetfullName(e.target.value)}  />
    </Grid>

    <Grid item sm={6}>
    <InputFields disabled= {disable} value ={course}label='Course Name' onChange={(e)=>Setcourse(e.target.value)}/>
    </Grid>

    <Grid item sm={6}>
    <InputFields value ={email}label='Email'  disabled/>
    </Grid>

    

    <Grid item sm={12}>
    </Grid>
    <Grid item sm={12} >
    <Button onClick={UpdateStd}   disabled ={disable} sx={{width:"100%" , marginTop : "-100px"}} variant="contained">Update Changes</Button>
    </Grid>
  </Grid>
  </>
  )
}

export default Setting