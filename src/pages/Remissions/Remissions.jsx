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
  Divider,
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
  LocalShipping,
  CalendarToday,
  Print,
  Visibility,
  CheckCircle,
  Warning,
  Error as ErrorIcon
} from '@mui/icons-material';

// Datos de ejemplo para remisiones
const remissionsData = [
  {
    id: 1,
    number: 'REM-001',
    date: '2023-05-15',
    client: 'Industrias XYZ',
    destination: 'Planta Principal',
    items: [
      { id: 1, code: 'ITEM-001', description: 'Motor eléctrico 5HP', quantity: 2, unit: 'Unidad' },
      { id: 2, code: 'ITEM-002', description: 'Sensor de temperatura', quantity: 5, unit: 'Unidad' }
    ],
    status: 'Entregado',
    deliveryDate: '2023-05-17',
    carrier: 'Transportes Rápidos',
    driver: 'Juan Pérez',
    vehicle: 'Camión - ABC123',
    notes: 'Entrega realizada sin novedad'
  },
  {
    id: 2,
    number: 'REM-002',
    date: '2023-05-20',
    client: 'Servicios ABC',
    destination: 'Sede Norte',
    items: [
      { id: 3, code: 'ITEM-003', description: 'Bomba centrífuga 2"', quantity: 1, unit: 'Unidad' },
      { id: 4, code: 'ITEM-004', description: 'Válvula de control', quantity: 3, unit: 'Unidad' },
      { id: 5, code: 'ITEM-005', description: 'Tubería PVC 1"', quantity: 10, unit: 'Metro' }
    ],
    status: 'En Tránsito',
    deliveryDate: '2023-05-22',
    carrier: 'Logística Integral',
    driver: 'María López',
    vehicle: 'Camioneta - DEF456',
    notes: 'Cliente solicitó entrega antes de las 10 AM'
  },
  {
    id: 3,
    number: 'REM-003',
    date: '2023-05-25',
    client: 'Manufactura Global',
    destination: 'Planta de Producción',
    items: [
      { id: 6, code: 'ITEM-006', description: 'Panel de control', quantity: 1, unit: 'Unidad' },
      { id: 7, code: 'ITEM-007', description: 'Cable eléctrico', quantity: 50, unit: 'Metro' }
    ],
    status: 'Programado',
    deliveryDate: '2023-05-28',
    carrier: 'Transportes Seguros',
    driver: 'Carlos Rodríguez',
    vehicle: 'Furgón - GHI789',
    notes: 'Requiere montacargas para descarga'
  },
  {
    id: 4,
    number: 'REM-004',
    date: '2023-05-10',
    client: 'Alimentos Frescos S.A.',
    destination: 'Centro de Distribución',
    items: [
      { id: 8, code: 'ITEM-008', description: 'Compresor industrial', quantity: 1, unit: 'Unidad' },
      { id: 9, code: 'ITEM-009', description: 'Filtro de aire', quantity: 5, unit: 'Unidad' }
    ],
    status: 'Entregado',
    deliveryDate: '2023-05-12',
    carrier: 'Transportes Rápidos',
    driver: 'Roberto Sánchez',
    vehicle: 'Camión - JKL012',
    notes: 'Entrega verificada por supervisor de planta'
  },
  {
    id: 5,
    number: 'REM-005',
    date: '2023-05-30',
    client: 'Textiles Modernos',
    destination: 'Bodega Principal',
    items: [
      { id: 10, code: 'ITEM-010', description: 'Motor reductor', quantity: 2, unit: 'Unidad' },
      { id: 11, code: 'ITEM-011', description: 'Correa transportadora', quantity: 1, unit: 'Unidad' },
      { id: 12, code: 'ITEM-012', description: 'Rodamientos', quantity: 20, unit: 'Unidad' }
    ],
    status: 'Cancelado',
    deliveryDate: null,
    carrier: null,
    driver: null,
    vehicle: null,
    notes: 'Cancelado por cliente - Cambio de requerimientos'
  }
];

const Remissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Estado para el diálogo de detalles
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedRemission, setSelectedRemission] = useState(null);
  
  // Filtrar remisiones según búsqueda y filtros
  const filteredRemissions = remissionsData.filter(remission => {
    const matchesSearch = remission.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remission.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remission.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || remission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
  
  // Abrir diálogo de detalles
  const handleOpenDetailsDialog = (remission) => {
    setSelectedRemission(remission);
    setOpenDetailsDialog(true);
  };
  
  // Cerrar diálogo de detalles
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedRemission(null);
  };
  
  // Renderizar estado de la remisión
  const renderRemissionStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'Entregado':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'En Tránsito':
        color = 'primary';
        icon = <LocalShipping fontSize="small" />;
        break;
      case 'Programado':
        color = 'info';
        icon = <CalendarToday fontSize="small" />;
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gestión de Remisiones</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por número, cliente o destino"
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
              label="Estado"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              SelectProps={{
                native: true,
              }}
              size="small"
            >
              <option value="all">Todos</option>
              <option value="Entregado">Entregado</option>
              <option value="En Tránsito">En Tránsito</option>
              <option value="Programado">Programado</option>
              <option value="Cancelado">Cancelado</option>
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              sx={{ mr: 1 }}
            >
              Nueva Remisión
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<Print />}
            >
              Imprimir
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de remisiones">
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Ítems</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRemissions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((remission) => (
                <TableRow key={remission.id} hover>
                  <TableCell>{remission.number}</TableCell>
                  <TableCell>{new Date(remission.date).toLocaleDateString()}</TableCell>
                  <TableCell>{remission.client}</TableCell>
                  <TableCell>{remission.destination}</TableCell>
                  <TableCell>{remission.items.length} ítems</TableCell>
                  <TableCell>
                    {remission.deliveryDate ? new Date(remission.deliveryDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{renderRemissionStatus(remission.status)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleOpenDetailsDialog(remission)} sx={{ mr: 1 }}>
                      <Visibility fontSize="small" />
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
        count={filteredRemissions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
      
      {/* Diálogo de detalles */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedRemission && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShipping color="primary" sx={{ mr: 1 }} />
                Remisión {selectedRemission.number}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información General</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha de Emisión:</Typography>
                      <Typography variant="body2" gutterBottom>
                        {new Date(selectedRemission.date).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Estado:</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {renderRemissionStatus(selectedRemission.status)}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Cliente:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedRemission.client}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Destino:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedRemission.destination}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información de Entrega</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Fecha de Entrega:</Typography>
                      <Typography variant="body2" gutterBottom>
                        {selectedRemission.deliveryDate ? new Date(selectedRemission.deliveryDate).toLocaleDateString() : '-'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Transportista:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedRemission.carrier || '-'}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Conductor:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedRemission.driver || '-'}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Vehículo:</Typography>
                      <Typography variant="body2" gutterBottom>{selectedRemission.vehicle || '-'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Ítems</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell>Descripción</TableCell>
                          <TableCell align="right">Cantidad</TableCell>
                          <TableCell>Unidad</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRemission.items.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Observaciones</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2">{selectedRemission.notes || 'Sin observaciones'}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Cerrar</Button>
              <Button 
                variant="outlined" 
                startIcon={<Print />}
                onClick={() => alert(`Imprimir remisión ${selectedRemission.number}`)}
              >
                Imprimir
              </Button>
              {selectedRemission.status !== 'Entregado' && selectedRemission.status !== 'Cancelado' && (
                <Button 
                  variant="contained" 
                  startIcon={<CheckCircle />}
                  onClick={() => alert(`Marcar como entregado: ${selectedRemission.number}`)}
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

export default Remissions;