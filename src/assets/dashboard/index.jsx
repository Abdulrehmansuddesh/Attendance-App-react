import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout';
import { InputFields } from '../../components';
import { Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastAlert } from '../Alerts/toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { uploadFile } from '../Alerts/Upload';
import { doc, setDoc } from 'firebase/firestore';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});




const Dashboard =  () => {
  const [fullName , SetfullName]= useState("")
  const [email , Setemail]= useState("")
  const [ course, Setcourse]= useState("")
  const [password, Setpassword]= useState("")
  const [stdimg, Setstdimg]= useState("")
  // console.log(stdimg)

  const Addstd = async() =>{
    try{
    if(!fullName || !email || !course || !password || !stdimg){
      ToastAlert("required Fields are missing","warning")
      return
    }
    const StdData =  await createUserWithEmailAndPassword(auth, email, password)
    const Uid = StdData.user.uid


    const imageURl = await uploadFile(stdimg)
      const obj ={
        email,
        name : fullName,
        course,
        type : "std",
        imageURl,
        isActive : true
      }

      await setDoc(doc(db, "user", Uid), obj);
      ToastAlert("Succsesfully Student Add","success")

      }catch(error){
      ToastAlert(error.code,"error")
      }
  }
  return (
    <>
    

      <AdminLayout>
      <h1>Add Students</h1>
      <Divider/>
      <Grid container columnSpacing={5} rowSpacing={4} mt={5}> 

        <Grid item sm={6}>
        <InputFields label='Full Name' onChange={(e)=>SetfullName(e.target.value)} />
        </Grid>

        <Grid item sm={6}>
        <InputFields label='Course Name' onChange={(e)=>Setcourse(e.target.value)}/>
        </Grid>

        <Grid item sm={6}>
        <InputFields label='Email' onChange={(e)=>Setemail(e.target.value)}/>
        </Grid>

        <Grid item sm={6}>
        <InputFields label='Password' type= "password" onChange={(e)=>Setpassword(e.target.value)}/>
        </Grid>

        <Grid item sm={12}>
        <Button
            component="label"
              role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />} >
            Upload file
            <VisuallyHiddenInput type="file" onChange={(e) =>
                Setstdimg(e.target.files[0])} />
          </Button>
        </Grid>
        <Grid item sm={12} >
        <Button onClick={Addstd} sx={{width:"100%"}} variant="contained">Add Students</Button>
        </Grid>
      </Grid>
      </AdminLayout>

    </>
  )
}

export default Dashboard