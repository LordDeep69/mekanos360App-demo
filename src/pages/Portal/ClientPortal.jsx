import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Search,
  Notifications,
  Person,
  Dashboard,
  Assignment,
  Build,
  Inventory,
  Receipt,
  Description,
  AttachFile,
  Comment,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Schedule,
  CalendarToday,
  CloudDownload,
  Visibility,
  Add
} from '@mui/icons-material';

// Datos de ejemplo para el portal del cliente
const clientData = {
  id: 1,
  name: 'Industrias XYZ',
  logo: null, // Aquí iría la URL del logo
  contactPerson: 'Juan Pérez',
  email: 'juan.perez@industriasxyz.com',
  phone: '+57 300 123 4567',
  address: 'Calle 45 #23-67, Bogotá',
  contractStart: '2022-01-15',
  contractEnd: '2024-01-14',
  status: 'Activo'
};

const workOrdersData = [
  {
    id: 'WO-2023-001',
    title: 'Mantenimiento preventivo línea de producción A',
    description: 'Mantenimiento programado trimestral para la línea de producción A',
    status: 'Completado',
    priority: 'Media',
    dateCreated: '2023-04-10',
    dateScheduled: '2023-04-15',
    dateCompleted: '2023-04-15',
    assignedTo: 'Carlos Rodríguez',
    location: 'Planta Principal - Sector A',
    progress: 100,
    attachments: 3,
    comments: 5
  },
  {
    id: 'WO-2023-002',
    title: 'Reparación de bomba centrífuga',
    description: 'Reparación de bomba centrífuga que presenta fugas en el sello mecánico',
    status: 'En progreso',
    priority: 'Alta',
    dateCreated: '2023-05-02',
    dateScheduled: '2023-05-03',
    dateCompleted: null,
    assignedTo: 'Ana Martínez',
    location: 'Planta Principal - Sector B',
    progress: 60,
    attachments: 2,
    comments: 8
  },
  {
    id: 'WO-2023-003',
    title: 'Calibración de sensores de temperatura',
    description: 'Calibración de los sensores de temperatura en los hornos de tratamiento térmico',
    status: 'Programado',
    priority: 'Media',
    dateCreated: '2023-05-10',
    dateScheduled: '2023-05-20',
    dateCompleted: null,
    assignedTo: 'Roberto Sánchez',
    location: 'Planta Principal - Sector C',
    progress: 0,
    attachments: 1,
    comments: 2
  },
  {
    id: 'WO-2023-004',
    title: 'Inspección de sistema eléctrico',
    description: 'Inspección general del sistema eléctrico de la planta',
    status: 'Pendiente aprobación',
    priority: 'Baja',
    dateCreated: '2023-05-12',
    dateScheduled: null,
    dateCompleted: null,
    assignedTo: null,
    location: 'Planta Principal - General',
    progress: 0,
    attachments: 0,
    comments: 1
  },
  {
    id: 'WO-2023-005',
    title: 'Mantenimiento correctivo compresor #2',
    description: 'Reparación del compresor #2 que presenta ruidos anormales y baja presión',
    status: 'Completado',
    priority: 'Alta',
    dateCreated: '2023-04-25',
    dateScheduled: '2023-04-26',
    dateCompleted: '2023-04-27',
    assignedTo: 'Carlos Rodríguez',
    location: 'Planta Principal - Cuarto de máquinas',
    progress: 100,
    attachments: 5,
    comments: 10
  }
];

const assetsData = [
  {
    id: 'AST-001',
    name: 'Línea de producción A',
    type: 'Línea de producción',
    status: 'Operativo',
    location: 'Planta Principal - Sector A',
    lastMaintenance: '2023-04-15',
    nextMaintenance: '2023-07-15',
    healthScore: 92
  },
  {
    id: 'AST-002',
    name: 'Bomba centrífuga 75HP',
    type: 'Bomba',
    status: 'En mantenimiento',
    location: 'Planta Principal - Sector B',
    lastMaintenance: '2023-01-10',
    nextMaintenance: '2023-05-03',
    healthScore: 65
  },
  {
    id: 'AST-003',
    name: 'Horno de tratamiento térmico',
    type: 'Horno industrial',
    status: 'Operativo',
    location: 'Planta Principal - Sector C',
    lastMaintenance: '2023-03-05',
    nextMaintenance: '2023-06-05',
    healthScore: 88
  },
  {
    id: 'AST-004',
    name: 'Sistema eléctrico principal',
    type: 'Sistema eléctrico',
    status: 'Requiere atención',
    location: 'Planta Principal - General',
    lastMaintenance: '2022-11-20',
    nextMaintenance: '2023-05-20',
    healthScore: 72
  },
  {
    id: 'AST-005',
    name: 'Compresor industrial #2',
    type: 'Compresor',
    status: 'Operativo',
    location: 'Planta Principal - Cuarto de máquinas',
    lastMaintenance: '2023-04-27',
    nextMaintenance: '2023-07-27',
    healthScore: 95
  }
];

const reportsData = [
  {
    id: 'REP-001',
    title: 'Informe de mantenimiento - Abril 2023',
    type: 'Informe mensual',
    dateGenerated: '2023-05-02',
    format: 'PDF',
    size: '2.4 MB'
  },
  {
    id: 'REP-002',
    title: 'Análisis de fallas - Q1 2023',
    type: 'Informe trimestral',
    dateGenerated: '2023-04-10',
    format: 'XLSX',
    size: '1.8 MB'
  },
  {
    id: 'REP-003',
    title: 'Historial de mantenimiento - Línea A',
    type: 'Historial de activo',
    dateGenerated: '2023-04-16',
    format: 'PDF',
    size: '3.1 MB'
  },
  {
    id: 'REP-004',
    title: 'Costos de mantenimiento - 2023',
    type: 'Informe financiero',
    dateGenerated: '2023-05-05',
    format: 'XLSX',
    size: '1.2 MB'
  },
  {
    id: 'REP-005',
    title: 'Indicadores de desempeño - Abril 2023',
    type: 'KPIs',
    dateGenerated: '2023-05-03',
    format: 'PDF',
    size: '1.5 MB'
  }
];

const notificationsData = [
  {
    id: 1,
    title: 'Mantenimiento programado',
    message: 'Mantenimiento programado para la línea de producción A el 20/05/2023',
    date: '2023-05-10',
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: 'Orden de trabajo completada',
    message: 'La orden de trabajo WO-2023-005 ha sido completada satisfactoriamente',
    date: '2023-04-27',
    read: true,
    type: 'success'
  },
  {
    id: 3,
    title: 'Alerta de activo',
    message: 'El sistema eléctrico principal requiere atención. Se ha creado una solicitud de inspección',
    date: '2023-05-12',
    read: false,
    type: 'warning'
  },
  {
    id: 4,
    title: 'Nuevo informe disponible',
    message: 'El informe de mantenimiento de Abril 2023 está disponible para su descarga',
    date: '2023-05-02',
    read: true,
    type: 'info'
  },
  {
    id: 5,
    title: 'Recordatorio de contrato',
    message: 'Su contrato de mantenimiento se renovará automáticamente el 14/01/2024',
    date: '2023-05-14',
    read: false,
    type: 'info'
  }
];

const ClientPortal = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openNotifications, setOpenNotifications] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [openWorkOrderDialog, setOpenWorkOrderDialog] = useState(false);
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Abrir/cerrar diálogo de notificaciones
  const handleNotificationsToggle = () => {
    setOpenNotifications(!openNotifications);
  };
  
  // Abrir diálogo de orden de trabajo
  const handleOpenWorkOrderDialog = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setOpenWorkOrderDialog(true);
  };
  
  // Cerrar diálogo de orden de trabajo
  const handleCloseWorkOrderDialog = () => {
    setOpenWorkOrderDialog(false);
    setSelectedWorkOrder(null);
  };
  
  // Renderizar estado de la orden de trabajo
  const renderWorkOrderStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Completado':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'En progreso':
        color = 'primary';
        icon = <Build fontSize="small" />;
        break;
      case 'Programado':
        color = 'info';
        icon = <Schedule fontSize="small" />;
        break;
      case 'Pendiente aprobación':
        color = 'warning';
        icon = <Warning fontSize="small" />;
        break;
      case 'Cancelado':
        color = 'error';
        icon = <ErrorIcon fontSize="small" />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status} 
        color={color} 
        size="small" 
        icon={icon} 
      />
    );
  };
  
  // Renderizar estado del activo
  const renderAssetStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Operativo':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'En mantenimiento':
        color = 'primary';
        icon = <Build fontSize="small" />;
        break;
      case 'Requiere atención':
        color = 'warning';
        icon = <Warning fontSize="small" />;
        break;
      case 'Fuera de servicio':
        color = 'error';
        icon = <ErrorIcon fontSize="small" />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status} 
        color={color} 
        size="small" 
        icon={icon} 
      />
    );
  };
  
  // Renderizar prioridad de la orden de trabajo
  const renderWorkOrderPriority = (priority) => {
    let color = 'default';
    
    switch(priority) {
      case 'Alta':
        color = 'error';
        break;
      case 'Media':
        color = 'warning';
        break;
      case 'Baja':
        color = 'info';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={priority} 
        color={color} 
        size="small" 
        variant="outlined"
      />
    );
  };
  
  // Renderizar tipo de notificación
  const renderNotificationType = (type) => {
    let color = 'default';
    let icon = null;
    
    switch(type) {
      case 'success':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'warning':
        color = 'warning';
        icon = <Warning fontSize="small" />;
        break;
      case 'error':
        color = 'error';
        icon = <ErrorIcon fontSize="small" />;
        break;
      case 'info':
      default:
        color = 'info';
        icon = <Notifications fontSize="small" />;
    }
    
    return (
      <Avatar sx={{ bgcolor: `${color}.main`, width: 32, height: 32 }}>
        {icon}
      </Avatar>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Encabezado del portal */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}
                alt={clientData.name}
                src={clientData.logo}
              >
                {clientData.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">{clientData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Portal del Cliente
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TextField
              placeholder="Buscar..."
              size="small"
              sx={{ mr: 2, width: { xs: '100%', md: 250 } }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            
            <IconButton 
              color="primary" 
              onClick={handleNotificationsToggle}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={notificationsData.filter(n => !n.read).length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton color="primary">
              <Person />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Pestañas de navegación */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<Dashboard />} label="Dashboard" />
          <Tab icon={<Assignment />} label="Órdenes de Trabajo" />
          <Tab icon={<Inventory />} label="Activos" />
          <Tab icon={<Description />} label="Informes" />
        </Tabs>
      </Paper>
      
      {/* Dashboard */}
      {tabValue === 0 && (
        <>
          <Typography variant="h6" gutterBottom>Dashboard</Typography>
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Órdenes de Trabajo</Typography>
                  <Typography variant="h4">{workOrdersData.length}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Chip label={`${workOrdersData.filter(wo => wo.status === 'Completado').length} Completadas`} size="small" color="success" />
                    <Chip label={`${workOrdersData.filter(wo => wo.status === 'En progreso').length} En progreso`} size="small" color="primary" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Activos</Typography>
                  <Typography variant="h4">{assetsData.length}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Chip label={`${assetsData.filter(a => a.status === 'Operativo').length} Operativos`} size="small" color="success" />
                    <Chip label={`${assetsData.filter(a => a.status !== 'Operativo').length} Otros`} size="small" color="default" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Próximo Mantenimiento</Typography>
                  <Typography variant="h6" noWrap>
                    {new Date(Math.min(...assetsData.map(a => new Date(a.nextMaintenance)))).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {assetsData.find(a => new Date(a.nextMaintenance).getTime() === Math.min(...assetsData.map(a => new Date(a.nextMaintenance).getTime()))).name}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip icon={<CalendarToday />} label="Programado" size="small" color="info" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Estado del Contrato</Typography>
                  <Typography variant="h6" noWrap>Activo</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Vence: {new Date(clientData.contractEnd).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={((new Date() - new Date(clientData.contractStart)) / (new Date(clientData.contractEnd) - new Date(clientData.contractStart))) * 100} 
                      color="success"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Actividad Reciente</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {workOrdersData.slice(0, 3).map((workOrder) => (
                    <ListItem key={workOrder.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: workOrder.status === 'Completado' ? 'success.main' : workOrder.status === 'En progreso' ? 'primary.main' : 'info.main' }}>
                          <Build />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={workOrder.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {workOrder.id}
                            </Typography>
                            {` — ${workOrder.description.substring(0, 60)}...`}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderWorkOrderStatus(workOrder.status)}
                          <IconButton edge="end" onClick={() => handleOpenWorkOrderDialog(workOrder)} sx={{ ml: 1 }}>
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setTabValue(1)}
                  >
                    Ver todas las órdenes
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Notificaciones</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {notificationsData.slice(0, 3).map((notification) => (
                    <ListItem key={notification.id} divider>
                      <ListItemIcon>
                        {renderNotificationType(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.title}
                        secondary={notification.message}
                      />
                      {!notification.read && (
                        <ListItemSecondaryAction>
                          <Badge color="error" variant="dot" />
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleNotificationsToggle}
                  >
                    Ver todas las notificaciones
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      
      {/* Órdenes de Trabajo */}
      {tabValue === 1 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Órdenes de Trabajo</Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => alert('Funcionalidad para solicitar nueva orden de trabajo')}
            >
              Solicitar Orden
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Fecha Programada</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Prioridad</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Progreso</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workOrdersData.map((workOrder) => (
                  <TableRow key={workOrder.id} hover>
                    <TableCell>{workOrder.id}</TableCell>
                    <TableCell>{workOrder.title}</TableCell>
                    <TableCell>
                      {workOrder.dateScheduled ? new Date(workOrder.dateScheduled).toLocaleDateString() : 'No programada'}
                    </TableCell>
                    <TableCell>{workOrder.location}</TableCell>
                    <TableCell>{renderWorkOrderPriority(workOrder.priority)}</TableCell>
                    <TableCell>{renderWorkOrderStatus(workOrder.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress variant="determinate" value={workOrder.progress} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">{`${workOrder.progress}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleOpenWorkOrderDialog(workOrder)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {/* Activos */}
      {tabValue === 2 && (
        <>
          <Typography variant="h6" gutterBottom>Mis Activos</Typography>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Último Mantenimiento</TableCell>
                  <TableCell>Próximo Mantenimiento</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Salud</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetsData.map((asset) => (
                  <TableRow key={asset.id} hover>
                    <TableCell>{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{new Date(asset.lastMaintenance).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(asset.nextMaintenance).toLocaleDateString()}</TableCell>
                    <TableCell>{renderAssetStatus(asset.status)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={asset.healthScore} 
                            color={asset.healthScore > 80 ? 'success' : asset.healthScore > 60 ? 'warning' : 'error'}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">{`${asset.healthScore}%`}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {/* Informes */}
      {tabValue === 3 && (
        <>
          <Typography variant="h6" gutterBottom>Informes y Documentación</Typography>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Formato</TableCell>
                  <TableCell>Tamaño</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportsData.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{new Date(report.dateGenerated).toLocaleDateString()}</TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => alert(`Descargando ${report.title}`)}>
                        <CloudDownload fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {/* Diálogo de notificaciones */}
      <Dialog open={openNotifications} onClose={handleNotificationsToggle} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Notificaciones</Typography>
            <Chip 
              label={`${notificationsData.filter(n => !n.read).length} no leídas`} 
              size="small" 
              color="error" 
            />
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {notificationsData.map((notification) => (
              <ListItem key={notification.id} divider>
                <ListItemIcon>
                  {renderNotificationType(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2">{notification.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notification.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                  secondary={notification.message}
                />
                {!notification.read && (
                  <ListItemSecondaryAction>
                    <Badge color="error" variant="dot" />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationsToggle}>Cerrar</Button>
          <Button 
            color="primary"
            onClick={() => alert('Marcar todas como leídas')}
          >
            Marcar todas como leídas
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Diálogo de detalles de orden de trabajo */}
      <Dialog open={openWorkOrderDialog} onClose={handleCloseWorkOrderDialog} maxWidth="md" fullWidth>
        {selectedWorkOrder && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedWorkOrder.id}: {selectedWorkOrder.title}</Typography>
                {renderWorkOrderStatus(selectedWorkOrder.status)}
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Información General</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Descripción:</Typography>
                      <Typography variant="body2" paragraph>
                        {selectedWorkOrder.description}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Prioridad:</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {renderWorkOrderPriority(selectedWorkOrder.priority)}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Ubicación:</Typography>
                      <Typography variant="body2">
                        {selectedWorkOrder.location}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha de creación:</Typography>
                      <Typography variant="body2">
                        {new Date(selectedWorkOrder.dateCreated).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha programada:</Typography>
                      <Typography variant="body2">
                        {selectedWorkOrder.dateScheduled ? new Date(selectedWorkOrder.dateScheduled).toLocaleDateString() : 'No programada'}
                      </Typography>
                    </Grid>
                    
                    {selectedWorkOrder.dateCompleted && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Fecha de finalización:</Typography>
                        <Typography variant="body2">
                          {new Date(selectedWorkOrder.dateCompleted).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Asignado a:</Typography>
                      <Typography variant="body2">
                        {selectedWorkOrder.assignedTo || 'No asignado'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Progreso</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>Progreso general:</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedWorkOrder.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedWorkOrder.progress} 
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">{selectedWorkOrder.attachments}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Archivos adjuntos
                        </Typography>
                        <IconButton size="small" sx={{ mt: 1 }}>
                          <AttachFile fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">{selectedWorkOrder.comments}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comentarios
                        </Typography>
                        <IconButton size="small" sx={{ mt: 1 }}>
                          <Comment fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseWorkOrderDialog}>Cerrar</Button>
              <Button 
                variant="outlined" 
                startIcon={<Comment />}
                onClick={() => alert('Agregar comentario')}
              >
                Agregar comentario
              </Button>
              {selectedWorkOrder.status === 'Pendiente aprobación' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => alert('Aprobar orden de trabajo')}
                >
                  Aprobar
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ClientPortal;