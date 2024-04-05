import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ToastAlert } from '../../assets/Alerts/toast';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function StudentCard({data ,setrefresh , refresh}) {
  const  HandleCheckIn = async() =>{
    try {
      const checkIN = new Date().toDateString() + " " + new Date().toLocaleTimeString()
      const Uid = localStorage.getItem("uid") 
      await updateDoc(doc(db,"user",Uid),{
        CheckIn : checkIN
        
      })
      setrefresh(!refresh)
      ToastAlert("Student Check In","success")
  
    } catch (error) {
      ToastAlert(error.message || error.code,"error")
    }
    
  
  }
  const  HandleCheckOut = async() =>{
    try {
      const checkOut = new Date().toDateString() + " " + new Date().toLocaleTimeString()
      const Uid = localStorage.getItem("uid") 
      await updateDoc(doc(db,"user",Uid),{
        CheckOut : checkOut
        
        
      })
      await addDoc(collection(db,"attendance"),{
        UserId : data.id,
        fullName : data.name,
        CheckIn :data.CheckIn,
        CheckOut : checkOut,
        course : data.course
      })
      setrefresh(refresh)
      ToastAlert("Student Check Out","success")
    } catch (error) {
      ToastAlert(error.message || error.code,"error")
    }
    
  
  }
  return (
    <Box sx={{ minWidth: 275  }}>
        <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
        ID : {data.id}
      </Typography>
      <Typography variant="h5"  sx={{mb:"10px"}} component="div">
       Course : {data.course}
      </Typography>
      <Typography variant="h5" sx={{mb:"10px"}} component="div">
       CheckIn : {data.CheckIn}
      </Typography>
      <Typography variant="h5"  sx={{mb:"10px"}} component="div">
      CheckOut : {data.CheckOut}
      </Typography>
    </CardContent>
    <CardActions>
    {
     data.CheckIn? <Button variant="contained" onClick={HandleCheckOut} >Check Out </Button>:
     <Button variant="contained" onClick={HandleCheckIn} >Check In </Button>
    }
    </CardActions>
   
  </React.Fragment>
    </Box>
  );
}