import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  PictureAsPdf,
  InsertDriveFile,
  BarChart,
  PieChart,
  Timeline,
  Assignment,
  Build,
  Business,
  CalendarToday,
  Add,
  Visibility,
  Checklist
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../../store/globalStore';
import { mockBitacoras } from '@data/mockData';
import BitacoraGenerator from '@components/BitacoraGenerator';
import ReportViewer from '../../components/reports/ReportViewer';

const Reports = () => {
  const navigate = useNavigate();
  
  // Usar el store global
  const {
    reports: liveReports,
    workOrders,
    clients,
    assets,
    getStatistics
  } = useGlobalStore();
  
  // Filtrar órdenes de trabajo completadas con reportes
  const completedWorkOrders = workOrders?.filter(wo => 
    wo.estado === 'COMPLETADA' && wo.reporteGenerado === true
  ) || [];
  
  // Obtener estadísticas del store global - MOVED INSIDE THE COMPONENT
  const stats = getStatistics();
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');
  const [selectedBitacora, setSelectedBitacora] = useState(null);
  const [bitacoraOpen, setBitacoraOpen] = useState(false);
  const [reportViewerOpen, setReportViewerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportViewerType, setReportViewerType] = useState('report');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewWorkOrder = (workOrder) => {
    setSelectedReport(workOrder);
    setReportViewerType('workOrder');
    setReportViewerOpen(true);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setReportViewerType('report');
    setReportViewerOpen(true);
  };

  const handleCloseReportViewer = () => {
    setReportViewerOpen(false);
    setSelectedReport(null);
  };

  // Datos simulados para los gráficos
  const maintenanceStats = {
    preventive: 24,
    corrective: 12,
    total: 36,
    completionRate: 78,
    avgResponseTime: 4.2,
    avgCompletionTime: 8.5
  };

  const assetStats = {
    total: assets.length,
    operational: assets.filter(a => a.estado === 'Operativo').length,
    underMaintenance: assets.filter(a => a.estado === 'En Mantenimiento').length,
    outOfService: assets.filter(a => a.estado === 'Fuera de Servicio').length,
    criticalAlerts: 3
  };

  // Lista de informes predefinidos
  const predefinedReports = [
    { id: 1, name: 'Resumen de Mantenimiento Mensual', type: 'maintenance', format: 'pdf' },
    { id: 2, name: 'Estado de Activos por Cliente', type: 'assets', format: 'excel' },
    { id: 3, name: 'Análisis de Costos de Mantenimiento', type: 'financial', format: 'pdf' },
    { id: 4, name: 'Historial de Órdenes de Trabajo', type: 'workOrders', format: 'excel' },
    { id: 5, name: 'Rendimiento de Técnicos', type: 'performance', format: 'pdf' },
    { id: 6, name: 'Inventario de Repuestos', type: 'inventory', format: 'excel' }
  ];

  // Filtrar informes según búsqueda y tipo
  const filteredReports = predefinedReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === 'all' || report.type === reportType;
    return matchesSearch && matchesType;
  });

  // Renderizar pestaña de Dashboard
  const renderDashboard = () => (
    <Box>
      <Grid container spacing={3}>
        {/* Tarjetas de resumen */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Mantenimientos</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3">{maintenanceStats.total}</Typography>
                <BarChart sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Preventivos: {maintenanceStats.preventive} | Correctivos: {maintenanceStats.corrective}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tasa de finalización: {maintenanceStats.completionRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Activos</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3">{assetStats.total}</Typography>
                <Build sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Operativos: {assetStats.operational} | En Mantenimiento: {assetStats.underMaintenance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fuera de Servicio: {assetStats.outOfService} | Alertas Críticas: {assetStats.criticalAlerts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Tiempos de Respuesta</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3">{maintenanceStats.avgResponseTime}h</Typography>
                <Timeline sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Tiempo medio de respuesta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tiempo medio de finalización: {maintenanceStats.avgCompletionTime}h
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Gráficos simulados */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Órdenes de Trabajo por Mes</Typography>
            <Box sx={{ width: '100%', height: '200px', bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                [Gráfico de barras simulado - Datos por mes]
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Distribución por Tipo</Typography>
            <Box sx={{ width: '100%', height: '200px', bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                [Gráfico circular simulado - Distribución por tipo]
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Tabla de resumen */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Resumen por Cliente</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cliente</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Activos</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>OTs Totales</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>OTs Pendientes</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Tasa de Finalización</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.slice(0, 5).map((client) => {
                    const clientAssets = assets.filter(a => a.clienteId === client.id).length;
                    const clientWorkOrders = workOrders.filter(wo => wo.clienteId === client.id).length;
                    const pendingWorkOrders = workOrders.filter(wo => wo.clienteId === client.id && wo.estado === 'PLANIFICADA').length;
                    const completionRate = clientWorkOrders > 0 ? 
                      Math.round(((clientWorkOrders - pendingWorkOrders) / clientWorkOrders) * 100) : 0;
                    
                    return (
                      <tr key={client.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '12px 16px' }}>{client.nombre}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>{clientAssets}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>{clientWorkOrders}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>{pendingWorkOrders}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>{completionRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  // Renderizar pestaña de Informes
  const renderReports = () => (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar informes"
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
              <InputLabel id="report-type-label">Tipo de Informe</InputLabel>
              <Select
                labelId="report-type-label"
                value={reportType}
                label="Tipo de Informe"
                onChange={(e) => setReportType(e.target.value)}
                startAdornment={<FilterList sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">Todos los tipos</MenuItem>
                <MenuItem value="maintenance">Mantenimiento</MenuItem>
                <MenuItem value="assets">Activos</MenuItem>
                <MenuItem value="workOrders">Órdenes de Trabajo</MenuItem>
                <MenuItem value="financial">Financiero</MenuItem>
                <MenuItem value="performance">Rendimiento</MenuItem>
                <MenuItem value="inventory">Inventario</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="date-range-label">Periodo</InputLabel>
              <Select
                labelId="date-range-label"
                value={dateRange}
                label="Periodo"
                onChange={(e) => setDateRange(e.target.value)}
                startAdornment={<CalendarToday sx={{ mr: 1 }} />}
              >
                <MenuItem value="week">Última Semana</MenuItem>
                <MenuItem value="month">Último Mes</MenuItem>
                <MenuItem value="quarter">Último Trimestre</MenuItem>
                <MenuItem value="year">Último Año</MenuItem>
                <MenuItem value="custom">Personalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              fullWidth
              onClick={() => navigate('/reports/new')}
            >
              Nuevo Informe
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {filteredReports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {report.format === 'pdf' ? (
                    <PictureAsPdf color="error" sx={{ mr: 1 }} />
                  ) : (
                    <InsertDriveFile color="primary" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h6">{report.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tipo: {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Formato: {report.format.toUpperCase()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Visibility />}
                  onClick={() => alert(`Vista previa de ${report.name}`)}
                >
                  Vista Previa
                </Button>
                <Button 
                  size="small" 
                  startIcon={<Download />}
                  onClick={() => alert(`Descargando ${report.name}`)}
                >
                  Descargar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Informes Generados</Typography>
      <Grid container spacing={2}>
        {liveReports.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Aún no hay informes generados.</Typography>
            </Paper>
          </Grid>
        )}
        {liveReports.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PictureAsPdf color="error" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">{r.id}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">OT: {r.work_order_id}</Typography>
                <Typography variant="body2" color="text.secondary">Cliente: {r.client_name}</Typography>
                <Typography variant="body2" color="text.secondary">Activo: {r.asset_name}</Typography>
                <Typography variant="body2" color="text.secondary">Técnico: {r.technician}</Typography>
                <Typography variant="body2" color="text.secondary">Fecha: {new Date(r.date_generated).toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary">Fotos: {r.photos}</Typography>
                <Typography variant="body2" color="text.secondary">Costo: ${r.total_cost?.toLocaleString() || '0'}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Visibility />} onClick={() => handleViewReport(r)}>Ver</Button>
                <Button size="small" startIcon={<Download />} onClick={() => alert('Descarga simulada del PDF')}>Descargar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredReports.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron informes
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Intenta cambiar los filtros de búsqueda o crea un nuevo informe.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/reports/new')}
          >
            Nuevo Informe
          </Button>
        </Paper>
      )}

      {/* Sección de Órdenes de Trabajo Completadas */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Órdenes de Trabajo Completadas</Typography>
      <Grid container spacing={2}>
        {completedWorkOrders.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">No hay órdenes de trabajo completadas para mostrar.</Typography>
            </Paper>
          </Grid>
        )}
        {completedWorkOrders.map((workOrder) => (
          <Grid item xs={12} sm={6} md={4} key={workOrder.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Assignment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">{workOrder.id}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <strong>Cliente:</strong> {workOrder.cliente}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Activo:</strong> {workOrder.activoNombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Técnico:</strong> {workOrder.tecnicoAsignado}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha:</strong> {new Date(workOrder.fechaFinalizacion).toLocaleDateString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Tipo:</strong> {workOrder.tipo} - {workOrder.subtipo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Tiempo Real:</strong> {workOrder.tiempoReal}h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Costo Total:</strong> ${workOrder.costoTotal?.toLocaleString('es-CO')}
                </Typography>
                {workOrder.checklist && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Checklist:</strong> {workOrder.checklist.items?.filter(item => item.completado).length || 0}/{workOrder.checklist.items?.length || 0} completado
                  </Typography>
                )}
                {workOrder.calificacionServicio && (
                  <Typography variant="body2" color="success.main">
                    <strong>Calificación:</strong> ⭐ {workOrder.calificacionServicio}/5
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Visibility />}
                  onClick={() => handleViewWorkOrder(workOrder)}
                >
                  Ver Reporte
                </Button>
                <Button 
                  size="small" 
                  startIcon={<Download />}
                  onClick={() => alert(`Descargando reporte de ${workOrder.id}`)}
                >
                  Descargar PDF
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Renderizar pestaña de Checklists
  const renderChecklists = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate('/reports/checklist-builder')}
        >
          Nueva Lista de Verificación
        </Button>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Listas de Verificación Disponibles</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <List>
          <ListItem button onClick={() => navigate('/reports/checklist-builder')}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText 
              primary="Mantenimiento Preventivo - Equipos Eléctricos" 
              secondary="15 items - Última actualización: 10/04/2023" 
            />
            <IconButton edge="end">
              <Visibility />
            </IconButton>
          </ListItem>
          
          <ListItem button onClick={() => navigate('/reports/checklist-builder')}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText 
              primary="Inspección de Maquinaria Industrial" 
              secondary="12 items - Última actualización: 22/03/2023" 
            />
            <IconButton edge="end">
              <Visibility />
            </IconButton>
          </ListItem>
          
          <ListItem button onClick={() => navigate('/reports/checklist-builder')}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText 
              primary="Mantenimiento de Vehículos" 
              secondary="18 items - Última actualización: 05/05/2023" 
            />
            <IconButton edge="end">
              <Visibility />
            </IconButton>
          </ListItem>
          
          <ListItem button onClick={() => navigate('/reports/checklist-builder')}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText 
              primary="Inspección de Seguridad" 
              secondary="10 items - Última actualización: 01/05/2023" 
            />
            <IconButton edge="end">
              <Visibility />
            </IconButton>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );

  const renderBitacoras = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Bitácoras de Mantenimiento</Typography>
      <Grid container spacing={2}>
        {mockBitacoras.map((bitacora) => (
          <Grid item xs={12} sm={6} md={4} key={bitacora.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Assignment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">{bitacora.id}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cliente: {bitacora.client_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Activo: {bitacora.asset_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Técnico: {bitacora.technician}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Fecha: {bitacora.date}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tipo: {bitacora.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duración: {bitacora.duration_hours} horas
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Actividades: {bitacora.activities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Fotos: {bitacora.photos}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Visibility />}
                  onClick={() => {
                    setSelectedBitacora(bitacora);
                    setBitacoraOpen(true);
                  }}
                >
                  Ver
                </Button>
                <Button 
                  size="small" 
                  startIcon={<Download />}
                  onClick={() => alert('Descarga simulada de la bitácora')}
                >
                  Descargar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <BitacoraGenerator 
        bitacora={selectedBitacora}
        open={bitacoraOpen}
        onClose={() => {
          setBitacoraOpen(false);
          setSelectedBitacora(null);
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Informes y Análisis</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="report tabs">
          <Tab label="Dashboard" icon={<BarChart />} iconPosition="start" />
          <Tab label="Informes" icon={<PictureAsPdf />} iconPosition="start" />
          <Tab label="Bitácoras" icon={<Assignment />} iconPosition="start" />
          <Tab label="Listas de Verificación" icon={<Checklist />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && renderDashboard()}
      {activeTab === 1 && renderReports()}
      {activeTab === 2 && renderBitacoras()}
      {activeTab === 3 && renderChecklists()}

      {/* ReportViewer Dialog */}
      <ReportViewer
        open={reportViewerOpen}
        onClose={handleCloseReportViewer}
        workOrder={reportViewerType === 'workOrder' ? selectedReport : null}
        report={reportViewerType === 'report' ? selectedReport : null}
      />
    </Box>
  );
};

export default Reports;