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

interface PaymentPlan {
  id: number;
  planName: string;
  totalStudents: number;
  amountPerStudent: number;
  totalAmount: number;
  createdAt: string;
}

const demoPlans: PaymentPlan[] = [
  {
    id: 1,
    planName: 'Basic Plan',
    totalStudents: 50,
    amountPerStudent: 300,
    totalAmount: 15000,
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    planName: 'Premium Plan',
    totalStudents: 100,
    amountPerStudent: 500,
    totalAmount: 50000,
    createdAt: '2024-06-10',
  },
];

const PaymentPlans = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment Plans Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40 ,background:"#2a4045"}}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Plan Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Total Students</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Amount Per Student</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Total Amount</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Created At</strong></TableCell>
              <TableCell align="center" sx={{color:"white"}}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoPlans.map((plan) => (
              <TableRow key={plan.id} sx={{ height: 36 }}>
                <TableCell>{plan.id}</TableCell>
                <TableCell>{plan.planName}</TableCell>
                <TableCell>{plan.totalStudents}</TableCell>
                <TableCell>₹{plan.amountPerStudent}</TableCell>
                <TableCell>₹{plan.totalAmount}</TableCell>
                <TableCell>{plan.createdAt}</TableCell>
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

export default PaymentPlans;
