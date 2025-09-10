// src/pages/Assets/AssetsManagement.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Build,
  Business,
  LocationOn,
  Warning
} from '@mui/icons-material';

// Importar datos de ejemplo
import { assetsData } from '../../data/mockData.jsx';

const AssetsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrar activos según los criterios de búsqueda y filtros
  const filteredAssets = assetsData.filter(asset => {
    // Usar las propiedades correctas del objeto asset
    const searchFields = [
      asset.tipo,
      asset.marca,
      asset.modelo,
      asset.serie,
      asset.cliente,
      asset.id
    ].filter(Boolean).map(field => field.toString().toLowerCase());
    
    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || asset.estado === statusFilter;
    const matchesType = typeFilter === 'all' || asset.tipo === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const displayedAssets = filteredAssets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Manejar cambio de página
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Manejar clic en menú de opciones
  const handleMenuClick = (event, assetId) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssetId(assetId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Obtener color de chip según estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Operativo': return 'success';
      case 'En Mantenimiento': return 'warning';
      case 'Fuera de Servicio': return 'error';
      case 'Requiere Atención': return 'warning';
      default: return 'default';
    }
  };

  // Obtener color de criticidad
  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case 'Alta': return 'error';
      case 'Media': return 'warning';
      case 'Baja': return 'info';
      default: return 'default';
    }
  };

  // Obtener tipos únicos de los datos
  const uniqueTypes = [...new Set(assetsData.map(asset => asset.tipo))];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Gestión de Activos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/assets/new')}
        >
          Nuevo Activo
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por tipo, marca, modelo, serie o cliente"
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Estado"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Todos los estados</MenuItem>
                <MenuItem value="Operativo">Operativo</MenuItem>
                <MenuItem value="En Mantenimiento">En Mantenimiento</MenuItem>
                <MenuItem value="Fuera de Servicio">Fuera de Servicio</MenuItem>
                <MenuItem value="Requiere Atención">Requiere Atención</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label">Tipo</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                label="Tipo"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">Todos los tipos</MenuItem>
                {uniqueTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="text.secondary">
              {filteredAssets.length} activos encontrados
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {displayedAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {asset.tipo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {asset.id}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuClick(e, asset.id)}
                    aria-label="opciones"
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip 
                    label={asset.estado} 
                    color={getStatusColor(asset.estado)} 
                    size="small" 
                  />
                  <Chip 
                    label={`Criticidad: ${asset.criticidad}`} 
                    color={getCriticalityColor(asset.criticidad)} 
                    size="small"
                    variant="outlined"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Build fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {asset.marca} - {asset.modelo}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Serie: {asset.serie}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {asset.cliente}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {asset.ubicacion}
                  </Typography>
                </Box>

                <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 1, mt: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Último Mtto:
                    </Typography>
                    <Typography variant="caption">
                      {new Date(asset.ultimoMtto).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Próximo Mtto:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {new Date(asset.proximoMtto) < new Date() && (
                        <Warning fontSize="small" color="error" />
                      )}
                      <Typography 
                        variant="caption" 
                        color={new Date(asset.proximoMtto) < new Date() ? 'error' : 'text.primary'}
                      >
                        {new Date(asset.proximoMtto).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/assets/${asset.id}`)}
                >
                  Ver Detalles
                </Button>
                <Button 
                  size="small"
                  onClick={() => navigate(`/work-orders/new?assetId=${asset.id}`)}
                >
                  Nueva OT
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredAssets.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron activos
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Intenta cambiar los filtros de búsqueda o agrega un nuevo activo.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/assets/new')}
          >
            Nuevo Activo
          </Button>
        </Paper>
      )}
      
      {filteredAssets.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          navigate(`/assets/${selectedAssetId}`);
          handleMenuClose();
        }}>
          Ver Detalles
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/assets/${selectedAssetId}/edit`);
          handleMenuClose();
        }}>
          Editar
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/work-orders/new?assetId=${selectedAssetId}`);
          handleMenuClose();
        }}>
          Crear Orden de Trabajo
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/assets/${selectedAssetId}/maintenance-history`);
          handleMenuClose();
        }}>
          Historial de Mantenimiento
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AssetsManagement;