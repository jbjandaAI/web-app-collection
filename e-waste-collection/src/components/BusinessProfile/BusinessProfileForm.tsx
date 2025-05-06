import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

// Types
interface BusinessProfileFormValues {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  businessType: string;
}

// Validation Schema
const validationSchema = yup.object({
  businessName: yup
    .string()
    .required('Business name is required')
    .min(2, 'Business name should be at least 2 characters'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  address: yup
    .string()
    .required('Address is required'),
  city: yup
    .string()
    .required('City is required'),
  province: yup
    .string()
    .required('Province is required'),
  postalCode: yup
    .string()
    .required('Postal code is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits'),
  businessType: yup
    .string()
    .required('Business type is required'),
});

// Custom hook for form logic
const useBusinessProfileForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik<BusinessProfileFormValues>({
    initialValues: {
      businessName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      businessType: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);
        // TODO: Implement API call to create business profile
        console.log('Form submitted:', values);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      } catch (err) {
        setError('Failed to create business profile. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return { formik, isSubmitting, error };
};

// Form Field Component
interface FormFieldProps {
  formik: any;
  name: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  formik,
  name,
  label,
  type = 'text',
  fullWidth = true,
}) => (
  <TextField
    fullWidth={fullWidth}
    id={name}
    name={name}
    label={label}
    type={type}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
);

// Main Component
const BusinessProfileForm: React.FC = () => {
  const { formik, isSubmitting, error } = useBusinessProfileForm();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Business Profile
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Business Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Business Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormField formik={formik} name="businessName" label="Business Name" />
            </Grid>
            <Grid item xs={12}>
              <FormField formik={formik} name="businessType" label="Business Type" />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormField formik={formik} name="email" label="Email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField formik={formik} name="password" label="Password" type="password" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <FormField formik={formik} name="phoneNumber" label="Phone Number" />
            </Grid>

            {/* Address Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Address Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormField formik={formik} name="address" label="Address" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField formik={formik} name="city" label="City" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField formik={formik} name="province" label="Province" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField formik={formik} name="postalCode" label="Postal Code" />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? 'Creating Profile...' : 'Create Business Profile'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BusinessProfileForm; 