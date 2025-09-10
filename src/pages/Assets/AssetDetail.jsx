import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Build,
  Settings,
  History,
  Assignment,
  Warning,
  CheckCircle,
  ArrowBack,
  CalendarToday,
  Business,
  Category,
  Bookmark,
  LocationOn
} from '@mui/icons-material';

// Importar datos de ejemplo
import { assetsData, workOrdersData, clientsData } from '../../data/mockData.jsx';

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [client, setClient] = useState(null);
  const [assetWorkOrders, setAssetWorkOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);

  useEffect(() => {
    // Simulando la carga de datos del activo
    const foundAsset = assetsData.find(a => a.id === parseInt(id));
    if (foundAsset) {
      setAsset(foundAsset);
      
      // Buscar el cliente asociado
      const foundClient = clientsData.find(c => c.id === foundAsset.clientId);
      setClient(foundClient);
      
      // Filtrar órdenes de trabajo del activo
      const workOrders = workOrdersData.filter(wo => wo.assetId === parseInt(id));
      setAssetWorkOrders(workOrders);
      
      // Generar historial de mantenimiento simulado
      setMaintenanceHistory([
        { date: '15/04/2023', type: 'Mantenimiento Preventivo', technician: 'Carlos Rodríguez', notes: 'Cambio de filtros y revisión general.' },
        { date: '10/01/2023', type: 'Reparación', technician: 'Ana Martínez', notes: 'Sustitución de correa transportadora.' },
        { date: '05/10/2022', type: 'Inspección', technician: 'Juan Pérez', notes: 'Inspección de rutina, sin incidencias.' },
      ]);
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!asset) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5">Cargando información del activo...</Typography>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operativo': return 'success';
      case 'En Mantenimiento': return 'warning';
      case 'Fuera de Servicio': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/assets')} 
        sx={{ mb: 2 }}
      >
        Volver a Activos
      </Button>
      
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">{asset.name}</Typography>
              <Chip 
                label={asset.status} 
                color={getStatusColor(asset.status)}
              />
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Category /></ListItemIcon>
                    <ListItemText primary="Tipo" secondary={asset.type} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Modelo" secondary={asset.model} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Bookmark /></ListItemIcon>
                    <ListItemText primary="Número de Serie" secondary={asset.serialNumber} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Business /></ListItemIcon>
                    <ListItemText 
                      primary="Cliente" 
                      secondary={
                        client ? (
                          <Button 
                            size="small" 
                            onClick={() => navigate(`/clients/${client.id}`)}
                            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
                          >
                            {client.name}
                          </Button>
                        ) : 'No asignado'
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="Ubicación" secondary={asset.location} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarToday /></ListItemIcon>
                    <ListItemText primary="Fecha de Instalación" secondary={asset.installDate} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>Información de Mantenimiento</Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Último Mantenimiento" 
                    secondary={asset.lastMaintenance || 'No registrado'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Próximo Mantenimiento" 
                    secondary={asset.nextMaintenance || 'No programado'} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Horas de Operación" 
                    secondary={`${asset.operationHours || 0} horas`} 
                  />
                </ListItem>
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<Assignment />}
                  onClick={() => setActiveTab(2)}
                >
                  Ver Órdenes
                </Button>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<Build />}
                  onClick={() => navigate(`/work-orders/new?assetId=${asset.id}`)}
                >
                  Nueva Orden
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="asset tabs">
          <Tab label="Especificaciones" icon={<Settings />} iconPosition="start" />
          <Tab label="Historial" icon={<History />} iconPosition="start" />
          <Tab label="Órdenes de Trabajo" icon={<Assignment />} iconPosition="start" />
        </Tabs>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Especificaciones Técnicas</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Características</Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      {asset.specifications && Object.entries(asset.specifications).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            {key}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                      {!asset.specifications && (
                        <TableRow>
                          <TableCell colSpan={2} align="center">
                            No hay especificaciones disponibles
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Documentación</Typography>
                <List>
                  {asset.documents ? asset.documents.map((doc, index) => (
                    <ListItem key={index} button>
                      <ListItemText 
                        primary={doc.name} 
                        secondary={doc.type} 
                      />
                    </ListItem>
                  )) : (
                    <ListItem>
                      <ListItemText primary="No hay documentos disponibles" />
                    </ListItem>
                  )}
                </List>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>Notas</Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2">
                    {asset.notes || 'No hay notas disponibles para este activo.'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}
        
        {activeTab === 1 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Historial de Mantenimiento</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {maintenanceHistory.length > 0 ? (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Técnico</TableCell>
                      <TableCell>Notas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maintenanceHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>{record.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No hay registros de mantenimiento disponibles.</Typography>
            )}
          </Paper>
        )}
        
        {activeTab === 2 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Órdenes de Trabajo</Typography>
              <Button 
                variant="contained" 
                startIcon={<Assignment />}
                onClick={() => navigate(`/work-orders/new?assetId=${asset.id}`)}
                size="small"
              >
                Nueva Orden
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {assetWorkOrders.length > 0 ? (
              <Grid container spacing={2}>
                {assetWorkOrders.map((workOrder) => (
                  <Grid item xs={12} key={workOrder.id}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">OT #{workOrder.id} - {workOrder.title}</Typography>
                        <Chip 
                          label={workOrder.status} 
                          color={
                            workOrder.status === 'Completada' ? 'success' :
                            workOrder.status === 'En Progreso' ? 'primary' :
                            workOrder.status === 'Pendiente' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Tipo: {workOrder.type} | Prioridad: {workOrder.priority} | Fecha: {workOrder.date}
                      </Typography>
                      <Button 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate(`/work-orders/${workOrder.id}`)}
                      >
                        Ver Detalles
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Warning color="action" sx={{ fontSize: 40, mb: 2 }} />
                <Typography>No hay órdenes de trabajo para este activo.</Typography>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/work-orders/new?assetId=${asset.id}`)}
                >
                  Crear Primera Orden
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AssetDetail;