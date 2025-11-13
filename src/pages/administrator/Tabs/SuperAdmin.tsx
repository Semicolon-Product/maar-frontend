import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getApi } from "@/api";

interface Admin {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

/* const demoData: Admin[] = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi@example.com', createdAt: '2025-07-20' },
  { id: 2, name: 'Neha Singh', email: 'neha@example.com', createdAt: '2025-07-18' },
  { id: 3, name: 'Amit Das', email: 'amit@example.com', createdAt: '2025-07-15' },
]; */

const SuperAdmins = () => {
  const [sumerAdmins, setSuperadmins] = useState<Admin[]>();

  const getData = async () => {
    await getApi("admin/getSuperAdmins").then((res) => {
      //console.log("response is ::",res?.data);
      setSuperadmins(res?.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-center ">
        Super Admins Details
      </h1>
      <TableContainer component={Paper} className="shadow-md">
        <Table size="small">
          {" "}
          {/* Makes table rows smaller */}
          <TableHead>
            <TableRow sx={{ height: 40, background: "#2a4045" }}>
              <TableCell sx={{ color: "white" }}>
                <strong>ID</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <strong>Created At</strong>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sumerAdmins?.map((admin) => (
              <TableRow key={admin?.id} sx={{ height: 36 }}>
                <TableCell>{admin?.id}</TableCell>
                <TableCell>{admin?.name}</TableCell>
                <TableCell>{admin?.email}</TableCell>
                <TableCell>{admin?.createdAt}</TableCell>
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

export default SuperAdmins;
