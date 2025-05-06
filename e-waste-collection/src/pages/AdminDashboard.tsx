import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Mock data - replace with API call
const mockRequests = [
  {
    id: 1,
    businessName: 'Tech Solutions Inc.',
    category: 'Computers and Laptops',
    quantity: 5,
    pickupAddress: '123 Tech Street, Manila',
    pickupDateTime: '2024-03-20 14:00',
    status: 'Pending',
  },
  {
    id: 2,
    businessName: 'Office Supplies Co.',
    category: 'Printers and Scanners',
    quantity: 3,
    pickupAddress: '456 Business Ave, Quezon City',
    pickupDateTime: '2024-03-21 10:00',
    status: 'Approved',
  },
  // Add more mock data as needed
];

const statusColors = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
  Completed: 'info',
};

const AdminDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (id: number) => {
    // TODO: Implement view details functionality
    console.log('View details for request:', id);
  };

  const handleApprove = (id: number) => {
    // TODO: Implement approve functionality
    console.log('Approve request:', id);
  };

  const handleReject = (id: number) => {
    // TODO: Implement reject functionality
    console.log('Reject request:', id);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Pickup Address</TableCell>
                  <TableCell>Pickup Date/Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow hover key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.businessName}</TableCell>
                      <TableCell>{request.category}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>{request.pickupAddress}</TableCell>
                      <TableCell>{request.pickupDateTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          color={statusColors[request.status as keyof typeof statusColors]}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(request.id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleApprove(request.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleReject(request.id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mockRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 