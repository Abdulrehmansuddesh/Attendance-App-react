
import './App.css'
// import Signup from './assets/signup/index.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './assets/login/index.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AuthRoute from './assets/Routess/AuthRoute/AuthRoute.jsx'
import Dashboard from './assets/dashboard/index.jsx'
import AdminProtectedRoute, { StdProtectedRoute } from './assets/Routess/ProtectedRoute/index.jsx'

import StdList from './assets/StdList/index.jsx'
import Setting from './assets/Setting/index.jsx'
import { StdInformation } from './assets/information/index.jsx'
import Attendance from './assets/AttendanceList/index.jsx'
// import Portal from './assets/Portal/index.jsx'



function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoute/>}>
        <Route index element={<Login/>}/>
        {/* <Route path="/signup" element={<Signup/>}/>/ */}
        </Route>

       <Route element={<AdminProtectedRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/stdlist" element={<StdList/>}/>
        <Route path="/addentance" element={<Attendance/>}/>

       </Route>

       <Route element={<StdProtectedRoute/>}>
        {/* <Route path='/portal' element={<Portal/>}/> */}
        <Route path='/information' element={<StdInformation/>}/>
        <Route path='/setting' element={<Setting/>}/>
    

       </Route>

       </Routes>

       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
