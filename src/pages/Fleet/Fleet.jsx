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
  DirectionsCar,
  LocalShipping,
  Speed,
  LocalGasStation,
  Build,
  CalendarToday,
  Person,
  LocationOn
} from '@mui/icons-material';

const fleetData = [
  {
    id: 'VEH-001',
    type: 'Camioneta',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2023,
    plate: 'ABC-123',
    status: 'Disponible',
    lastMaintenance: '2024-12-15',
    nextMaintenance: '2025-03-15',
    assignedTo: 'Juan Pérez',
    currentLocation: 'Cartagena',
    fuelLevel: 85,
    odometer: 15420
  },
  {
    id: 'VEH-002',
    type: 'Furgón',
    brand: 'Renault',
    model: 'Master',
    year: 2022,
    plate: 'DEF-456',
    status: 'En mantenimiento',
    lastMaintenance: '2025-01-10',
    nextMaintenance: '2025-04-10',
    assignedTo: 'Carlos López',
    currentLocation: 'Taller central',
    fuelLevel: 45,
    odometer: 28750
  },
  {
    id: 'VEH-003',
    type: 'Camión',
    brand: 'Chevrolet',
    model: 'NHR',
    year: 2021,
    plate: 'GHI-789',
    status: 'En servicio',
    lastMaintenance: '2024-11-20',
    nextMaintenance: '2025-02-20',
    assignedTo: 'María García',
    currentLocation: 'Barranquilla',
    fuelLevel: 60,
    odometer: 42300
  }
];

const Fleet = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Estado para el menú de acciones
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // Estado para el diálogo de nuevo vehículo
  const [openDialog, setOpenDialog] = useState(false);
  
  // Filtrar vehículos según búsqueda y filtros
  const filteredVehicles = fleetData.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Manejadores de eventos
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleMenuOpen = (event, vehicle) => {
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleAddVehicle = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Flota
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por marca, modelo o placa"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={statusFilter}
                label="Estado"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="Disponible">Disponible</MenuItem>
                <MenuItem value="En servicio">En servicio</MenuItem>
                <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddVehicle}
            >
              Nuevo Vehículo
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Asignado a</TableCell>
              <TableCell>Próx. Mantenimiento</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2">
                          {vehicle.brand} {vehicle.model}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {vehicle.type} - {vehicle.year}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={vehicle.status} 
                      color={
                        vehicle.status === 'Disponible' ? 'success' : 
                        vehicle.status === 'En mantenimiento' ? 'warning' : 
                        'primary'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{vehicle.assignedTo}</TableCell>
                  <TableCell>{vehicle.nextMaintenance}</TableCell>
                  <TableCell>{vehicle.currentLocation}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, vehicle)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredVehicles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Build fontSize="small" sx={{ mr: 1 }} /> Registrar mantenimiento
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <LocalGasStation fontSize="small" sx={{ mr: 1 }} /> Registrar combustible
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
      
      {/* Diálogo para nuevo vehículo */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Nuevo Vehículo</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="Tipo" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Marca" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Modelo" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Año" fullWidth type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Placa" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado">
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="En servicio">En servicio</MenuItem>
                  <MenuItem value="En mantenimiento">En mantenimiento</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Chip label="Información adicional" />
              </Divider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Kilometraje actual" fullWidth type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nivel de combustible (%)" fullWidth type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Próximo mantenimiento" fullWidth type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Asignado a</InputLabel>
                <Select label="Asignado a">
                  <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                  <MenuItem value="Carlos López">Carlos López</MenuItem>
                  <MenuItem value="María García">María García</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Fleet;