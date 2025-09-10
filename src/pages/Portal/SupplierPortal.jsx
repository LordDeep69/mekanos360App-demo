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
  Inventory,
  LocalShipping,
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
  Add,
  ShoppingCart,
  Assessment,
  Payment
} from '@mui/icons-material';

// Datos de ejemplo para el portal del proveedor
const supplierData = {
  id: 1,
  name: 'Suministros Industriales S.A.',
  logo: null, // Aquí iría la URL del logo
  contactPerson: 'María González',
  email: 'maria.gonzalez@suministrosindustriales.com',
  phone: '+57 300 987 6543',
  address: 'Carrera 67 #45-23, Medellín',
  contractStart: '2022-03-10',
  contractEnd: '2024-03-09',
  status: 'Activo',
  rating: 4.8,
  category: 'Repuestos industriales'
};

const ordersData = [
  {
    id: 'PO-2023-001',
    title: 'Suministro de repuestos para línea de producción A',
    description: 'Pedido de repuestos para mantenimiento programado de la línea de producción A',
    status: 'Entregado',
    priority: 'Alta',
    dateCreated: '2023-04-05',
    dateRequired: '2023-04-15',
    dateDelivered: '2023-04-14',
    totalAmount: 4850000,
    currency: 'COP',
    items: 12,
    attachments: 3,
    comments: 5
  },
  {
    id: 'PO-2023-002',
    title: 'Suministro de componentes eléctricos',
    description: 'Pedido de componentes eléctricos para reparación de sistema eléctrico principal',
    status: 'En proceso',
    priority: 'Media',
    dateCreated: '2023-05-02',
    dateRequired: '2023-05-20',
    dateDelivered: null,
    totalAmount: 2350000,
    currency: 'COP',
    items: 8,
    attachments: 2,
    comments: 3
  },
  {
    id: 'PO-2023-003',
    title: 'Suministro de herramientas especializadas',
    description: 'Pedido de herramientas especializadas para mantenimiento de equipos de precisión',
    status: 'Pendiente confirmación',
    priority: 'Baja',
    dateCreated: '2023-05-10',
    dateRequired: '2023-06-01',
    dateDelivered: null,
    totalAmount: 1850000,
    currency: 'COP',
    items: 5,
    attachments: 1,
    comments: 2
  },
  {
    id: 'PO-2023-004',
    title: 'Suministro de consumibles para mantenimiento',
    description: 'Pedido de consumibles para operaciones de mantenimiento general',
    status: 'Confirmado',
    priority: 'Media',
    dateCreated: '2023-05-12',
    dateRequired: '2023-05-25',
    dateDelivered: null,
    totalAmount: 950000,
    currency: 'COP',
    items: 15,
    attachments: 1,
    comments: 1
  },
  {
    id: 'PO-2023-005',
    title: 'Suministro de repuestos para compresor #2',
    description: 'Pedido de repuestos para reparación del compresor #2',
    status: 'Entregado',
    priority: 'Alta',
    dateCreated: '2023-04-20',
    dateRequired: '2023-04-25',
    dateDelivered: '2023-04-24',
    totalAmount: 3250000,
    currency: 'COP',
    items: 7,
    attachments: 4,
    comments: 6
  }
];

const productsData = [
  {
    id: 'PROD-001',
    name: 'Rodamiento industrial 5000 series',
    category: 'Rodamientos',
    sku: 'ROD-5000-A',
    price: 450000,
    currency: 'COP',
    stock: 25,
    leadTime: '5-7 días',
    lastSupplied: '2023-04-14',
    rating: 5
  },
  {
    id: 'PROD-002',
    name: 'Contactor trifásico 40A',
    category: 'Componentes eléctricos',
    sku: 'CONT-40A-3F',
    price: 320000,
    currency: 'COP',
    stock: 12,
    leadTime: '3-5 días',
    lastSupplied: '2023-05-02',
    rating: 4.8
  },
  {
    id: 'PROD-003',
    name: 'Kit de herramientas de precisión',
    category: 'Herramientas',
    sku: 'HERR-PREC-01',
    price: 850000,
    currency: 'COP',
    stock: 5,
    leadTime: '7-10 días',
    lastSupplied: '2023-03-15',
    rating: 4.9
  },
  {
    id: 'PROD-004',
    name: 'Aceite lubricante industrial 5L',
    category: 'Consumibles',
    sku: 'LUB-IND-5L',
    price: 95000,
    currency: 'COP',
    stock: 30,
    leadTime: '2-3 días',
    lastSupplied: '2023-05-12',
    rating: 4.7
  },
  {
    id: 'PROD-005',
    name: 'Kit de reparación para compresor industrial',
    category: 'Repuestos',
    sku: 'REP-COMP-01',
    price: 750000,
    currency: 'COP',
    stock: 8,
    leadTime: '4-6 días',
    lastSupplied: '2023-04-24',
    rating: 5
  }
];

const invoicesData = [
  {
    id: 'INV-2023-001',
    orderReference: 'PO-2023-001',
    dateIssued: '2023-04-14',
    dateDue: '2023-05-14',
    amount: 4850000,
    tax: 921500,
    total: 5771500,
    currency: 'COP',
    status: 'Pagada',
    paymentDate: '2023-05-10'
  },
  {
    id: 'INV-2023-002',
    orderReference: 'PO-2023-005',
    dateIssued: '2023-04-24',
    dateDue: '2023-05-24',
    amount: 3250000,
    tax: 617500,
    total: 3867500,
    currency: 'COP',
    status: 'Pagada',
    paymentDate: '2023-05-20'
  },
  {
    id: 'INV-2023-003',
    orderReference: 'PO-2023-002',
    dateIssued: '2023-05-05',
    dateDue: '2023-06-05',
    amount: 1175000,
    tax: 223250,
    total: 1398250,
    currency: 'COP',
    status: 'Pendiente',
    paymentDate: null
  },
  {
    id: 'INV-2023-004',
    orderReference: 'PO-2023-002',
    dateIssued: '2023-05-15',
    dateDue: '2023-06-15',
    amount: 1175000,
    tax: 223250,
    total: 1398250,
    currency: 'COP',
    status: 'Pendiente',
    paymentDate: null
  },
  {
    id: 'INV-2023-005',
    orderReference: 'PO-2023-004',
    dateIssued: '2023-05-18',
    dateDue: '2023-06-18',
    amount: 950000,
    tax: 180500,
    total: 1130500,
    currency: 'COP',
    status: 'Emitida',
    paymentDate: null
  }
];

const notificationsData = [
  {
    id: 1,
    title: 'Nueva orden de compra',
    message: 'Se ha generado una nueva orden de compra PO-2023-004',
    date: '2023-05-12',
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: 'Pago recibido',
    message: 'Se ha recibido el pago de la factura INV-2023-002 por $3,867,500 COP',
    date: '2023-05-20',
    read: true,
    type: 'success'
  },
  {
    id: 3,
    title: 'Solicitud de cotización',
    message: 'Se ha recibido una solicitud de cotización para suministro de materiales eléctricos',
    date: '2023-05-15',
    read: false,
    type: 'info'
  },
  {
    id: 4,
    title: 'Recordatorio de entrega',
    message: 'La entrega de la orden PO-2023-002 está programada para el 20/05/2023',
    date: '2023-05-18',
    read: true,
    type: 'warning'
  },
  {
    id: 5,
    title: 'Evaluación de proveedor',
    message: 'Ha recibido una nueva evaluación de desempeño con calificación 4.8/5',
    date: '2023-05-14',
    read: false,
    type: 'info'
  }
];

const SupplierPortal = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openNotifications, setOpenNotifications] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Abrir/cerrar diálogo de notificaciones
  const handleNotificationsToggle = () => {
    setOpenNotifications(!openNotifications);
  };
  
  // Abrir diálogo de orden
  const handleOpenOrderDialog = (order) => {
    setSelectedOrder(order);
    setOpenOrderDialog(true);
  };
  
  // Cerrar diálogo de orden
  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
    setSelectedOrder(null);
  };
  
  // Renderizar estado de la orden
  const renderOrderStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Entregado':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'En proceso':
        color = 'primary';
        icon = <LocalShipping fontSize="small" />;
        break;
      case 'Confirmado':
        color = 'info';
        icon = <Schedule fontSize="small" />;
        break;
      case 'Pendiente confirmación':
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
  
  // Renderizar estado de la factura
  const renderInvoiceStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Pagada':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'Pendiente':
        color = 'warning';
        icon = <Warning fontSize="small" />;
        break;
      case 'Vencida':
        color = 'error';
        icon = <ErrorIcon fontSize="small" />;
        break;
      case 'Emitida':
        color = 'info';
        icon = <Receipt fontSize="small" />;
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
  
  // Renderizar prioridad de la orden
  const renderOrderPriority = (priority) => {
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
  
  // Formatear moneda
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currency }).format(amount);
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
                alt={supplierData.name}
                src={supplierData.logo}
              >
                {supplierData.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5">{supplierData.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Portal del Proveedor
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Chip 
                    label={supplierData.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ mr: 1 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <Box 
                        key={i} 
                        component="span" 
                        color={i < Math.floor(supplierData.rating) ? 'warning.main' : 'text.disabled'}
                        sx={{ fontSize: '0.875rem' }}
                      >
                        ★
                      </Box>
                    ))}
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      ({supplierData.rating})
                    </Typography>
                  </Box>
                </Box>
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
          <Tab icon={<ShoppingCart />} label="Órdenes" />
          <Tab icon={<Inventory />} label="Productos" />
          <Tab icon={<Payment />} label="Facturación" />
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
                  <Typography color="text.secondary" gutterBottom>Órdenes Activas</Typography>
                  <Typography variant="h4">
                    {ordersData.filter(o => o.status !== 'Entregado' && o.status !== 'Cancelado').length}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Chip label={`${ordersData.filter(o => o.status === 'Confirmado').length} Confirmadas`} size="small" color="info" />
                    <Chip label={`${ordersData.filter(o => o.status === 'En proceso').length} En proceso`} size="small" color="primary" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Productos</Typography>
                  <Typography variant="h4">{productsData.length}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Chip 
                      label={`${productsData.filter(p => p.stock > 10).length} En stock`} 
                      size="small" 
                      color="success" 
                    />
                    <Chip 
                      label={`${productsData.filter(p => p.stock <= 10).length} Stock bajo`} 
                      size="small" 
                      color="warning" 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>Facturación Pendiente</Typography>
                  <Typography variant="h6" noWrap>
                    {formatCurrency(
                      invoicesData
                        .filter(i => i.status === 'Pendiente' || i.status === 'Emitida')
                        .reduce((sum, i) => sum + i.total, 0),
                      'COP'
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {invoicesData.filter(i => i.status === 'Pendiente' || i.status === 'Emitida').length} facturas
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip icon={<Receipt />} label="Por cobrar" size="small" color="warning" />
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
                    Vence: {new Date(supplierData.contractEnd).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={((new Date() - new Date(supplierData.contractStart)) / (new Date(supplierData.contractEnd) - new Date(supplierData.contractStart))) * 100} 
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
                <Typography variant="h6" gutterBottom>Órdenes Recientes</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {ordersData.slice(0, 3).map((order) => (
                    <ListItem key={order.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: order.status === 'Entregado' ? 'success.main' : order.status === 'En proceso' ? 'primary.main' : 'info.main' }}>
                          <ShoppingCart />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{order.title}</Typography>
                            <Typography variant="body2">
                              {formatCurrency(order.totalAmount, order.currency)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {order.id}
                            </Typography>
                            {` — ${order.description.substring(0, 60)}...`}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {renderOrderStatus(order.status)}
                          <IconButton edge="end" onClick={() => handleOpenOrderDialog(order)} sx={{ ml: 1 }}>
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
      
      {/* Órdenes */}
      {tabValue === 1 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Órdenes de Compra</Typography>
            <Button 
              variant="contained" 
              startIcon={<Assessment />}
              onClick={() => alert('Generar reporte de órdenes')}
            >
              Generar Reporte
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Fecha Requerida</TableCell>
                  <TableCell>Monto Total</TableCell>
                  <TableCell>Prioridad</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.title}</TableCell>
                    <TableCell>
                      {order.dateRequired ? new Date(order.dateRequired).toLocaleDateString() : 'No especificada'}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalAmount, order.currency)}</TableCell>
                    <TableCell>{renderOrderPriority(order.priority)}</TableCell>
                    <TableCell>{renderOrderStatus(order.status)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleOpenOrderDialog(order)}>
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
      
      {/* Productos */}
      {tabValue === 2 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Catálogo de Productos</Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => alert('Agregar nuevo producto')}
            >
              Nuevo Producto
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Tiempo de Entrega</TableCell>
                  <TableCell>Valoración</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsData.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" />
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{formatCurrency(product.price, product.currency)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={product.stock} 
                        size="small" 
                        color={product.stock > 10 ? 'success' : product.stock > 5 ? 'warning' : 'error'} 
                      />
                    </TableCell>
                    <TableCell>{product.leadTime}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <Box 
                            key={i} 
                            component="span" 
                            color={i < Math.floor(product.rating) ? 'warning.main' : 'text.disabled'}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            ★
                          </Box>
                        ))}
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          ({product.rating})
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {/* Facturación */}
      {tabValue === 3 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Facturación</Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => alert('Crear nueva factura')}
            >
              Nueva Factura
            </Button>
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Referencia</TableCell>
                  <TableCell>Fecha Emisión</TableCell>
                  <TableCell>Fecha Vencimiento</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Total (con IVA)</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoicesData.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.orderReference}</TableCell>
                    <TableCell>{new Date(invoice.dateIssued).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invoice.dateDue).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount, invoice.currency)}</TableCell>
                    <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                    <TableCell>{renderInvoiceStatus(invoice.status)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => alert(`Ver factura ${invoice.id}`)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => alert(`Descargar factura ${invoice.id}`)} sx={{ ml: 1 }}>
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
      
      {/* Diálogo de detalles de orden */}
      <Dialog open={openOrderDialog} onClose={handleCloseOrderDialog} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedOrder.id}: {selectedOrder.title}</Typography>
                {renderOrderStatus(selectedOrder.status)}
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
                        {selectedOrder.description}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Prioridad:</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {renderOrderPriority(selectedOrder.priority)}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Monto Total:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(selectedOrder.totalAmount, selectedOrder.currency)}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha de creación:</Typography>
                      <Typography variant="body2">
                        {new Date(selectedOrder.dateCreated).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha requerida:</Typography>
                      <Typography variant="body2">
                        {selectedOrder.dateRequired ? new Date(selectedOrder.dateRequired).toLocaleDateString() : 'No especificada'}
                      </Typography>
                    </Grid>
                    
                    {selectedOrder.dateDelivered && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Fecha de entrega:</Typography>
                        <Typography variant="body2">
                          {new Date(selectedOrder.dateDelivered).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Cantidad de items:</Typography>
                      <Typography variant="body2">
                        {selectedOrder.items}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Detalles Adicionales</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">{selectedOrder.attachments}</Typography>
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
                        <Typography variant="h6">{selectedOrder.comments}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comentarios
                        </Typography>
                        <IconButton size="small" sx={{ mt: 1 }}>
                          <Comment fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>Estado de la Orden</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Creada</Typography>
                            <Chip 
                              size="small" 
                              color="success" 
                              icon={<CheckCircle fontSize="small" />} 
                              label={new Date(selectedOrder.dateCreated).toLocaleDateString()} 
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Confirmada</Typography>
                            {selectedOrder.status !== 'Pendiente confirmación' ? (
                              <Chip 
                                size="small" 
                                color="success" 
                                icon={<CheckCircle fontSize="small" />} 
                                label="Completado" 
                              />
                            ) : (
                              <Chip 
                                size="small" 
                                color="warning" 
                                icon={<Warning fontSize="small" />} 
                                label="Pendiente" 
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2">En proceso</Typography>
                            {selectedOrder.status === 'En proceso' || selectedOrder.status === 'Entregado' ? (
                              <Chip 
                                size="small" 
                                color="success" 
                                icon={<CheckCircle fontSize="small" />} 
                                label="Completado" 
                              />
                            ) : (
                              <Chip 
                                size="small" 
                                color="default" 
                                label="Pendiente" 
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Entregado</Typography>
                            {selectedOrder.status === 'Entregado' ? (
                              <Chip 
                                size="small" 
                                color="success" 
                                icon={<CheckCircle fontSize="small" />} 
                                label={selectedOrder.dateDelivered ? new Date(selectedOrder.dateDelivered).toLocaleDateString() : 'Completado'} 
                              />
                            ) : (
                              <Chip 
                                size="small" 
                                color="default" 
                                label="Pendiente" 
                              />
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseOrderDialog}>Cerrar</Button>
              <Button 
                variant="outlined" 
                startIcon={<Comment />}
                onClick={() => alert('Agregar comentario')}
              >
                Agregar comentario
              </Button>
              {selectedOrder.status === 'Pendiente confirmación' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => alert('Confirmar orden')}
                >
                  Confirmar Orden
                </Button>
              )}
              {selectedOrder.status === 'Confirmado' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => alert('Marcar como en proceso')}
                >
                  Iniciar Proceso
                </Button>
              )}
              {selectedOrder.status === 'En proceso' && (
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => alert('Marcar como entregado')}
                >
                  Marcar como Entregado
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SupplierPortal;