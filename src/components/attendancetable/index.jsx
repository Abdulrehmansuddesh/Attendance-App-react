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

export default function AttendanceTable({attendanceData}) {
 

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Course</TableCell>
            <TableCell align="right">Check In</TableCell>
            <TableCell align="right">Check Out</TableCell>
            {/* <TableCell align="right">Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((std) => (
            <TableRow key={std.fullName}>
              <TableCell component="th" scope="row">
                {std.fullName}
              </TableCell>
              <TableCell align="right">{std.course}</TableCell>
              {/* <TableCell align="right">{row.email}</TableCell> */}
              <TableCell align="right">{std.CheckIn}</TableCell>
              <TableCell align="right">{std.CheckOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}