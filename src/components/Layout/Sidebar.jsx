// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Collapse,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  People,
  Build,
  CalendarMonth,
  Assignment,
  Description,
  Inventory,
  Science,
  LocalShipping,
  Engineering,
  LocalOffer,
  Analytics,
  Business,
  Settings,
  ExpandLess,
  ExpandMore,
  Circle,
} from '@mui/icons-material';

const menuItems = [
  {
    title: 'OPERACIONES',
    items: [
      { text: 'Dashboard Ejecutivo', icon: <Dashboard />, path: '/dashboard', badge: 'Live' },
      { text: 'Gestión de Clientes', icon: <People />, path: '/clients' },
      { text: 'Activos y Equipos', icon: <Build />, path: '/assets' },
      { text: 'Planificación', icon: <CalendarMonth />, path: '/planning' },
      { text: 'Órdenes de Trabajo', icon: <Assignment />, path: '/work-orders', badge: '12' },
      { text: 'Reportes y Checklists', icon: <Description />, path: '/reports' },
    ],
  },
  {
    title: 'LOGÍSTICA',
    items: [
      { text: 'Inventarios', icon: <Inventory />, path: '/inventory' },
      { text: 'Instrumentos', icon: <Science />, path: '/instruments' },
      { text: 'Flota', icon: <LocalShipping />, path: '/fleet' },
      { text: 'Remisiones', icon: <LocalOffer />, path: '/remissions' },
    ],
  },
  {
    title: 'GESTIÓN',
    items: [
      { text: 'Proyectos Especiales', icon: <Engineering />, path: '/projects' },
      { text: 'Analytics y Bitácoras', icon: <Analytics />, path: '/analytics' },
      { text: 'Proveedores', icon: <Business />, path: '/suppliers' },
    ],
  },
  {
    title: 'CONFIGURACIÓN',
    items: [
      { text: 'Configuración', icon: <Settings />, path: '/settings' },
    ],
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({
    OPERACIONES: true,
    LOGÍSTICA: false,
    GESTIÓN: false,
    CONFIGURACIÓN: false,
  });

  const handleSectionClick = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" fontWeight="bold">
          MEKANOS
        </Typography>
        <Typography variant="caption">
          Sistema de Gestión v1.0
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((section) => (
          <React.Fragment key={section.title}>
            <ListItemButton onClick={() => handleSectionClick(section.title)}>
              <ListItemText 
                primary={section.title}
                primaryTypographyProps={{ fontSize: 12, fontWeight: 'bold', color: 'text.secondary' }}
              />
              {openSections[section.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openSections[section.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton
                      selected={location.pathname === item.path}
                      onClick={() => navigate(item.path)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {item.badge && (
                        <Chip 
                          label={item.badge} 
                          size="small" 
                          color={item.badge === 'Live' ? 'success' : 'primary'}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Versión Demo - No Funcional
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
            <Circle sx={{ fontSize: 8, color: 'success.main' }} />
            <Typography variant="caption">
              Sistema Online
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;