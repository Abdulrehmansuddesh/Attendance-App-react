import React, { useEffect, useState } from 'react'
// import StudentLayout from '../../components/StudentLayout'
import { AdminLayout } from '../../components'
import AttendanceTable from '../../components/attendancetable'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import LogoutIcon from '@mui/icons-material/Logout';


const Attendance = () => {

  
    const [attendanceData ,setattendanceData]=useState([])
    useEffect(()=>{
      const fetch =  async()=>{
        const docSnap = await getDocs(collection(db, "attendance"));
        const EmptyArry =[]
        docSnap.forEach((user) => {
    
        console.log(user.id, " => ", user.data());
       
          EmptyArry.push({...user.data(), id : user.id})
        
  });
  setattendanceData(EmptyArry)
  // console.log(setattendanceData)
      }
      fetch()
    },[])
  return (
    <>
    <AdminLayout>
    <h1>Attendance  </h1>
    <AttendanceTable attendanceData={attendanceData}/>
    </AdminLayout>
  
    </>
  )
}

export default Attendance