// src/pages/Clients/ClientDetail.jsx
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
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Business,
  Phone,
  Email,
  LocationOn,
  Person,
  Assignment,
  Build,
  History,
  AttachMoney,
  ArrowBack,
  Description,
  PictureAsPdf,
  Visibility,
  Download
} from '@mui/icons-material';

// Importar datos de ejemplo
import { mockClients, mockAssets, mockWorkOrders, mockReports } from '../../data/mockData';
import { useStore } from '@hooks/useStore';
import useGlobalStore from '../../store/globalStore';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [clientAssets, setClientAssets] = useState([]);
  const [clientWorkOrders, setClientWorkOrders] = useState([]);
  const [clientReports, setClientReports] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  
  // Usar ambos stores
  const liveReports = useStore(s => s.reports);
  const { workOrders, clients } = useGlobalStore();

  useEffect(() => {
    // Simulando la carga de datos del cliente
    const foundClient = mockClients.find(c => c.id === parseInt(id));
    if (foundClient) {
      setClient(foundClient);
      
      // Filtrar activos del cliente
      const assets = mockAssets.filter(asset => asset.client_id === parseInt(id));
      setClientAssets(assets);
      
      // Filtrar órdenes de trabajo del cliente
      const workOrders = mockWorkOrders.filter(wo => wo.client_id === parseInt(id));
      setClientWorkOrders(workOrders);
      
      // Obtener reportes del store global (órdenes completadas)
      const completedWorkOrdersFromStore = workOrders?.filter(wo => 
        wo.clienteId === parseInt(id) && 
        wo.estado === 'COMPLETADA' && 
        wo.reporteGenerado === true
      ) || [];
      
      // Combinar con reportes mock si existen
      const mockReportsForClient = mockReports.filter(r => r.client_id === parseInt(id));
      const liveReportsForClient = liveReports.filter(r => r.client_id === parseInt(id));
      
      // Convertir órdenes completadas a formato de reporte para mostrar
      const convertedReports = completedWorkOrdersFromStore.map(wo => ({
        id: wo.reporteId || `RPT-${wo.id}`,
        work_order_id: wo.id,
        asset_name: wo.activoNombre,
        technician: wo.tecnicoAsignado,
        date_generated: wo.fechaReporte || wo.fechaFinalizacion,
        type: `${wo.tipo} - ${wo.subtipo}`,
        photos: wo.multimedia?.fotos?.length || 0,
        total_cost: wo.costoTotal,
        client_name: wo.cliente,
        workOrderData: wo // Datos completos para el viewer
      }));
      
      const allReports = [...mockReportsForClient, ...liveReportsForClient, ...convertedReports];
      setClientReports(allReports);
    }
  }, [id, liveReports, workOrders]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!client) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5">Cargando información del cliente...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/clients')} 
        sx={{ mb: 2 }}
      >
        Volver a Clientes
      </Button>
      
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Avatar 
              sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
              alt={client.name}
            >
              {client.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} md={10}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">{client.name}</Typography>
              <Chip 
                label={client.status} 
                color={client.status === 'Activo' ? 'success' : 'default'}
              />
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Business /></ListItemIcon>
                    <ListItemText primary="Tipo" secondary={client.category} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary="Contacto" secondary={client.contact} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Email /></ListItemIcon>
                    <ListItemText primary="Email" secondary={client.email} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="Teléfono" secondary={client.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="Dirección" secondary={client.address} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AttachMoney /></ListItemIcon>
                    <ListItemText primary="Contrato" secondary="Plan Premium" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="client tabs">
          <Tab label="Información" icon={<Business />} iconPosition="start" />
          <Tab label="Activos" icon={<Build />} iconPosition="start" />
          <Tab label="Órdenes de Trabajo" icon={<Assignment />} iconPosition="start" />
          <Tab label="Documentos" icon={<Description />} iconPosition="start" />
          <Tab label="Historial" icon={<History />} iconPosition="start" />
        </Tabs>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Información Adicional</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Descripción</Typography>
                <Typography variant="body2" paragraph>
                  Cliente corporativo con múltiples sedes en la ciudad.
                </Typography>
                
                <Typography variant="subtitle1">Notas</Typography>
                <Typography variant="body2" paragraph>
                  Requiere atención prioritaria en horarios de oficina.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Información de Contrato</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Tipo de Contrato" secondary="Mantenimiento Integral" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Fecha de Inicio" secondary="01/01/2024" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Fecha de Renovación" secondary="01/01/2025" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Valor del Contrato" secondary="$50,000,000 COP" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        )}
        
        {activeTab === 1 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Activos del Cliente</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {clientAssets.length > 0 ? (
              <Grid container spacing={2}>
                {clientAssets.map((asset) => (
                  <Grid item xs={12} md={6} lg={4} key={asset.id}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Typography variant="subtitle1">{asset.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tipo: {asset.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Marca: {asset.brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Modelo: {asset.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Serie: {asset.serial}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Estado: {asset.status}
                      </Typography>
                      <Button 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate(`/assets/${asset.id}`)}
                      >
                        Ver Detalles
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No hay activos registrados para este cliente.</Typography>
            )}
          </Paper>
        )}
        
        {activeTab === 2 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Órdenes de Trabajo</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {clientWorkOrders.length > 0 ? (
              <Grid container spacing={2}>
                {clientWorkOrders.map((workOrder) => (
                  <Grid item xs={12} key={workOrder.id}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {workOrder.id} - {workOrder.type}
                        </Typography>
                        <Chip 
                          label={workOrder.status} 
                          color={
                            workOrder.status === 'COMPLETADA' ? 'success' :
                            workOrder.status === 'EN RUTA' ? 'primary' :
                            workOrder.status === 'ASIGNADA' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Activo: {workOrder.asset} | Prioridad: {workOrder.priority} | Fecha: {workOrder.date}
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
              <Typography>No hay órdenes de trabajo para este cliente.</Typography>
            )}
          </Paper>
        )}
        
        {activeTab === 3 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Documentos del Cliente</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {clientReports.length > 0 ? (
              <Grid container spacing={2}>
                {clientReports.map((report) => (
                  <Grid item xs={12} md={6} lg={4} key={report.id}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PictureAsPdf color="error" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">{report.id}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        OT: {report.work_order_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Activo: {report.asset_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Técnico: {report.technician}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Fecha: {new Date(report.date_generated).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Tipo: {report.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Fotos: {report.photos}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Costo: ${report.total_cost?.toLocaleString() || '0'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button 
                          size="small" 
                          startIcon={<Visibility />}
                          onClick={() => navigate('/reports/preview', { state: { report } })}
                        >
                          Ver
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<Download />}
                          onClick={() => alert('Descarga simulada del PDF')}
                        >
                          Descargar
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No hay documentos para este cliente.</Typography>
            )}
          </Paper>
        )}
        
        {activeTab === 4 && (
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Historial de Actividades</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              <ListItem divider>
                <ListItemText 
                  primary="Orden de trabajo creada" 
                  secondary="21/01/2025 - OT-2025-043 programada para mantenimiento" 
                />
              </ListItem>
              <ListItem divider>
                <ListItemText 
                  primary="Activo registrado" 
                  secondary="15/01/2025 - Se agregó Planta Eléctrica Cummins" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Cliente creado" 
                  secondary="01/01/2024 - Registro inicial del cliente" 
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ClientDetail;