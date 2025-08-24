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
  Link,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface StudentActivity {
  id: number;
  studentId: number;
  academicYear: string;
  activitySerialNo: string;
  activityName: string;
  date: string;
  documentUrl: string;
  uploadedAt: string;
}

const demoActivities: StudentActivity[] = [
  {
    id: 1,
    studentId: 101,
    academicYear: '2022-2023',
    activitySerialNo: 'ACT001',
    activityName: 'Debate Competition',
    date: '2023-02-15',
    documentUrl: 'https://example.com/doc1.pdf',
    uploadedAt: '2023-02-16',
  },
  {
    id: 2,
    studentId: 102,
    academicYear: '2023-2024',
    activitySerialNo: 'ACT002',
    activityName: 'Hackathon',
    date: '2024-01-10',
    documentUrl: 'https://example.com/doc2.pdf',
    uploadedAt: '2024-01-11',
  },
];

const StudentActivities = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Student Activities Details</h2>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 40,background:"#2a4045" }}>
              <TableCell sx={{color:"white"}}><strong>ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Student ID</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Academic Year</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Activity Serial No</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Activity Name</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Date</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Document URL</strong></TableCell>
              <TableCell sx={{color:"white"}}><strong>Uploaded At</strong></TableCell>
              <TableCell sx={{color:"white"}} align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoActivities.map((activity) => (
              <TableRow key={activity.id} sx={{ height: 36 }}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.studentId}</TableCell>
                <TableCell>{activity.academicYear}</TableCell>
                <TableCell>{activity.activitySerialNo}</TableCell>
                <TableCell>{activity.activityName}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  <Link href={activity.documentUrl} target="_blank" rel="noopener">
                    View
                  </Link>
                </TableCell>
                <TableCell>{activity.uploadedAt}</TableCell>
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

export default StudentActivities;
