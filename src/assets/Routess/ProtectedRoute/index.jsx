import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import StudentLayout from '../../../components/StudentLayout';


const AdminProtectedRoute = () => {
  return localStorage.getItem("uid") ?
    JSON.parse(localStorage.getItem("user")).type=="admin" ?
     <Outlet/> 
     : <Navigate to={"/information"}/> 
    : <Navigate to={"/"}/>
  
}


const StdProtectedRoute = () => {
  return localStorage.getItem("uid") ?
    JSON.parse(localStorage.getItem("user")).type=="std" ?
    <StudentLayout>
         <Outlet/> 
    </StudentLayout>
     :< Navigate to={"/dashboard"}/> 
    : <Navigate to={"/"}/>
  
}
export default AdminProtectedRoute;
export{
  StdProtectedRoute
}