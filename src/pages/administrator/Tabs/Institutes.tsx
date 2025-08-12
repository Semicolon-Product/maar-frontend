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

interface Institute {
  id: number;
  name: string;
  superAdmin: string;
  code: string;
  createdAt: string;
}

const demoInstitutes: Institute[] = [
  { id: 1, name: 'Agro Institute', superAdmin: 'Ravi Kumar', code: 'AG101', createdAt: '2025-07-20' },
  { id: 2, name: 'GreenField Academy', superAdmin: 'Neha Singh', code: 'GF202', createdAt: '2025-07-18' },
  { id: 3, name: 'Harvest University', superAdmin: 'Amit Das', code: 'HU303', createdAt: '2025-07-15' },
];

const Institutes = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Institutes Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40, background: "#2a4045" }}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Instituted Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>SuperAdmin</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Institute Code</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Created At</strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoInstitutes.map((institute) => (
              <TableRow key={institute.id} sx={{ height: 36 }}>
                <TableCell>{institute.id}</TableCell>
                <TableCell>{institute.name}</TableCell>
                <TableCell>{institute.superAdmin}</TableCell>
                <TableCell>{institute.code}</TableCell>
                <TableCell>{institute.createdAt}</TableCell>
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

export default Institutes;
