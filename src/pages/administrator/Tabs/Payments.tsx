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

interface Payment {
  id: number;
  instituteId: number;
  amountPaid: number;
  studentQuota: number;
  paidOn: string;
  validUntil: string;
}

const demoPayments: Payment[] = [
  {
    id: 1,
    instituteId: 101,
    amountPaid: 15000,
    studentQuota: 50,
    paidOn: '2023-06-10',
    validUntil: '2024-06-10',
  },
  {
    id: 2,
    instituteId: 102,
    amountPaid: 20000,
    studentQuota: 75,
    paidOn: '2024-01-15',
    validUntil: '2025-01-15',
  },
];

const Payments = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Payments Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40,background:"#2a4045" }}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Institute ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Amount Paid</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Student Quota</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Paid On</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Valid Until</strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoPayments.map((payment) => (
              <TableRow key={payment.id} sx={{ height: 36 }}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.instituteId}</TableCell>
                <TableCell>₹{payment.amountPaid}</TableCell>
                <TableCell>{payment.studentQuota}</TableCell>
                <TableCell>{payment.paidOn}</TableCell>
                <TableCell>{payment.validUntil}</TableCell>
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

export default Payments;
