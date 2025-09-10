// src/pages/Clients/ClientsManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  LocationOn,
  Phone,
  Email,
  Business,
  Upload,
  Download,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockClients = [
  {
    id: 1,
    nit: '890.123.456-7',
    nombre: 'Hotel Caribe S.A.',
    categoria: 'Hotelero',
    sedes: 2,
    activos: 15,
    estado: 'Activo',
    contacto: 'Juan Pérez',
    telefono: '301-555-0123',
    email: 'juan@hotelcaribe.com',
    direccion: 'Cra 1 #5-87, Bocagrande',
  },
  {
    id: 2,
    nit: '900.234.567-8',
    nombre: 'Comfenalco Cartagena',
    categoria: 'Salud',
    sedes: 8,
    activos: 45,
    estado: 'Activo',
    contacto: 'María López',
    telefono: '302-555-0456',
    email: 'maria@comfenalco.com',
    direccion: 'Calle 30 #89-15',
  },
  {
    id: 3,
    nit: '800.345.678-9',
    nombre: 'C.C. La Plazuela',
    categoria: 'Comercial',
    sedes: 1,
    activos: 12,
    estado: 'Activo',
    contacto: 'Carlos Rodríguez',
    telefono: '303-555-0789',
    email: 'carlos@laplazuela.com',
    direccion: 'Diagonal 35 #71-77',
  },
];

function ClientsManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState('table'); // table, cards, map
  const [clients, setClients] = useState(mockClients);
  const [newClientData, setNewClientData] = useState({
    nit: '',
    nombre: '',
    categoria: '',
    segmento: '',
    direccion: '',
    contacto: '',
    cargo: '',
    telefono: '',
    email: '',
    sedes: 1,
    activos: 0,
    estado: 'Activo',
  });
  const [errorNIT, setErrorNIT] = useState('');

  const handleOpenMenu = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleViewClient = () => {
    navigate(`/clients/${selectedClient.id}`);
    handleCloseMenu();
  };

  const handleNewClientChange = (e) => {
    const { name, value } = e.target;
    setNewClientData({
      ...newClientData,
      [name]: value
    });
    if (name === 'nit') setErrorNIT('');
  };

  const handleSaveNewClient = () => {
    // Validación de duplicados por NIT
    if (clients.some(c => c.nit === newClientData.nit)) {
      setErrorNIT('Ya existe un cliente con ese NIT');
      return;
    }
    // Guardar cliente en el array
    setClients([...clients, { ...newClientData, id: clients.length + 1 }]);
    setOpenDialog(false);
    setNewClientData({
      nit: '', nombre: '', categoria: '', segmento: '', direccion: '', contacto: '', cargo: '', telefono: '', email: '', sedes: 1, activos: 0, estado: 'Activo',
    });
    setErrorNIT('');
  };

  const ClientDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        Nuevo Cliente
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="NIT"
              name="nit"
              placeholder="000.000.000-0"
              required
              value={newClientData.nit}
              onChange={handleNewClientChange}
              error={!!errorNIT}
              helperText={errorNIT}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Razón Social"
              name="nombre"
              required
              value={newClientData.nombre}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select label="Categoría" name="categoria" value={newClientData.categoria} onChange={handleNewClientChange}>
                <MenuItem value="Hotelero">Hotelero</MenuItem>
                <MenuItem value="Salud">Salud</MenuItem>
                <MenuItem value="Comercial">Comercial</MenuItem>
                <MenuItem value="Industrial">Industrial</MenuItem>
                <MenuItem value="Educativo">Educativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Segmento</InputLabel>
              <Select label="Segmento" name="segmento" value={newClientData.segmento} onChange={handleNewClientChange}>
                <MenuItem value="Premium">Premium</MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Básico">Básico</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección Principal"
              name="direccion"
              multiline
              rows={2}
              value={newClientData.direccion}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contacto Principal"
              name="contacto"
              value={newClientData.contacto}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cargo"
              name="cargo"
              value={newClientData.cargo}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              type="tel"
              value={newClientData.telefono}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newClientData.email}
              onChange={handleNewClientChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
        <Button variant="contained" onClick={handleSaveNewClient}>
          Guardar Clientebr
        </Button>
      </DialogActions>
    </Dialog>
  );

  const ClientCard = ({ client }) => (
    <Paper sx={{ p: 2, height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/clients/${client.id}`)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          {client.nombre.charAt(0)}
        </Avatar>
        <Chip 
          label={client.estado} 
          color={client.estado === 'Activo' ? 'success' : 'default'}
          size="small"
        />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        {client.nombre}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        NIT: {client.nit}
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{client.categoria}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">{client.sedes} sedes</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Build fontSize="small" color="action" />
          <Typography variant="body2">{client.activos} activos</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button size="small" fullWidth variant="outlined">
          Ver Detalle
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Gestión de Clientes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {clients.length} clientes activos
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button startIcon={<Upload />} variant="outlined">
            Importar
          </Button>
          <Button startIcon={<Download />} variant="outlined">
            Exportar
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Nuevo Cliente
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Buscar por nombre, NIT, contacto..."
            variant="outlined"
            size="small"
            fullWidth
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
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Categoría</InputLabel>
            <Select label="Categoría">
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="hotelero">Hotelero</MenuItem>
              <MenuItem value="salud">Salud</MenuItem>
              <MenuItem value="comercial">Comercial</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado">
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
          <Button startIcon={<FilterList />}>
            Más Filtros
          </Button>
        </Box>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 2 }}>
          <Tab label="Todos" />
          <Tab label="Premium" />
          <Tab label="Standard" />
          <Tab label="Nuevos" />
        </Tabs>
      </Paper>

      {viewMode === 'table' ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>NIT</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align="center">Sedes</TableCell>
                <TableCell align="center">Activos</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
                <TableRow key={client.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">{client.nombre}</Typography>
                  </TableCell>
                  <TableCell>{client.nit}</TableCell>
                  <TableCell>
                    <Chip label={client.categoria} size="small" />
                  </TableCell>
                  <TableCell align="center">{client.sedes}</TableCell>
                  <TableCell align="center">{client.activos}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{client.contacto}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {client.telefono}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={client.estado}
                      color={client.estado === 'Activo' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleOpenMenu(e, client)}
                    >
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
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            labelRowsPerPage="Filas por página"
          />
        </TableContainer>
      ) : (
        <Grid container spacing={3}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <ClientCard client={client} />
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleViewClient}>
          <Visibility sx={{ mr: 1 }} /> Ver Detalle
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Delete sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      <ClientDialog />
    </Box>
  );
}

export default ClientsManagement;