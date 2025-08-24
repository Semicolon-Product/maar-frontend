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

interface Student {
  id: number;
  name: string;
  rollNo: string;
  mobileNo: string;
  teacherId: number;
  email: string;
  admissionYear: string;
  superadminId: number;
}

const demoStudents: Student[] = [
  {
    id: 1,
    name: 'Amit Singh',
    rollNo: 'AG001',
    mobileNo: '9876543210',
    teacherId: 101,
    email: 'amit.singh@example.com',
    admissionYear: '2022',
    superadminId: 1,
  },
  {
    id: 2,
    name: 'Sneha Roy',
    rollNo: 'AG002',
    mobileNo: '9123456789',
    teacherId: 102,
    email: 'sneha.roy@example.com',
    admissionYear: '2023',
    superadminId: 1,
  },
  {
    id: 3,
    name: 'Ravi Mehra',
    rollNo: 'AG003',
    mobileNo: '9988776655',
    teacherId: 103,
    email: 'ravi.mehra@example.com',
    admissionYear: '2021',
    superadminId: 2,
  },
];

const Students = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Students Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40,background:"#2a4045" }}>
              <TableCell sx={{color:"white"}}><strong>Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Roll No</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Mobile No</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Teacher ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Email</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Admission Year</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Superadmin</strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoStudents.map((student) => (
              <TableRow key={student.id} sx={{ height: 36 }}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.mobileNo}</TableCell>
                <TableCell>{student.teacherId}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.admissionYear}</TableCell>
                <TableCell>{student.superadminId}</TableCell>
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

export default Students;
