'use client';

import React from 'react';
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

interface Department {
  id: number;
  name: string;
  institute: string;
  createdAt: string;
}

const demoDepartments: Department[] = [
  { id: 1, name: 'Agronomy', institute: 'Agro Institute', createdAt: '2025-07-12' },
  { id: 2, name: 'Soil Science', institute: 'GreenField Academy', createdAt: '2025-07-15' },
  { id: 3, name: 'Horticulture', institute: 'Harvest University', createdAt: '2025-07-18' },
];

const Departments = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Departments Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40, background: "#2a4045" }}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Institute</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Created At</strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoDepartments.map((dept) => (
              <TableRow key={dept.id} sx={{ height: 36 }}>
                <TableCell>{dept.id}</TableCell>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{dept.institute}</TableCell>
                <TableCell>{dept.createdAt}</TableCell>
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

export default Departments;
