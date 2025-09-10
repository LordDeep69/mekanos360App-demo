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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  MoreVert,
  Assignment,
  CalendarToday,
  People,
  BarChart,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Visibility
} from '@mui/icons-material';

// Datos de ejemplo para proyectos
const projectsData = [
  {
    id: 1,
    code: 'PRJ-001',
    name: 'Implementación Sistema CMMS',
    client: 'Industrias XYZ',
    startDate: '2023-01-15',
    endDate: '2023-06-30',
    status: 'En Progreso',
    progress: 65,
    manager: 'Carlos Rodríguez',
    budget: 120000,
    spent: 78000,
    team: ['Ana Martínez', 'Juan Pérez', 'Laura Gómez', 'Roberto Sánchez'],
    description: 'Implementación de sistema de gestión de mantenimiento computarizado para la planta principal.'
  },
  {
    id: 2,
    code: 'PRJ-002',
    name: 'Actualización Infraestructura TI',
    client: 'Servicios ABC',
    startDate: '2023-03-10',
    endDate: '2023-08-15',
    status: 'En Progreso',
    progress: 40,
    manager: 'María López',
    budget: 85000,
    spent: 34000,
    team: ['Javier Ruiz', 'Patricia Vega', 'Miguel Torres'],
    description: 'Actualización de servidores y sistemas de red para mejorar rendimiento y seguridad.'
  },
  {
    id: 3,
    code: 'PRJ-003',
    name: 'Mantenimiento Preventivo Anual',
    client: 'Manufactura Global',
    startDate: '2023-02-20',
    endDate: '2023-04-20',
    status: 'Completado',
    progress: 100,
    manager: 'Roberto Sánchez',
    budget: 45000,
    spent: 42000,
    team: ['Carlos Méndez', 'Ana Martínez', 'Laura Gómez'],
    description: 'Programa de mantenimiento preventivo anual para equipos de producción.'
  },
  {
    id: 4,
    code: 'PRJ-004',
    name: 'Instalación Línea Producción',
    client: 'Alimentos Frescos S.A.',
    startDate: '2023-05-05',
    endDate: '2023-11-30',
    status: 'En Progreso',
    progress: 25,
    manager: 'Javier Ruiz',
    budget: 230000,
    spent: 57500,
    team: ['Miguel Torres', 'Patricia Vega', 'Juan Pérez', 'Carlos Méndez', 'Laura Gómez'],
    description: 'Instalación y puesta en marcha de nueva línea de producción automatizada.'
  },
  {
    id: 5,
    code: 'PRJ-005',
    name: 'Auditoría Energética',
    client: 'Textiles Modernos',
    startDate: '2023-04-15',
    endDate: '2023-05-30',
    status: 'Retrasado',
    progress: 70,
    manager: 'Ana Martínez',
    budget: 35000,
    spent: 28000,
    team: ['Roberto Sánchez', 'Carlos Rodríguez'],
    description: 'Auditoría completa de consumo energético y propuesta de mejoras para eficiencia.'
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  
  // Filtrar proyectos según búsqueda y filtros
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
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
  
  // Manejar cambio de pestaña
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Renderizar estado del proyecto
  const renderProjectStatus = (status) => {
    let color = 'default';
    let icon = null;
    
    switch(status) {
      case 'En Progreso':
        color = 'primary';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'Completado':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'Retrasado':
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
  
  // Renderizar pestaña de Proyectos
  const renderProjectsTab = () => (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de proyectos">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fechas</TableCell>
              <TableCell>Progreso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow key={project.id} hover>
                  <TableCell>{project.code}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{project.name}</Typography>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={project.progress} />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${project.progress}%`}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{renderProjectStatus(project.status)}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
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
        count={filteredProjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Box>
  );
  
  // Renderizar pestaña de Tablero
  const renderDashboardTab = () => (
    <Box>
      <Grid container spacing={3}>
        {/* Tarjetas de resumen */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Total Proyectos</Typography>
              <Typography variant="h4">{projectsData.length}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Activos: {projectsData.filter(p => p.status !== 'Completado' && p.status !== 'Cancelado').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>En Progreso</Typography>
              <Typography variant="h4">{projectsData.filter(p => p.status === 'En Progreso').length}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((projectsData.filter(p => p.status === 'En Progreso').length / projectsData.length) * 100)}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Completados</Typography>
              <Typography variant="h4">{projectsData.filter(p => p.status === 'Completado').length}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((projectsData.filter(p => p.status === 'Completado').length / projectsData.length) * 100)}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Retrasados</Typography>
              <Typography variant="h4">{projectsData.filter(p => p.status === 'Retrasado').length}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((projectsData.filter(p => p.status === 'Retrasado').length / projectsData.length) * 100)}% del total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Proyectos recientes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Proyectos Recientes</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              {projectsData
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                .slice(0, 3)
                .map(project => (
                  <Grid item xs={12} md={4} key={project.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Cliente: {project.client}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Responsable: {project.manager}
                        </Typography>
                        <Box sx={{ mt: 2, mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Progreso: {project.progress}%
                          </Typography>
                          <LinearProgress variant="determinate" value={project.progress} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          {renderProjectStatus(project.status)}
                          <Button size="small">Ver detalles</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Gestión de Proyectos</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, código o cliente"
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
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
              <option value="Retrasado">Retrasado</option>
              <option value="Cancelado">Cancelado</option>
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              sx={{ mr: 1 }}
            >
              Nuevo Proyecto
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<FilterList />}
            >
              Filtros
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="project tabs">
          <Tab label="Proyectos" icon={<Assignment />} iconPosition="start" />
          <Tab label="Tablero" icon={<BarChart />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && renderProjectsTab()}
      {activeTab === 1 && renderDashboardTab()}
    </Box>
  );
};

export default Projects;