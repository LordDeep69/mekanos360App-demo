// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useGlobalStore from './store/globalStore';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

// Layout
import MainLayout from './components/Layout/MainLayout';
import MobileLayout from './components/Layout/MobileLayout';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import ClientsManagement from './pages/Clients/ClientsManagement';
import ClientDetail from './pages/Clients/ClientDetail';
import AssetsManagement from './pages/Assets/AssetsManagement';
import AssetDetail from './pages/Assets/AssetDetail';
import Planning from './pages/Planning/Planning';
import WorkOrders from './pages/WorkOrders/WorkOrders';
import WorkOrderDetail from './pages/WorkOrders/WorkOrderDetail';
import Reports from './pages/Reports/Reports';
import ChecklistBuilder from './pages/Reports/ChecklistBuilder';
import ReportPreviewPage from './pages/Reports/ReportGenerator';
import Inventory from './pages/Inventory/Inventory';
import Instruments from './pages/Instruments/Instruments';
import Fleet from './pages/Fleet/Fleet';
import Projects from './pages/Projects/Projects';
import Remissions from './pages/Remissions/Remissions';
import Analytics from './pages/Analytics/Analytics';
import Suppliers from './pages/Suppliers/Suppliers';
import ClientPortal from './pages/Portal/ClientPortal';
import SupplierPortal from './pages/Portal/SupplierPortal';
import MobileApp from './pages/Mobile/MobileApp';
import Settings from './pages/Settings/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#f50057',
      dark: '#c51162',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  const isMobileView = useGlobalStore(state => state.isMobileView);
  const setIsMobileView = useGlobalStore(state => state.setIsMobileView);

  // Función para cambiar a vista escritorio y sincronizar URL
  const switchToDesktopView = () => {
    setIsMobileView(false);
  };

  // LocationSync: sincroniza el store con la ubicación del router en todo momento
  function LocationSync() {
    const location = useLocation();
    useEffect(() => {
      setIsMobileView(location.pathname.startsWith('/mobile'));
    }, [location.pathname]);
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Toaster position="top-right" />
        <Router>
          <LocationSync />
          {isMobileView ? (
            <Routes>
              <Route path="/mobile/*" element={<MobileApp />} />
              <Route path="/mobile" element={<MobileApp />} />
              <Route path="*" element={<Navigate to="/mobile" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<MainLayout />}> 
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clients" element={<ClientsManagement />} />
                <Route path="clients/:id" element={<ClientDetail />} />
                <Route path="assets" element={<AssetsManagement />} />
                <Route path="assets/:id" element={<AssetDetail />} />
                <Route path="planning" element={<Planning />} />
                <Route path="work-orders" element={<WorkOrders />} />
                <Route path="work-orders/:id" element={<WorkOrderDetail />} />
                <Route path="reports" element={<Reports />} />
                <Route path="reports/checklist-builder" element={<ChecklistBuilder />} />
                <Route path="reports/preview" element={<ReportPreviewPage />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="instruments" element={<Instruments />} />
                <Route path="fleet" element={<Fleet />} />
                <Route path="projects" element={<Projects />} />
                <Route path="remissions" element={<Remissions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/portal/client" element={<ClientPortal />} />
              <Route path="/portal/supplier" element={<SupplierPortal />} />
            </Routes>
          )}
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

// (La lógica de sincronización de vista móvil está centralizada en el store)

export default App;