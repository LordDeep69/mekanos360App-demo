import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  MoreVert,
  QrCode,
  Print,
  Speed,
  CalendarToday,
  Warning,
  CheckCircle,
  History,
  BarChart,
  Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo para instrumentos
const instrumentsData = [
  {
    id: 1,
    code: 'INS-001',
    name: 'Multímetro Digital Fluke 87V',
    type: 'Eléctrico',
    brand: 'Fluke',
    model: '87V',
    serialNumber: 'FL87V-12345',
    status: 'Calibrado',
    lastCalibration: '2023-03-15',
    nextCalibration: '2023-09-15',
    accuracy: '±0.05%',
    range: '0-1000V',
    location: 'Laboratorio Principal',
    responsible: 'Carlos Méndez',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    code: 'INS-002',
    name: 'Osciloscopio Tektronix TBS1052B',
    type: 'Eléctrico',
    brand: 'Tektronix',
    model: 'TBS1052B',
    serialNumber: 'TK1052B-67890',
    status: 'Calibrado',
    lastCalibration: '2023-02-10',
    nextCalibration: '2023-08-10',
    accuracy: '±2%',
    range: '50MHz',
    location: 'Laboratorio Principal',
    responsible: 'Ana Martínez',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    code: 'INS-003',
    name: 'Termómetro Infrarrojo Fluke 62 MAX',
    type: 'Temperatura',
    brand: 'Fluke',
    model: '62 MAX',
    serialNumber: 'FL62M-54321',
    status: 'Requiere Calibración',
    lastCalibration: '2022-09-20',
    nextCalibration: '2023-03-20',
    accuracy: '±1.5°C',
    range: '-30°C a 500°C',
    location: 'Almacén Técnico',
    responsible: 'Roberto Sánchez',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    code: 'INS-004',
    name: 'Analizador de Vibraciones SKF CMXA 75',
    type: 'Mecánico',
    brand: 'SKF',
    model: 'CMXA 75',
    serialNumber: 'SKF75-98765',
    status: 'Calibrado',
    lastCalibration: '2023-04-05',
    nextCalibration: '2023-10-05',
    accuracy: '±2%',
    range: '0-20kHz',
    location: 'Taller Mecánico',
    responsible: 'Miguel Torres',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    code: 'INS-005',
    name: 'Medidor de Presión Digital Ashcroft',
    type: 'Presión',
    brand: 'Ashcroft',
    model: '2089',
    serialNumber: 'AS2089-24680',
    status: 'Fuera de Servicio',
    lastCalibration: '2022-11-15',
    nextCalibration: '2023-05-15',
    accuracy: '±0.5%',
    range: '0-100 PSI',
    location: 'Mantenimiento',
    responsible: 'Laura Gómez',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    code: 'INS-006',
    name: 'Calibrador de Procesos Fluke 754',
    type: 'Calibración',
    brand: 'Fluke',
    model: '754',
    serialNumber: 'FL754-13579',
    status: 'Calibrado',
    lastCalibration: '2023-01-25',
    nextCalibration: '2023-07-25',
    accuracy: '±0.02%',
    range: 'Múltiple',
    location: 'Laboratorio de Calibración',
    responsible: 'Javier Ruiz',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    code: 'INS-007',
    name: 'Medidor de Flujo Ultrasónico Flexim',
    type: 'Flujo',
    brand: 'Flexim',
    model: 'FLUXUS F601',
    serialNumber: 'FX601-24601',
    status: 'Calibrado',
    lastCalibration: '2023-03-30',
    nextCalibration: '2023-09-30',
    accuracy: '±1%',
    range: '0.01-25 m/s',
    location: 'Planta de Tratamiento',
    responsible: 'Patricia Vega',
    image: 'https://via.placeholder.com/150'
  }
];

const Instruments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  
  // Estado para el menú de acciones
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  
  // Estado para el diálogo de detalles
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsInstrument, setDetailsInstrument] = useState(null);
  
  // Tipos de instrumentos disponibles
  const instrumentTypes = [
    { value: 'Eléctrico', label: 'Eléctrico' },
    { value: 'Temperatura', label: 'Temperatura' },
    { value: 'Presión', label: 'Presión' },
    { value: 'Mecánico', label: 'Mecánico' },
    { value: 'Flujo', label: 'Flujo' },
    { value: 'Calibración', label: 'Calibración' }
  ];
  
  // Estados de instrumentos disponibles
  const instrumentStatus = [
    { value: 'Calibrado', label: 'Calibrado', color: 'success' },
    { value: 'Requiere Calibración', label: 'Requiere Calibración', color: 'warning' },
    { value: 'Fuera de Servicio', label: 'Fuera de Servicio', color: 'error' }
  ];
  
  // Filtrar instrumentos según búsqueda y filtros
  const filteredInstruments = instrumentsData.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || instrument.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || instrument.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
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
  
  // Manejar clic en menú de acciones
  const handleMenuClick = (event, instrument) => {
    setAnchorEl(event.currentTarget);
    setSelectedInstrument(instrument);
  };
  
  // Cerrar menú de acciones
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInstrument(null);
  };
  
  // Abrir diálogo de detalles
  const handleOpenDetailsDialog = (instrument) => {
    setDetailsInstrument(instrument);
    setOpenDetailsDialog(true);
  };
  
  // Cerrar diálogo de detalles
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setDetailsInstrument(null);
  };
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Renderizar estado del instrumento
  const renderInstrumentStatus = (status) => {
    const statusObj = instrumentStatus.find(s => s.value === status);
    if (statusObj) {
      return (
        <Chip 
          label={statusObj.label} 
          color={statusObj.color} 
          size="small" 
          icon={statusObj.color === 'error' ? <Warning fontSize="small" /> : <CheckCircle fontSize="small" />} 
        />
      );
    }
    return <Chip label={status} size="small" />;
  };
  
  // Renderizar pestaña de Instrumentos
  const renderInstrumentsTab = () => (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de instrumentos">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Marca/Modelo</TableCell>
              <TableCell>Próxima Calibración</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstruments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((instrument) => {
                // Calcular días hasta próxima calibración
                const today = new Date();
                const nextCalDate = new Date(instrument.nextCalibration);
                const daysUntilCalibration = Math.ceil((nextCalDate - today) / (1000 * 60 * 60 * 24));
                
                return (
                  <TableRow key={instrument.id} hover>
                    <TableCell>{instrument.code}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">{instrument.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={instrument.type} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell>{`${instrument.brand} / ${instrument.model}`}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday fontSize="small" sx={{ mr: 1, color: daysUntilCalibration < 0 ? 'error.main' : daysUntilCalibration < 30 ? 'warning.main' : 'success.main' }} />
                        <Typography variant="body2">
                          {new Date(instrument.nextCalibration).toLocaleDateString()}
                          {daysUntilCalibration < 0 ? 
                            ` (Vencido por ${Math.abs(daysUntilCalibration)} días)` : 
                            ` (En ${daysUntilCalibration} días)`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{renderInstrumentStatus(instrument.status)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleOpenDetailsDialog(instrument)} sx={{ mr: 1 }}>
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, instrument)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredInstruments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Box>
  );
  
  // Renderizar pestaña de Calibraciones
  const renderCalibrationsTab = () => {
    // Agrupar instrumentos por mes de calibración
    const calibrationsByMonth = {};
    
    instrumentsData.forEach(instrument => {
      const nextCalDate = new Date(instrument.nextCalibration);
      const monthYear = `${nextCalDate.getMonth() + 1}-${nextCalDate.getFullYear()}`;
      
      if (!calibrationsByMonth[monthYear]) {
        calibrationsByMonth[monthYear] = [];
      }
      
      calibrationsByMonth[monthYear].push(instrument);
    });
    
    // Ordenar meses
    const sortedMonths = Object.keys(calibrationsByMonth).sort((a, b) => {
      const [monthA, yearA] = a.split('-').map(Number);
      const [monthB, yearB] = b.split('-').map(Number);
      
      if (yearA !== yearB) return yearA - yearB;
      return monthA - monthB;
    });
    
    return (
      <Box>
        {sortedMonths.map(monthYear => {
          const [month, year] = monthYear.split('-').map(Number);
          const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
          
          return (
            <Paper key={monthYear} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {`${monthName} ${year}`}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                {calibrationsByMonth[monthYear].map(instrument => (
                  <Grid item xs={12} sm={6} md={4} key={instrument.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {instrument.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Código: {instrument.code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Fecha: {new Date(instrument.nextCalibration).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Responsable: {instrument.responsible}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {renderInstrumentStatus(instrument.status)}
                        </Box>
                        <Button 
                          size="small" 
                          sx={{ mt: 1 }}
                          onClick={() => handleOpenDetailsDialog(instrument)}
                        >
                          Ver detalles
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          );
        })}
      </Box>
    );
  };
  
  // Renderizar pestaña de Estadísticas
  const renderStatsTab = () => {
    // Calcular estadísticas
    const totalInstruments = instrumentsData.length;
    const calibratedInstruments = instrumentsData.filter(i => i.status === 'Calibrado').length;
    const needsCalibratedInstruments = instrumentsData.filter(i => i.status === 'Requiere Calibración').length;
    const outOfServiceInstruments = instrumentsData.filter(i => i.status === 'Fuera de Servicio').length;
    
    // Calcular porcentajes
    const calibratedPercentage = Math.round((calibratedInstruments / totalInstruments) * 100);
    const needsCalibratedPercentage = Math.round((needsCalibratedInstruments / totalInstruments) * 100);
    const outOfServicePercentage = Math.round((outOfServiceInstruments / totalInstruments) * 100);
    
    // Contar por tipo
    const countByType = {};
    instrumentTypes.forEach(type => {
      countByType[type.value] = instrumentsData.filter(i => i.type === type.value).length;
    });
    
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Tarjetas de resumen */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Estado de Calibración</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h3">{totalInstruments}</Typography>
                  <Speed sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Calibrados: {calibratedInstruments} ({calibratedPercentage}%)
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Requieren Calibración: {needsCalibratedInstruments} ({needsCalibratedPercentage}%)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fuera de Servicio: {outOfServiceInstruments} ({outOfServicePercentage}%)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Distribución por Tipo</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Porcentaje</TableCell>
                        <TableCell>Distribución</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {instrumentTypes.map(type => {
                        const count = countByType[type.value] || 0;
                        const percentage = Math.round((count / totalInstruments) * 100) || 0;
                        
                        return (
                          <TableRow key={type.value}>
                            <TableCell>
                              <Chip 
                                label={type.label} 
                                size="small" 
                                color="primary" 
                                variant="outlined" 
                              />
                            </TableCell>
                            <TableCell align="right">{count}</TableCell>
                            <TableCell align="right">{percentage}%</TableCell>
                            <TableCell>
                              <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
                                <Box 
                                  sx={{ 
                                    height: 10, 
                                    width: `${percentage}%`, 
                                    bgcolor: 'primary.main',
                                    transition: 'width 1s ease-in-out'
                                  }} 
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Gráfico simulado */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>Historial de Calibraciones</Typography>
              <Box sx={{ width: '100%', height: '200px', bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  [Gráfico de líneas simulado - Calibraciones por mes]
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gestión de Instrumentos</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, código o serie"
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
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label">Tipo</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                label="Tipo"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {instrumentTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Estado"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {instrumentStatus.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => alert('Agregar nuevo instrumento')}
              sx={{ mr: 1 }}
            >
              Nuevo Instrumento
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<Print />}
              onClick={() => alert('Imprimir listado')}
            >
              Imprimir
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="instrument tabs">
          <Tab label="Instrumentos" icon={<Speed />} iconPosition="start" />
          <Tab label="Calibraciones" icon={<CalendarToday />} iconPosition="start" />
          <Tab label="Estadísticas" icon={<BarChart />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && renderInstrumentsTab()}
      {activeTab === 1 && renderCalibrationsTab()}
      {activeTab === 2 && renderStatsTab()}
      
      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          alert(`Editar ${selectedInstrument?.name}`);
          handleMenuClose();
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Registrar calibración para ${selectedInstrument?.name}`);
          handleMenuClose();
        }}>
          <CalendarToday fontSize="small" sx={{ mr: 1 }} /> Registrar Calibración
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Ver historial de ${selectedInstrument?.name}`);
          handleMenuClose();
        }}>
          <History fontSize="small" sx={{ mr: 1 }} /> Ver Historial
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Generar QR para ${selectedInstrument?.name}`);
          handleMenuClose();
        }}>
          <QrCode fontSize="small" sx={{ mr: 1 }} /> Generar QR
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Eliminar ${selectedInstrument?.name}`);
          handleMenuClose();
        }} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
      
      {/* Diálogo de detalles */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {detailsInstrument && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Speed color="primary" sx={{ mr: 1 }} />
                {detailsInstrument.name}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={detailsInstrument.image}
                      alt={detailsInstrument.name}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        {renderInstrumentStatus(detailsInstrument.status)}
                      </Box>
                      <Typography variant="body2" color="text.secondary" align="center">
                        Código: {detailsInstrument.code}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Información General</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Tipo:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.type}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Marca/Modelo:</Typography>
                      <Typography variant="body2" gutterBottom>{`${detailsInstrument.brand} / ${detailsInstrument.model}`}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Número de Serie:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.serialNumber}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Ubicación:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.location}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Responsable:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.responsible}</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ mt: 2 }}>Especificaciones Técnicas</Typography>
                      <Divider sx={{ mb: 2 }} />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Precisión:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.accuracy}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Rango:</Typography>
                      <Typography variant="body2" gutterBottom>{detailsInstrument.range}</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ mt: 2 }}>Información de Calibración</Typography>
                      <Divider sx={{ mb: 2 }} />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Última Calibración:</Typography>
                      <Typography variant="body2" gutterBottom>
                        {new Date(detailsInstrument.lastCalibration).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Próxima Calibración:</Typography>
                      <Typography variant="body2" gutterBottom>
                        {new Date(detailsInstrument.nextCalibration).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Historial de Calibraciones</Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Realizado por</TableCell>
                          <TableCell>Resultado</TableCell>
                          <TableCell>Observaciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{new Date(detailsInstrument.lastCalibration).toLocaleDateString()}</TableCell>
                          <TableCell>Juan Pérez</TableCell>
                          <TableCell>Aprobado</TableCell>
                          <TableCell>Calibración estándar</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{new Date(new Date(detailsInstrument.lastCalibration).setMonth(new Date(detailsInstrument.lastCalibration).getMonth() - 6)).toLocaleDateString()}</TableCell>
                          <TableCell>María López</TableCell>
                          <TableCell>Aprobado</TableCell>
                          <TableCell>Ajuste menor requerido</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{new Date(new Date(detailsInstrument.lastCalibration).setMonth(new Date(detailsInstrument.lastCalibration).getMonth() - 12)).toLocaleDateString()}</TableCell>
                          <TableCell>Carlos Ruiz</TableCell>
                          <TableCell>Aprobado</TableCell>
                          <TableCell>Sin observaciones</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Cerrar</Button>
              <Button 
                variant="contained" 
                startIcon={<CalendarToday />}
                onClick={() => alert(`Registrar calibración para ${detailsInstrument.name}`)}
              >
                Registrar Calibración
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Instruments;