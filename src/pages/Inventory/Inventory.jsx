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
  Inventory2,
  Category,
  LocalShipping,
  Warning,
  CheckCircle,
  ArrowDropDown
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Importar datos de ejemplo
import { inventoryData } from '../../data/mockData.jsx';

const Inventory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  
  // Estado para el menú de acciones
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Estado para el diálogo de nuevo ítem
  const [openDialog, setOpenDialog] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: '',
    category: 'repuestos',
    description: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    location: '',
    supplier: ''
  });
  
  // Categorías disponibles
  const categories = [
    { value: 'repuestos', label: 'Repuestos' },
    { value: 'herramientas', label: 'Herramientas' },
    { value: 'consumibles', label: 'Consumibles' },
    { value: 'equipos', label: 'Equipos' },
    { value: 'otros', label: 'Otros' }
  ];
  
  // Filtrar inventario según búsqueda y filtros
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'low' && item.quantity <= item.minQuantity) ||
                         (statusFilter === 'out' && item.quantity === 0) ||
                         (statusFilter === 'available' && item.quantity > item.minQuantity);
    
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
  
  // Manejar clic en menú de acciones
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };
  
  // Cerrar menú de acciones
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };
  
  // Abrir diálogo para nuevo ítem
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  // Cerrar diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  // Manejar cambio en formulario de nuevo ítem
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItemData({
      ...newItemData,
      [name]: value
    });
  };
  
  // Guardar nuevo ítem
  const handleSaveNewItem = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando nuevo ítem:', newItemData);
    setOpenDialog(false);
    // Reiniciar formulario
    setNewItemData({
      name: '',
      category: 'repuestos',
      description: '',
      quantity: 0,
      minQuantity: 0,
      price: 0,
      location: '',
      supplier: ''
    });
  };
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Renderizar estado del ítem
  const renderItemStatus = (item) => {
    if (item.quantity === 0) {
      return <Chip label="Agotado" color="error" size="small" icon={<Warning fontSize="small" />} />;
    } else if (item.quantity <= item.minQuantity) {
      return <Chip label="Bajo Stock" color="warning" size="small" icon={<Warning fontSize="small" />} />;
    } else {
      return <Chip label="Disponible" color="success" size="small" icon={<CheckCircle fontSize="small" />} />;
    }
  };
  
  // Renderizar pestaña de Inventario
  const renderInventoryTab = () => (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de inventario">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Mín.</TableCell>
              <TableCell align="right">Precio Unit.</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.category.charAt(0).toUpperCase() + item.category.slice(1)} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.minQuantity}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{renderItemStatus(item)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, item)}>
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
        count={filteredInventory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Box>
  );
  
  // Renderizar pestaña de Categorías
  const renderCategoriesTab = () => (
    <Grid container spacing={3}>
      {categories.map((category) => {
        const categoryItems = inventoryData.filter(item => item.category === category.value);
        const totalItems = categoryItems.length;
        const lowStockItems = categoryItems.filter(item => item.quantity <= item.minQuantity).length;
        const outOfStockItems = categoryItems.filter(item => item.quantity === 0).length;
        
        return (
          <Grid item xs={12} sm={6} md={4} key={category.value}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Category color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{category.label}</Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total de ítems: {totalItems}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Bajo stock: {lowStockItems}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Agotados: {outOfStockItems}
                </Typography>
                
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setCategoryFilter(category.value);
                    setActiveTab(0);
                  }}
                >
                  Ver ítems
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
  
  // Renderizar pestaña de Proveedores
  const renderSuppliersTab = () => {
    // Obtener lista única de proveedores
    const suppliers = [...new Set(inventoryData.map(item => item.supplier))];
    
    return (
      <Grid container spacing={3}>
        {suppliers.map((supplier) => {
          const supplierItems = inventoryData.filter(item => item.supplier === supplier);
          const totalItems = supplierItems.length;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={supplier}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShipping color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">{supplier}</Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total de ítems: {totalItems}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Última compra: {new Date().toLocaleDateString()}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => alert(`Ver detalles de ${supplier}`)}
                    >
                      Ver detalles
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => alert(`Contactar a ${supplier}`)}
                    >
                      Contactar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gestión de Inventario</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, descripción o código"
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
              <InputLabel id="category-filter-label">Categoría</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Categoría"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="all">Todas</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
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
                <MenuItem value="available">Disponible</MenuItem>
                <MenuItem value="low">Bajo Stock</MenuItem>
                <MenuItem value="out">Agotado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleOpenDialog}
              sx={{ mr: 1 }}
            >
              Nuevo Ítem
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<QrCode />}
              sx={{ mr: 1 }}
              onClick={() => alert('Escanear código QR')}
            >
              Escanear
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<Print />}
              onClick={() => alert('Imprimir inventario')}
            >
              Imprimir
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="inventory tabs">
          <Tab label="Inventario" icon={<Inventory2 />} iconPosition="start" />
          <Tab label="Categorías" icon={<Category />} iconPosition="start" />
          <Tab label="Proveedores" icon={<LocalShipping />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && renderInventoryTab()}
      {activeTab === 1 && renderCategoriesTab()}
      {activeTab === 2 && renderSuppliersTab()}
      
      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          alert(`Editar ${selectedItem?.name}`);
          handleMenuClose();
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Ajustar stock de ${selectedItem?.name}`);
          handleMenuClose();
        }}>
          <ArrowDropDown fontSize="small" sx={{ mr: 1 }} /> Ajustar Stock
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Generar QR para ${selectedItem?.name}`);
          handleMenuClose();
        }}>
          <QrCode fontSize="small" sx={{ mr: 1 }} /> Generar QR
        </MenuItem>
        <MenuItem onClick={() => {
          alert(`Eliminar ${selectedItem?.name}`);
          handleMenuClose();
        }} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
      
      {/* Diálogo para nuevo ítem */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nuevo Ítem</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={newItemData.name}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="new-item-category-label">Categoría</InputLabel>
                <Select
                  labelId="new-item-category-label"
                  name="category"
                  value={newItemData.category}
                  label="Categoría"
                  onChange={handleNewItemChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ubicación"
                name="location"
                value={newItemData.location}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={newItemData.description}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cantidad"
                name="quantity"
                type="number"
                value={newItemData.quantity}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cantidad Mínima"
                name="minQuantity"
                type="number"
                value={newItemData.minQuantity}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Precio Unitario"
                name="price"
                type="number"
                value={newItemData.price}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
                InputProps={{ 
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Proveedor"
                name="supplier"
                value={newItemData.supplier}
                onChange={handleNewItemChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveNewItem} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;