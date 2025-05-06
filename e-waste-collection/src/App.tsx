import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import BusinessRegistration from './pages/BusinessRegistration';
import BusinessLogin from './pages/BusinessLogin';
import CollectionRequest from './pages/CollectionRequest';
import AdminDashboard from './pages/AdminDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green shade for environmental theme
    },
    secondary: {
      main: '#1976D2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<BusinessRegistration />} />
            <Route path="/login" element={<BusinessLogin />} />
            <Route path="/collection-request" element={<CollectionRequest />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 