import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

export default function MuiStdTable() {
  const [stdlist ,setstdlist]=React.useState([])
  useEffect(()=>{
    const fetch =  async()=>{
      const docSnap = await getDocs(collection(db, "user"));
      const EmptyArry =[]
      docSnap.forEach((user) => {
  // doc.data() is never undefined for query doc snapshots
      console.log(user.id, " => ", user.data());
      if(user.data().type == "std"){
        EmptyArry.push({...user.data(), id : user.id})
      }
});
setstdlist(EmptyArry)
// console.log(setstdlist)
    }
    fetch()
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Course</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Status</TableCell>
            {/* <TableCell align="right">Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {stdlist.map((std) => (
            <TableRow key={std.name}>
              <TableCell component="th" scope="row">
                {std.name}
              </TableCell>
              <TableCell align="right">{std.course}</TableCell>
              {/* <TableCell align="right">{row.email}</TableCell> */}
              <TableCell align="right">{std.email}</TableCell>
              <TableCell align="right">{std.isActive ? "Active" : "In Active"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}