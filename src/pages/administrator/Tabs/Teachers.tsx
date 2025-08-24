'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Teacher {
  id: number;
  name: string;
  email: string;
  mobileNo: string;
  department: string;
  institude:string,
  departmentId: number;
  superadminId: number;
}

const demoTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    mobileNo: '9876543210',
    department: 'Agronomy',
    institude:'xyz',
    departmentId: 101,
    superadminId: 1,
  },
  {
    id: 2,
    name: 'Prof. Neha Sharma',
    email: 'neha.sharma@example.com',
    mobileNo: '9123456789',
    department: 'Soil Science',
    institude:'xyrjrz',
    departmentId: 102,
    superadminId: 1,
  },
  {
    id: 3,
    name: 'Dr. Suresh Mehta',
    email: 'suresh.mehta@example.com',
    mobileNo: '9988776655',
    department: 'Horticulture',
    institude:'xyddz',
    departmentId: 103,
    superadminId: 2,
  },
];

const Teachers = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Teachers Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40,background:"#2a4045"}}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Email</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Mobile No</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Department</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Institude </strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Department ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Superadmin </strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoTeachers.map((teacher) => (
              <TableRow key={teacher.id} sx={{ height: 36 }}>
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.mobileNo}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.institude}</TableCell>
                <TableCell>{teacher.departmentId}</TableCell>
                <TableCell>{teacher.superadminId}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Teachers;
