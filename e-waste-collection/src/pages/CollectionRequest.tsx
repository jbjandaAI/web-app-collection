import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

const eWasteCategories = [
  'Computers and Laptops',
  'Mobile Phones',
  'Printers and Scanners',
  'Televisions and Monitors',
  'Batteries',
  'Other Electronic Equipment',
];

const validationSchema = yup.object({
  category: yup.string().required('Category is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1'),
  description: yup.string().required('Description is required'),
  pickupAddress: yup.string().required('Pickup address is required'),
  pickupDateTime: yup.date().required('Pickup date and time is required'),
  specialInstructions: yup.string(),
});

const CollectionRequest = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      category: '',
      quantity: '',
      description: '',
      pickupAddress: '',
      pickupDateTime: new Date(),
      specialInstructions: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Implement API call to submit collection request
        console.log('Collection request submitted:', values);
        setSuccess('Collection request submitted successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        setError('Failed to submit collection request. Please try again.');
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Request E-Waste Collection
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">E-Waste Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  label="E-Waste Category"
                >
                  {eWasteCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="pickupAddress"
                name="pickupAddress"
                label="Pickup Address"
                multiline
                rows={2}
                value={formik.values.pickupAddress}
                onChange={formik.handleChange}
                error={formik.touched.pickupAddress && Boolean(formik.errors.pickupAddress)}
                helperText={formik.touched.pickupAddress && formik.errors.pickupAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Pickup Date and Time"
                  value={formik.values.pickupDateTime}
                  onChange={(newValue) => {
                    formik.setFieldValue('pickupDateTime', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.pickupDateTime && Boolean(formik.errors.pickupDateTime)}
                      helperText={formik.touched.pickupDateTime && formik.errors.pickupDateTime}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="specialInstructions"
                name="specialInstructions"
                label="Special Instructions (Optional)"
                multiline
                rows={2}
                value={formik.values.specialInstructions}
                onChange={formik.handleChange}
                error={formik.touched.specialInstructions && Boolean(formik.errors.specialInstructions)}
                helperText={formik.touched.specialInstructions && formik.errors.specialInstructions}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Submit Collection Request
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CollectionRequest; 