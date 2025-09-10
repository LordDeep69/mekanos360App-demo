
// src/pages/Mobile/MobileApp.jsx
import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Badge,
  Card,
  CardContent,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Divider,
  Grid,
  MenuItem,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Home,
  Assignment,
  CameraAlt,
  Phone,
  Menu,
  Notifications,
  LocationOn,
  CheckCircle,
  RadioButtonChecked,
  NavigateNext,
  NavigateBefore,
  Timer,
  QrCodeScanner,
  PlayArrow,
  Pause,
  Stop,
  Navigation,
  Warning,
  AttachFile,
  Mic,
  Send,
  Computer,
  Add,
  DesktopWindows,
  Star as StarIcon,
  Download,
  VideoCall,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import useGlobalStore from '../../store/globalStore';

function MobileApp() {
  const navigate = useNavigate();
  const setIsMobileView = useGlobalStore(state => state.setIsMobileView);

  // Usar el store global
  const {
    workOrders,
    employees,
    mobileState,
    setCurrentTechnician,
    startWorkOrder,
    updateChecklistItem,
    completeWorkOrder,
    addReport,
    updateWorkOrder
  } = useGlobalStore();

  const [bottomNav, setBottomNav] = useState(0);
  const [currentView, setCurrentView] = useState('home');
  const [selectedOT, setSelectedOT] = useState(null);
  const [checkInDialog, setCheckInDialog] = useState(false);
  const [executingOT, setExecutingOT] = useState(false);
  const [checklistStep, setChecklistStep] = useState(0);
  const [checklistData, setChecklistData] = useState([]);
  const [photosTaken, setPhotosTaken] = useState(0);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [clientSignature, setClientSignature] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [viewMode, setViewMode] = useState('pending'); // 'pending' o 'completed'
  const sigRef = useRef(null);

  // Usar fecha actual real o fecha de las OTs existentes
  const today = '2025-01-21'; // Fecha que coincide con tus OTs mock
  // const today = new Date().toISOString().split('T')[0]; // Para usar fecha actual real
  
  const currentTechnician = mobileState.currentTechnician || 'Juan Carlos Pérez';

  // Separar OTs pendientes y completadas
  const pendingOTs = workOrders
    .filter(ot => {
      const isPending = ['PLANIFICADA', 'ASIGNADA', 'EN RUTA', 'EJECUTANDO'].includes(ot.estado);
      const isAssignedToMe = ot.tecnicoAsignado === currentTechnician || !ot.tecnicoAsignado;
      return isPending && isAssignedToMe;
    })
    .map(ot => ({
      id: ot.id,
      time: ot.horaProgramada || new Date(ot.fechaProgramada).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      status: ot.estado,
      client: ot.cliente,
      address: ot.ubicacionTrabajo || 'Sin dirección',
      type: ot.tipo,
      distance: '2.3 km',
      eta: '8 min',
      priority: ot.prioridad?.toLowerCase() || 'normal',
      asset: ot.activoNombre,
      materials: ot.materiales || [],
      checklist: ot.checklist?.items || [],
      fullWorkOrder: ot,
      fechaProgramada: ot.fechaProgramada
    }));

  const completedOTs = workOrders
    .filter(ot => {
      const isCompleted = ot.estado === 'COMPLETADA';
      const isMyWork = ot.tecnicoAsignado === currentTechnician;
      return isCompleted && isMyWork;
    })
    .map(ot => ({
      id: ot.id,
      time: ot.horaProgramada || new Date(ot.fechaProgramada).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      status: ot.estado,
      client: ot.cliente,
      address: ot.ubicacionTrabajo || 'Sin dirección',
      type: ot.tipo,
      priority: ot.prioridad?.toLowerCase() || 'normal',
      asset: ot.activoNombre,
      fullWorkOrder: ot,
      fechaFinalizacion: ot.fechaFinalizacion,
      fechaProgramada: ot.fechaProgramada,
      tiempoReal: ot.tiempoReal,
      calificacionServicio: ot.calificacionServicio,
      reporteGenerado: ot.reporteGenerado
    }));

  // Establecer el técnico actual al montar el componente
  useEffect(() => {
    if (!mobileState.currentTechnician) {
      setCurrentTechnician('Juan Carlos Pérez');
    }
  }, [mobileState.currentTechnician, setCurrentTechnician]);

  const checklistItems = [
    { id: 1, label: 'Inspección visual del equipo', type: 'boolean' },
    { id: 2, label: 'Nivel de aceite (L)', type: 'number', min: 0, max: 20 },
    { id: 3, label: 'Cambio de filtros', type: 'boolean' },
    { id: 4, label: 'Temperatura motor (°C)', type: 'number', min: 0, max: 150, alertIfAbove: 95 },
    { id: 5, label: 'Limpieza general', type: 'boolean' },
    { id: 6, label: 'Conexiones eléctricas (OK?)', type: 'select', options: ['OK', 'Atención', 'Crítico'] },
    { id: 7, label: 'Horómetro (hrs)', type: 'number', min: 0, max: 99999 },
    { id: 8, label: 'Evidencias fotográficas', type: 'photos', minPhotos: 3 },
  ];

  const ensureChecklistData = () => {
    if (checklistData.length === 0) {
      setChecklistData(checklistItems.map(item => ({
        id: item.id,
        value: item.type === 'boolean' ? null : '',
        status: 'pending'
      })));
    }
  };

  // Vista principal actualizada
  const MobileHome = () => (
    <Box sx={{ pb: 7, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MEKANOS TECH
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={pendingOTs.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar sx={{ ml: 1, width: 32, height: 32 }}>
            {currentTechnician.split(' ').map(n => n[0]).join('')}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, p: 2 }}>
        <Card sx={{ mb: 2, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Typography variant="h6">¡Hola, {currentTechnician}!</Typography>
            <Typography variant="body2">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Chip
                label={`${pendingOTs.length} OTs Pendientes`}
                sx={{ bgcolor: 'white', color: 'primary.main' }}
                icon={<Assignment />}
              />
              <Chip
                label={`${completedOTs.length} Completadas`}
                sx={{ bgcolor: 'white', color: 'success.main' }}
                icon={<CheckCircle />}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Tabs para cambiar entre OTs pendientes y completadas */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={viewMode} onChange={(e, newValue) => setViewMode(newValue)}>
            <Tab label={`Pendientes (${pendingOTs.length})`} value="pending" />
            <Tab label={`Completadas (${completedOTs.length})`} value="completed" />
          </Tabs>
        </Box>

        {/* Vista de OTs Pendientes */}
        {viewMode === 'pending' && (
          <>
            <Typography variant="h6" gutterBottom>
              Órdenes de Trabajo Pendientes
            </Typography>
            
            {pendingOTs.length === 0 ? (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" align="center">
                    No hay órdenes de trabajo pendientes
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              pendingOTs.map((ot) => (
                <Card 
                  key={ot.id} 
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' }
                  }} 
                  onClick={() => setSelectedOT(ot)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={new Date(ot.fechaProgramada).toLocaleDateString('es-ES')} 
                          size="small" 
                          color="primary"
                          variant="outlined"
                        />
                        <Chip 
                          label={ot.time} 
                          size="small" 
                          color="primary"
                        />
                        <Chip 
                          label={ot.status} 
                          size="small"
                          color={
                            ot.status === 'ASIGNADA' ? 'primary' :
                            ot.status === 'EN RUTA' ? 'warning' :
                            ot.status === 'EJECUTANDO' ? 'info' : 'default'
                          }
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {ot.id}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold">
                      {ot.client}
                    </Typography>
                    <Typography variant="body2" color="primary" gutterBottom>
                      {ot.asset}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {ot.address}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      {ot.status === 'EJECUTANDO' ? (
                        <Button
                          variant="contained"
                          fullWidth
                          color="warning"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOT(ot);
                            setCurrentView('execution');
                            setExecutingOT(true);
                          }}
                        >
                          CONTINUAR
                        </Button>
                      ) : ot.status === 'EN RUTA' ? (
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<LocationOn />}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCheckInDialog(true);
                          }}
                        >
                          CHECK-IN
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<Navigation />}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateWorkOrder(ot.id, { estado: 'EN RUTA' });
                            }}
                          >
                            EN RUTA
                          </Button>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOT(ot);
                              setCurrentView('execution');
                              setExecutingOT(true);
                              startWorkOrder(ot.id);
                            }}
                          >
                            INICIAR
                          </Button>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}

        {/* Vista de OTs Completadas */}
        {viewMode === 'completed' && (
          <>
            <Typography variant="h6" gutterBottom>
              Órdenes de Trabajo Completadas
            </Typography>
            
            {completedOTs.length === 0 ? (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" align="center">
                    No hay órdenes de trabajo completadas
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              completedOTs.map((ot) => (
                <Card 
                  key={ot.id} 
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    bgcolor: 'success.light',
                    '&:hover': { bgcolor: 'success.main', color: 'white' }
                  }} 
                  onClick={() => {
                    setSelectedOT(ot);
                    setCurrentView('reportView');
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle color="success" />
                        <Chip 
                          label={new Date(ot.fechaFinalizacion || ot.fechaProgramada).toLocaleDateString('es-ES')} 
                          size="small" 
                          color="success"
                        />
                        {ot.calificacionServicio && (
                          <Chip 
                            label={`⭐ ${ot.calificacionServicio}/5`} 
                            size="small" 
                            color="warning"
                          />
                        )}
                      </Box>
                      <Typography variant="caption">
                        {ot.id}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold">
                      {ot.client}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {ot.asset} - {ot.type}
                    </Typography>
                    
                    {ot.tiempoReal && (
                      <Typography variant="caption" color="text.secondary">
                        Duración: {ot.tiempoReal}h
                      </Typography>
                    )}

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Assignment />}
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOT(ot);
                          setCurrentView('reportView');
                        }}
                      >
                        VER REPORTE
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}

        {/* Botones flotantes */}
        <Box sx={{ position: 'fixed', bottom: 70, right: 16 }}>
          <Fab color="error" size="small" sx={{ mb: 1 }}>
            <Warning />
          </Fab>
          <br />
          <Fab color="primary">
            <Phone />
          </Fab>
        </Box>
      </Box>
    </Box>
  );

  // Nueva vista para mostrar el resumen del reporte
  const ReportView = () => {
    if (!selectedOT) return null;

    const ot = selectedOT.fullWorkOrder;
    
    return (
      <Box sx={{ pb: 7, minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ bgcolor: 'success.main' }}>
          <Toolbar>
            <IconButton 
              edge="start" 
              color="inherit" 
              onClick={() => {
                setCurrentView('home');
                setSelectedOT(null);
              }}
            >
              <NavigateBefore />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Reporte {ot.id}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 8, p: 2 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                {ot.cliente}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {ot.activoNombre}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Tipo de Trabajo
                  </Typography>
                  <Typography variant="body1">
                    {ot.tipo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip label="COMPLETADA" color="success" size="small" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Fecha Realización
                  </Typography>
                  <Typography variant="body1">
                    {new Date(ot.fechaFinalizacion || ot.fechaProgramada).toLocaleDateString('es-ES')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Duración
                  </Typography>
                  <Typography variant="body1">
                    {ot.tiempoReal || ot.tiempoEstimado}h
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Checklist completado */}
          {ot.checklist && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Checklist Completado
                </Typography>
                <List dense>
                  {ot.checklist.items?.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {item.completado ? (
                          <CheckCircle color="success" />
                        ) : (
                          <RadioButtonChecked color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.descripcion}
                        secondary={item.observaciones}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Materiales utilizados */}
          {ot.materiales && ot.materiales.length > 0 && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Materiales Utilizados
                </Typography>
                <List dense>
                  {ot.materiales.map((material, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={material.nombre}
                        secondary={`Cantidad: ${material.cantidadUsada || material.cantidadPlaneada}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Observaciones */}
          {ot.observaciones && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Observaciones
                </Typography>
                <Typography variant="body2">
                  {ot.observaciones}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Evidencias */}
          {ot.multimedia && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Evidencias
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {ot.multimedia.fotos?.length > 0 && (
                    <Chip
                      icon={<CameraAlt />}
                      label={`${ot.multimedia.fotos.length} Fotos`}
                      color="primary"
                    />
                  )}
                  {ot.multimedia.videos?.length > 0 && (
                    <Chip
                      icon={<VideoCall />}
                      label={`${ot.multimedia.videos.length} Videos`}
                      color="primary"
                    />
                  )}
                  {ot.multimedia.audios?.length > 0 && (
                    <Chip
                      icon={<Mic />}
                      label={`${ot.multimedia.audios.length} Audios`}
                      color="primary"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Calificación del servicio */}
          {ot.calificacionServicio && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calificación del Cliente
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < ot.calificacionServicio ? 'warning' : 'disabled'}
                    />
                  ))}
                  <Typography variant="h6" color="warning.main">
                    {ot.calificacionServicio}/5
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Firma del cliente */}
          {ot.firmaCliente && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Firma del Cliente
                </Typography>
                <Box sx={{ 
                  border: '1px solid #ccc', 
                  borderRadius: 1, 
                  p: 2, 
                  bgcolor: 'grey.50' 
                }}>
                  {typeof ot.firmaCliente === 'string' && ot.firmaCliente.startsWith('data:') ? (
                    <img 
                      src={ot.firmaCliente} 
                      alt="Firma del cliente" 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  ) : (
                    <Typography variant="body2" align="center" color="text.secondary">
                      Firmado digitalmente
                    </Typography>
                  )}
                  {ot.nombreFirmaCliente && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Por: {ot.nombreFirmaCliente}
                    </Typography>
                  )}
                  {ot.fechaFirma && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(ot.fechaFirma).toLocaleString('es-ES')}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setCurrentView('home');
                setSelectedOT(null);
              }}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Download />}
              onClick={() => {
                // Aquí puedes implementar la descarga del PDF
                alert('Descargando reporte en PDF...');
              }}
            >
              Descargar PDF
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  // Resumen por cliente/OT del día
  const SummaryView = () => {
    const grouped = pendingOTs.reduce((acc, ot) => {
      acc[ot.client] = acc[ot.client] || { count: 0, ots: [] };
      acc[ot.client].count += 1;
      acc[ot.client].ots.push(ot);
      return acc;
    }, {});
    const entries = Object.entries(grouped);

    return (
      <Box sx={{ pb: 7, minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Resumen de Hoy</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8, p: 2 }}>
          {entries.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="body1" color="text.secondary" align="center">
                  No hay órdenes de trabajo para hoy
                </Typography>
              </CardContent>
            </Card>
          ) : (
            entries.map(([client, data]) => (
              <Card key={client} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{client}</Typography>
                    <Chip label={`${data.count} OTs`} color="primary" size="small" />
                  </Box>
                  <List dense>
                    {data.ots.map(ot => (
                      <ListItem key={ot.id} sx={{ px: 0 }}>
                        <ListItemText 
                          primary={`${ot.id} - ${ot.type}`} 
                          secondary={`${ot.time} • ${ot.address}`} 
                        />
                        <Chip 
                          label={ot.status} 
                          size="small" 
                          color={ot.status === 'EN RUTA' ? 'warning' : 'default'} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    );
  };

  // Vista de resumen de checklist completado
  const ChecklistSummaryView = () => {
    const completedItems = checklistData.filter(item => item.status === 'ok' || item.status === 'observation');
    const observations = checklistData.filter(item => item.status === 'observation');

    return (
      <Box sx={{ pb: 7 }}>
        <AppBar position="fixed" sx={{ bgcolor: 'success.main' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Checklist Completado</Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 8, p: 2 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Checklist completado exitosamente
          </Alert>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Resumen de Actividades</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {completedItems.length} de {checklistItems.length} actividades completadas
              </Typography>
              
              <List dense>
                {checklistData.map((item, index) => {
                  const checklistItem = checklistItems.find(ci => ci.id === item.id);
                  return (
                    <ListItem key={item.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {item.status === 'ok' ? (
                          <CheckCircle color="success" />
                        ) : item.status === 'observation' ? (
                          <Warning color="warning" />
                        ) : (
                          <RadioButtonChecked color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={checklistItem?.label || `Tarea ${item.id}`}
                        secondary={item.value ? `Valor: ${item.value}` : ''}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Evidencias Capturadas</Typography>
              <Typography variant="body2">📷 Fotografías: {photosTaken}</Typography>
              <Typography variant="body2">✍️ Firma: {clientSignature ? 'Capturada' : 'No capturada'}</Typography>
            </CardContent>
          </Card>

          {observations.length > 0 && (
            <Card sx={{ mb: 2, bgcolor: 'warning.50' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="warning.main">
                  ⚠️ Observaciones
                </Typography>
                {observations.map((item, index) => {
                  const checklistItem = checklistItems.find(ci => ci.id === item.id);
                  return (
                    <Typography key={index} variant="body2" color="warning.dark">
                      • {checklistItem?.label}: Requiere atención
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setCurrentView('home');
                setChecklistData([]);
                setPhotosTaken(0);
                setClientSignature(null);
                setChecklistStep(0);
                setShowSummary(false);
                setViewMode('completed');
              }}
            >
              Volver al Inicio
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/reports')}
            >
              Ver Reportes
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  // Vista de historial de órdenes completadas
  const HistoryView = () => {
    const completedOrders = workOrders.filter(ot =>
      ot.estado === 'COMPLETADA' &&
      ot.tecnicoAsignado === currentTechnician
    );

    return (
      <Box sx={{ pb: 7, minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ bgcolor: 'success.main' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Historial de Trabajos
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ mt: 8, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Órdenes Completadas ({completedOrders.length})
          </Typography>

          {completedOrders.length === 0 ? (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1" color="text.secondary" align="center">
                  No hay órdenes completadas aún
                </Typography>
              </CardContent>
            </Card>
          ) : (
            completedOrders.slice(0).reverse().map((ot) => (
              <Card 
                key={ot.id} 
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }} 
                onClick={() => setSelectedOT({
                  ...ot,
                  time: ot.horaProgramada || '08:00',
                  status: ot.estado,
                  client: ot.cliente,
                  address: ot.ubicacionTrabajo || 'Sin dirección',
                  type: ot.tipo,
                  distance: '2.3 km',
                  eta: '8 min',
                  priority: ot.prioridad?.toLowerCase() || 'normal',
                  asset: ot.activoNombre,
                  materials: ot.materiales || [],
                  checklist: ot.checklist?.items || [],
                  fullWorkOrder: ot,
                })}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={new Date(ot.fechaFinalizacion).toLocaleDateString('es-ES')} 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                      <Chip 
                        label="COMPLETADA" 
                        size="small"
                        color="success"
                      />
                      {ot.reporteGenerado && (
                        <Chip 
                          label="CON REPORTE" 
                          size="small"
                          color="info"
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {ot.cliente}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {ot.activoNombre} - {ot.tipo}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {ot.ubicacionTrabajo}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Timer fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Tiempo: {ot.tiempoReal || ot.tiempoEstimado}h
                    </Typography>
                    {ot.calificacionServicio && (
                      <>
                        <StarIcon fontSize="small" color="warning" />
                        <Typography variant="body2" color="text.secondary">
                          {ot.calificacionServicio}/5
                        </Typography>
                      </>
                    )}
                  </Box>

                  {ot.multimedia?.fotos?.length > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <CameraAlt fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {ot.multimedia.fotos.length} fotos tomadas
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    );
  };

  // Vista de ejecución de OT
  const ExecutionView = () => (
    <Box sx={{ pb: 7 }}>
      <AppBar position="fixed" sx={{ bgcolor: 'success.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {selectedOT?.id || 'OT'} EN PROCESO
          </Typography>
          <Typography variant="body2">
            ⏱ 00:45:23
          </Typography>
        </Toolbar>
        <LinearProgress variant="determinate" value={35} />
      </AppBar>

      <Box sx={{ mt: 9, p: 2 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Check-in validado - Ubicación confirmada
        </Alert>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Checklist de Mantenimiento</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Progreso: {checklistStep + 1} de {checklistItems.length}
            </Typography>

            <Stepper activeStep={checklistStep} orientation="vertical">
              {checklistItems.map((item, index) => (
                <Step key={item.id}>
                  <StepLabel>
                    <Box>
                      <Typography variant="subtitle2">{item.label}</Typography>
                      {index === checklistStep && (
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {item.type === 'boolean' && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button 
                                variant="contained" 
                                size="small" 
                                onClick={() => { 
                                  ensureChecklistData(); 
                                  setChecklistData(prev => prev.map(r => r.id===item.id?{...r, value:true, status:'ok'}:r)); 
                                  setChecklistStep(checklistStep + 1); 
                                }}
                              >
                                ✓ OK
                              </Button>
                              <Button 
                                variant="outlined" 
                                size="small" 
                                color="warning" 
                                onClick={() => { 
                                  ensureChecklistData(); 
                                  setChecklistData(prev => prev.map(r => r.id===item.id?{...r, value:false, status:'observation'}:r)); 
                                  setChecklistStep(checklistStep + 1); 
                                }}
                              >
                                ⚠ Con observación
                              </Button>
                            </Box>
                          )}
                          {item.type === 'number' && (
                            <TextField 
                              type="number" 
                              size="small"
                              inputProps={{ min: item.min, max: item.max }} 
                              onChange={(e) => { 
                                const v = Number(e.target.value); 
                                ensureChecklistData(); 
                                setChecklistData(prev => prev.map(r => r.id===item.id?{...r, value:v, status: item.alertIfAbove && v>item.alertIfAbove ? 'alert':'ok'}:r)); 
                              }} 
                              placeholder={`Ingrese valor (${item.min}-${item.max})`}
                              value={checklistData.find(r => r.id === item.id)?.value || ''}
                            />
                          )}
                          {item.type === 'select' && (
                            <TextField 
                              select 
                              size="small"
                              value={checklistData.find(r => r.id === item.id)?.value || ''}
                              onChange={(e) => { 
                                const v=e.target.value; 
                                ensureChecklistData(); 
                                setChecklistData(prev => prev.map(r => r.id===item.id?{...r, value:v, status: v==='OK'?'ok':'observation'}:r)); 
                              }}
                            >
                              <MenuItem value=""><em>Seleccionar...</em></MenuItem>
                              {item.options.map(opt => (<MenuItem key={opt} value={opt}>{opt}</MenuItem>))}
                            </TextField>
                          )}
                          {item.type === 'photos' && (
                            <Box>
                              <Button variant="outlined" startIcon={<CameraAlt />} component="label">
                                Subir fotos
                                <input 
                                  hidden 
                                  type="file" 
                                  multiple 
                                  accept="image/*" 
                                  onChange={(e)=>{ 
                                    const count = e.target.files?.length || 0; 
                                    setPhotosTaken(prev=>prev+count); 
                                  }} 
                                />
                              </Button>
                              <Typography variant="caption" sx={{ ml: 1 }}>
                                Fotos: {photosTaken}/{item.minPhotos}
                              </Typography>
                            </Box>
                          )}
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button 
                              variant="contained" 
                              size="small" 
                              onClick={() => setChecklistStep(Math.min(checklistStep + 1, checklistItems.length - 1))}
                            >
                              Siguiente
                            </Button>
                            {checklistStep > 0 && (
                              <Button 
                                variant="text" 
                                size="small" 
                                onClick={() => setChecklistStep(checklistStep - 1)}
                              >
                                Anterior
                              </Button>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth startIcon={<CameraAlt />} component="label">
              Foto ({photosTaken}/3)
              <input 
                hidden 
                type="file" 
                accept="image/*" 
                onChange={(e)=>{ 
                  const count = e.target.files?.length?1:0; 
                  setPhotosTaken(prev=>prev+count); 
                }} 
              />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<QrCodeScanner />}
            >
              Escanear
            </Button>
          </Grid>
        </Grid>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Materiales Consumidos
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="FIL-001 Filtro aceite" secondary="Cantidad: 2" />
                <CheckCircle color="success" />
              </ListItem>
              <ListItem>
                <ListItemText primary="ACE-001 Aceite 15W40" secondary="Cantidad: 8L" />
                <CheckCircle color="success" />
              </ListItem>
            </List>
            <Button size="small" startIcon={<Add />}>
              Agregar material
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>Firma del Cliente</Typography>
            {clientSignature ? (
              <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                <img src={clientSignature} alt="Firma" style={{ height: 48 }} />
                <Button size="small" onClick={() => setClientSignature(null)}>Borrar</Button>
              </Box>
            ) : (
              <Button variant="outlined" onClick={() => setSignatureOpen(true)}>Capturar firma</Button>
            )}
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="warning"
            startIcon={<Pause />}
          >
            PAUSAR
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            startIcon={<Stop />}
            disabled={photosTaken < 3 || !clientSignature}
            onClick={() => {
              // Actualizar checklist en el store global
              const currentWorkOrder = workOrders.find(wo => wo.id === selectedOT?.id);
              if (currentWorkOrder && currentWorkOrder.checklist) {
                currentWorkOrder.checklist.items.forEach((item, index) => {
                  const checklistItem = checklistData.find(cd => cd.id === item.id);
                  if (checklistItem) {
                    updateChecklistItem(selectedOT.id, item.id, {
                      completado: true,
                      estado: checklistItem.status === 'ok' ? 'OK' : 'OBSERVACION',
                      valor: checklistItem.value,
                      observaciones: checklistItem.status === 'observation' ? 'Requiere atención' : 'Completado',
                      fechaCompletado: new Date().toISOString()
                    });
                  }
                });
              }

              // Completar la orden de trabajo
              const completionData = {
                tiempoReal: 2.5,
                observaciones: 'Mantenimiento completado según checklist',
                multimedia: {
                  fotos: Array.from({length: photosTaken}, (_, i) => ({
                    id: `foto-${i + 1}`,
                    nombre: `evidencia_${i + 1}.jpg`,
                    url: `/uploads/ot-${selectedOT?.id}/foto_${i + 1}.jpg`,
                    fecha: new Date().toISOString()
                  })),
                  videos: [],
                  audios: [],
                  documentos: []
                },
                firmaCliente: clientSignature,
                nombreFirmaCliente: 'Cliente',
                fechaFirma: new Date().toISOString(),
                resumenEjecutivo: 'Mantenimiento completado exitosamente según protocolo.',
                recomendaciones: ['Continuar con programa de mantenimiento preventivo'],
                proximoMantenimiento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                calificacionServicio: 5
              };

              completeWorkOrder(selectedOT?.id, completionData);
              
              setShowSummary(true);
              setCurrentView('summary');
            }}
          >
            FINALIZAR
          </Button>
        </Box>
      </Box>
    </Box>
  );

  // Dialog de Check-in
  const CheckInDialog = () => (
    <Dialog open={checkInDialog} onClose={() => setCheckInDialog(false)} fullWidth>
      <DialogTitle>Check-In en Sitio</DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{ mb: 2 }}>
          Validando ubicación GPS...
        </Alert>

        <Box sx={{ textAlign: 'center', my: 3 }}>
          <LocationOn sx={{ fontSize: 60, color: 'success.main' }} />
          <Typography variant="body1" gutterBottom>
            Hotel Caribe - Sede Principal
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Cra 1 #5-87, Bocagrande
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Observaciones de llegada"
          placeholder="Condiciones del sitio, acceso, etc."
          sx={{ mb: 2 }}
        />

        <Button
          variant="outlined"
          fullWidth
          startIcon={<CameraAlt />}
          sx={{ mb: 2 }}
        >
          Tomar foto de llegada
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCheckInDialog(false)}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={() => {
            setCheckInDialog(false);
            setExecutingOT(true);
            setCurrentView('execution');
          }}
        >
          Confirmar Check-In
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{
      maxWidth: 420,
      mx: 'auto',
      height: '100vh',
      bgcolor: 'background.default',
      position: 'relative'
    }}>
      <Paper sx={{ height: '100%', overflow: 'auto' }}>
        {currentView === 'home' && <MobileHome />}
        {currentView === 'summary' && <SummaryView />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'execution' && <ExecutionView />}
        {currentView === 'reportView' && <ReportView />}
        {showSummary && <ChecklistSummaryView />}

        <BottomNavigation
          value={bottomNav}
          onChange={(event, newValue) => {
            setBottomNav(newValue);
            if (newValue === 0) {
              setCurrentView('home');
              setViewMode('pending');
            }
            if (newValue === 1) {
              setCurrentView('home');
              setViewMode('completed');
            }
            if (newValue === 2) navigate('/reports');
            if (newValue === 3) {
              // Navegar primero a '/' y luego actualizar el store para evitar race conditions
              navigate('/', { replace: true });
              setIsMobileView(false);
            }
          }}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          <BottomNavigationAction label="Inicio" icon={<Home />} />
          <BottomNavigationAction label="Completadas" icon={<CheckCircle />} />
          <BottomNavigationAction label="Reportes" icon={<Assignment />} />
          <BottomNavigationAction label="Desktop" icon={<DesktopWindows />} />
        </BottomNavigation>

        <CheckInDialog />
      </Paper>

      {/* Diálogo de firma */}
      <Dialog open={signatureOpen} onClose={() => setSignatureOpen(false)} fullWidth>
        <DialogTitle>Firma del Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
            <SignatureCanvas 
              ref={sigRef} 
              penColor="black" 
              canvasProps={{ 
                width: 350, 
                height: 180, 
                style: { width: '100%' } 
              }} 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{ sigRef.current?.clear(); }}>Limpiar</Button>
          <Button onClick={()=> setSignatureOpen(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={()=>{ 
              const dataUrl = sigRef.current?.toDataURL(); 
              setClientSignature(dataUrl); 
              setSignatureOpen(false); 
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/')}
        >
          Ver Desktop
        </Button>
      </Box>
    </Box>
  );
}

export default MobileApp;