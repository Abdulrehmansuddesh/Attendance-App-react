import React, { useEffect, useState } from 'react'
import StudentCard from '../../components/StdCard'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
// import { ToastAlert } from '../Alerts/toast'

export const StdInformation = () => {
const [data ,setdata ] =useState("")
const [refresh , setrefresh]=useState(true)

useEffect(()=>{
  const getFetch = async()=>{
   const Uid = localStorage.getItem("uid")
   const userData = await getDoc(doc(db,"user",Uid))
   setdata( {id : userData.id , ...userData.data()})
   console.log(data)
  }
  getFetch()
},[refresh])
  return (
    <>
    <h1 font= "bold"> Attendance</h1>
    <StudentCard data={data} refresh={setrefresh} setrefresh={setrefresh} />
    
    </>
  )
}
