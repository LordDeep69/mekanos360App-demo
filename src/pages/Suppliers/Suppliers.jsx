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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  MoreVert,
  FilterList,
  Visibility,
  Business,
  LocationOn,
  Phone,
  Email,
  CheckCircle,
  Warning,
  Error as ErrorIcon
} from '@mui/icons-material';

// Datos de ejemplo para proveedores
const suppliersData = [
  {
    id: 1,
    name: 'Industrias Técnicas S.A.',
    category: 'Equipos Industriales',
    contactPerson: 'Carlos Rodríguez',
    email: 'carlos@industriastecnicas.com',
    phone: '+57 300 123 4567',
    address: 'Calle 45 #23-67, Bogotá',
    rating: 4.5,
    status: 'Activo',
    lastOrder: '2023-05-10',
    totalOrders: 28,
    products: [
      { id: 1, name: 'Motor eléctrico 5HP', category: 'Motores', price: 1200000 },
      { id: 2, name: 'Bomba centrífuga 2"', category: 'Bombas', price: 850000 },
      { id: 3, name: 'Panel de control', category: 'Electrónica', price: 1500000 }
    ]
  },
  {
    id: 2,
    name: 'Suministros Globales Ltda.',
    category: 'Materiales',
    contactPerson: 'Ana Martínez',
    email: 'ana@suministrosglobales.com',
    phone: '+57 315 987 6543',
    address: 'Carrera 68 #12-34, Medellín',
    rating: 4.0,
    status: 'Activo',
    lastOrder: '2023-05-15',
    totalOrders: 15,
    products: [
      { id: 4, name: 'Tubería PVC 1"', category: 'Tuberías', price: 25000 },
      { id: 5, name: 'Válvula de control', category: 'Válvulas', price: 350000 },
      { id: 6, name: 'Cable eléctrico', category: 'Eléctricos', price: 180000 }
    ]
  },
  {
    id: 3,
    name: 'Electro Componentes',
    category: 'Electrónica',
    contactPerson: 'Roberto Sánchez',
    email: 'roberto@electrocomponentes.com',
    phone: '+57 320 456 7890',
    address: 'Av. El Dorado #85-75, Bogotá',
    rating: 3.5,
    status: 'Inactivo',
    lastOrder: '2023-03-20',
    totalOrders: 8,
    products: [
      { id: 7, name: 'Sensor de temperatura', category: 'Sensores', price: 120000 },
      { id: 8, name: 'PLC Siemens', category: 'Automatización', price: 2500000 },
      { id: 9, name: 'Variador de frecuencia', category: 'Control', price: 1800000 }
    ]
  },
  {
    id: 4,
    name: 'Herramientas Profesionales',
    category: 'Herramientas',
    contactPerson: 'Luisa Gómez',
    email: 'luisa@herramientaspro.com',
    phone: '+57 310 234 5678',
    address: 'Calle 80 #45-23, Cali',
    rating: 5.0,
    status: 'Activo',
    lastOrder: '2023-05-18',
    totalOrders: 32,
    products: [
      { id: 10, name: 'Juego de llaves', category: 'Herramientas manuales', price: 450000 },
      { id: 11, name: 'Taladro industrial', category: 'Herramientas eléctricas', price: 780000 },
      { id: 12, name: 'Compresor 2HP', category: 'Compresores', price: 1200000 }
    ]
  },
  {
    id: 5,
    name: 'Químicos Industriales S.A.',
    category: 'Químicos',
    contactPerson: 'Pedro Ramírez',
    email: 'pedro@quimicosindustriales.com',
    phone: '+57 305 876 5432',
    address: 'Carrera 50 #29-15, Barranquilla',
    rating: 4.2,
    status: 'Activo',
    lastOrder: '2023-05-05',
    totalOrders: 18,
    products: [
      { id: 13, name: 'Solvente industrial', category: 'Solventes', price: 85000 },
      { id: 14, name: 'Lubricante sintético', category: 'Lubricantes', price: 120000 },
      { id: 15, name: 'Limpiador de contactos', category: 'Limpiadores', price: 45000 }
    ]
  }
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tabValue, setTabValue] = useState(0);
  
  // Estado para el diálogo de detalles
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  
  // Filtrar proveedores según búsqueda y filtros
  const filteredSuppliers = suppliersData.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Abrir diálogo de detalles
  const handleOpenDetailsDialog = (supplier) => {
    setSelectedSupplier(supplier);
    setOpenDetailsDialog(true);
  };
  
  // Cerrar diálogo de detalles
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedSupplier(null);
  };
  
  // Renderizar estado del proveedor
  const renderSupplierStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Activo':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'Inactivo':
        color = 'error';
        icon = <ErrorIcon fontSize="small" />;
        break;
      case 'Pendiente':
        color = 'warning';
        icon = <Warning fontSize="small" />;
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gestión de Proveedores</Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Proveedores" />
          <Tab label="Productos" />
          <Tab label="Evaluaciones" />
        </Tabs>
      </Paper>
      
      {/* Pestaña de Proveedores */}
      {tabValue === 0 && (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Buscar proveedor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Categoría"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                >
                  <option value="all">Todas</option>
                  <option value="Equipos Industriales">Equipos Industriales</option>
                  <option value="Materiales">Materiales</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Herramientas">Herramientas</option>
                  <option value="Químicos">Químicos</option>
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  size="small"
                >
                  <option value="all">Todos</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Pendiente">Pendiente</option>
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  sx={{ mr: 1 }}
                >
                  Nuevo Proveedor
                </Button>
                
                <Button 
                  variant="outlined"
                  startIcon={<FilterList />}
                >
                  Más Filtros
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de proveedores">
              <TableHead>
                <TableRow>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Contacto</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Último Pedido</TableCell>
                  <TableCell>Calificación</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSuppliers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((supplier) => (
                    <TableRow key={supplier.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {supplier.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2">{supplier.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{new Date(supplier.lastOrder).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Rating value={supplier.rating} precision={0.5} size="small" readOnly />
                      </TableCell>
                      <TableCell>{renderSupplierStatus(supplier.status)}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenDetailsDialog(supplier)} sx={{ mr: 1 }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSuppliers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </>
      )}
      
      {/* Pestaña de Productos */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Catálogo de Productos por Proveedor</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Explore los productos ofrecidos por cada proveedor, compare precios y disponibilidad.
          </Typography>
          
          <Grid container spacing={3}>
            {suppliersData.map(supplier => (
              <Grid item xs={12} md={6} key={supplier.id}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{supplier.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell align="right">Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {supplier.products.map(product => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell align="right">
                                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button size="small" variant="outlined">Ver catálogo completo</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      
      {/* Pestaña de Evaluaciones */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Evaluación de Proveedores</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Revise y gestione las evaluaciones de desempeño de sus proveedores.
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Calidad</TableCell>
                  <TableCell>Tiempo de entrega</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Servicio</TableCell>
                  <TableCell>Calificación global</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliersData.map(supplier => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell><Rating value={Math.random() * 2 + 3} precision={0.5} size="small" readOnly /></TableCell>
                    <TableCell><Rating value={Math.random() * 2 + 3} precision={0.5} size="small" readOnly /></TableCell>
                    <TableCell><Rating value={Math.random() * 2 + 3} precision={0.5} size="small" readOnly /></TableCell>
                    <TableCell><Rating value={Math.random() * 2 + 3} precision={0.5} size="small" readOnly /></TableCell>
                    <TableCell><Rating value={supplier.rating} precision={0.5} size="small" readOnly /></TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">Evaluar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      
      {/* Diálogo de detalles */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedSupplier && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Business color="primary" sx={{ mr: 1 }} />
                {selectedSupplier.name}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información General</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Categoría:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedSupplier.category}</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Estado:</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {renderSupplierStatus(selectedSupplier.status)}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Calificación:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Rating value={selectedSupplier.rating} precision={0.5} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({selectedSupplier.rating}/5)
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información de Contacto</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body2">{selectedSupplier.contactPerson}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body2">{selectedSupplier.email}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body2">{selectedSupplier.phone}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body2">{selectedSupplier.address}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Productos</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Categoría</TableCell>
                          <TableCell align="right">Precio</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedSupplier.products.map(product => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Estadísticas</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Total de pedidos:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedSupplier.totalOrders}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Último pedido:</Typography>
                      <Typography variant="body2" gutterBottom>
                        {new Date(selectedSupplier.lastOrder).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Cerrar</Button>
              <Button 
                variant="outlined" 
                startIcon={<Edit />}
              >
                Editar
              </Button>
              <Button 
                variant="contained"
                color="primary"
              >
                Realizar Pedido
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Suppliers;