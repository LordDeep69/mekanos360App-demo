import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  ArrowBack,
  Assignment,
  Build,
  Person,
  CalendarToday,
  AccessTime,
  LocationOn,
  Business,
  Comment,
  AttachFile,
  CheckCircle,
  Add,
  Edit,
  Delete,
  PictureAsPdf
} from '@mui/icons-material';
import ReportGenerator from '../../components/ReportGenerator';

// Importar datos de ejemplo
import { workOrdersData, assetsData, clientsData } from '../../data/mockData.jsx';

const WorkOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState(null);
  const [asset, setAsset] = useState(null);
  const [client, setClient] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  useEffect(() => {
    // Simulando la carga de datos de la orden de trabajo
    const foundWorkOrder = workOrdersData.find(wo => wo.id === parseInt(id));
    if (foundWorkOrder) {
      setWorkOrder({
        ...foundWorkOrder,
        // Agregar comentarios de ejemplo si no existen
        comments: foundWorkOrder.comments || [
          {
            id: 1,
            user: 'Carlos Rodríguez',
            avatar: 'CR',
            date: '10/05/2023 10:30',
            text: 'He revisado el equipo y necesitamos reemplazar la pieza X. Ya he solicitado el repuesto.'
          },
          {
            id: 2,
            user: 'Ana Martínez',
            avatar: 'AM',
            date: '10/05/2023 14:15',
            text: 'El repuesto llegará mañana por la mañana. Programaré la visita para las 10:00.'
          }
        ],
        // Agregar archivos adjuntos de ejemplo si no existen
        attachments: foundWorkOrder.attachments || [
          { id: 1, name: 'Manual_Técnico.pdf', type: 'PDF', size: '2.4 MB' },
          { id: 2, name: 'Foto_Equipo.jpg', type: 'Imagen', size: '1.1 MB' }
        ],
        // Agregar checklist de ejemplo si no existe
        checklist: foundWorkOrder.checklist || [
          { id: 1, task: 'Inspección visual', completed: true },
          { id: 2, task: 'Verificar conexiones eléctricas', completed: true },
          { id: 3, task: 'Comprobar presión hidráulica', completed: false },
          { id: 4, task: 'Lubricar componentes móviles', completed: false },
          { id: 5, task: 'Prueba de funcionamiento', completed: false }
        ]
      });
      
      // Buscar el activo asociado
      if (foundWorkOrder.assetId) {
        const foundAsset = assetsData.find(a => a.id === foundWorkOrder.assetId);
        setAsset(foundAsset);
        
        // Buscar el cliente asociado al activo
        if (foundAsset && foundAsset.clientId) {
          const foundClient = clientsData.find(c => c.id === foundAsset.clientId);
          setClient(foundClient);
        }
      }
    }
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const newCommentObj = {
      id: workOrder.comments.length + 1,
      user: 'Usuario Actual',
      avatar: 'UA',
      date: new Date().toLocaleString(),
      text: newComment
    };
    
    setWorkOrder({
      ...workOrder,
      comments: [...workOrder.comments, newCommentObj]
    });
    
    setNewComment('');
  };

  const handleChecklistToggle = (taskId) => {
    const updatedChecklist = workOrder.checklist.map(item => 
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    
    setWorkOrder({
      ...workOrder,
      checklist: updatedChecklist
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada': return 'success';
      case 'En Progreso': return 'primary';
      case 'Pendiente': return 'warning';
      case 'Cancelada': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'error';
      case 'Media': return 'warning';
      case 'Baja': return 'info';
      default: return 'default';
    }
  };

  // Calcular el paso actual basado en el estado de la orden
  const getActiveStep = (status) => {
    switch (status) {
      case 'Pendiente': return 0;
      case 'Asignada': return 1;
      case 'En Progreso': return 2;
      case 'Completada': return 3;
      case 'Cancelada': return -1;
      default: return 0;
    }
  };
  
  // Abrir diálogo de reporte
  const handleOpenReportDialog = () => {
    setReportDialogOpen(true);
  };

  // Cerrar diálogo de reporte
  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
  };

  if (!workOrder) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5">Cargando información de la orden de trabajo...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/work-orders')} 
        sx={{ mb: 2 }}
      >
        Volver a Órdenes de Trabajo
      </Button>
      
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">OT #{workOrder.id}: {workOrder.title}</Typography>
              <Box>
                <Chip 
                  label={workOrder.status} 
                  color={getStatusColor(workOrder.status)} 
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`Prioridad: ${workOrder.priority}`} 
                  color={getPriorityColor(workOrder.priority)} 
                />
              </Box>
            </Box>
            
            <Typography variant="body1" paragraph>
              {workOrder.description}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Fecha: {workOrder.date}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Duración: {workOrder.estimatedHours || '?'} horas
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Técnico: {workOrder.assignedTo || 'Sin asignar'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {workOrder.type}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Información del Activo</Typography>
              
              {asset ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Build fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      <Button 
                        sx={{ p: 0, textTransform: 'none' }}
                        onClick={() => navigate(`/assets/${asset.id}`)}
                      >
                        {asset.name}
                      </Button>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 1 }}>
                    {asset.type} - {asset.model}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {asset.location || 'Sin ubicación'}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay activo asociado a esta orden
                </Typography>
              )}
              
              {client && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" gutterBottom>Cliente</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      <Button 
                        sx={{ p: 0, textTransform: 'none' }}
                        onClick={() => navigate(`/clients/${client.id}`)}
                      >
                        {client.name}
                      </Button>
                    </Typography>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Progreso</Typography>
            <Stepper activeStep={getActiveStep(workOrder.status)} sx={{ mb: 3 }}>
              <Step>
                <StepLabel>Pendiente</StepLabel>
              </Step>
              <Step>
                <StepLabel>Asignada</StepLabel>
              </Step>
              <Step>
                <StepLabel>En Progreso</StepLabel>
              </Step>
              <Step>
                <StepLabel>Completada</StepLabel>
              </Step>
            </Stepper>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {workOrder.status !== 'Completada' && workOrder.status !== 'Cancelada' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    // Aquí iría la lógica para avanzar al siguiente estado
                    alert('Funcionalidad para avanzar estado no implementada en esta demo');
                  }}
                >
                  Avanzar Estado
                </Button>
              )}
            </Box>
          </Paper>
          
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Lista de Verificación</Typography>
              <Button 
                startIcon={<Add />} 
                size="small"
                onClick={() => {
                  // Aquí iría la lógica para agregar una nueva tarea
                  alert('Funcionalidad para agregar tarea no implementada en esta demo');
                }}
              >
                Agregar Tarea
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {workOrder.checklist.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <IconButton 
                      edge="start" 
                      color={item.completed ? 'success' : 'default'}
                      onClick={() => handleChecklistToggle(item.id)}
                    >
                      <CheckCircle />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.task} 
                    sx={{ 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'text.secondary' : 'text.primary'
                    }} 
                  />
                  <IconButton edge="end" size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            
            {workOrder.checklist.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No hay tareas en la lista de verificación
              </Typography>
            )}
          </Paper>
          
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Comentarios</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {workOrder.comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{comment.avatar}</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">{comment.user}</Typography>
                        <Typography variant="caption" color="text.secondary">{comment.date}</Typography>
                      </Box>
                    }
                    secondary={comment.text}
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Añadir un comentario..."
                variant="outlined"
                size="small"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button 
                variant="contained" 
                onClick={handleAddComment}
                disabled={newComment.trim() === ''}
              >
                Enviar
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Archivos Adjuntos</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {workOrder.attachments.map((file) => (
                <ListItem key={file.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <AttachFile />
                  </ListItemIcon>
                  <ListItemText 
                    primary={file.name} 
                    secondary={`${file.type} - ${file.size}`} 
                  />
                  <IconButton edge="end" size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<Add />}
              sx={{ mt: 1 }}
              onClick={() => {
                // Aquí iría la lógica para agregar un archivo
                alert('Funcionalidad para agregar archivo no implementada en esta demo');
              }}
            >
              Añadir Archivo
            </Button>
          </Paper>
          
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Materiales Utilizados</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {workOrder.materials && workOrder.materials.length > 0 ? (
              <List>
                {workOrder.materials.map((material, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText 
                      primary={material.name} 
                      secondary={`Cantidad: ${material.quantity} - ${material.cost ? `Costo: $${material.cost}` : 'Sin costo asignado'}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No hay materiales registrados
              </Typography>
            )}
            
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<Add />}
              sx={{ mt: 1 }}
              onClick={() => {
                // Aquí iría la lógica para agregar un material
                alert('Funcionalidad para agregar material no implementada en esta demo');
              }}
            >
              Añadir Material
            </Button>
          </Paper>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Acciones</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                Desde aquí puedes realizar diferentes acciones sobre esta orden de trabajo.
              </Typography>
            </CardContent>
            <CardActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 2, pb: 2 }}>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mb: 1 }}
                onClick={() => navigate(`/work-orders/${id}/edit`)}
              >
                Editar Orden
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mb: 1 }}
                onClick={() => {
                  // Aquí iría la lógica para generar un informe
                  alert('Funcionalidad para generar informe no implementada en esta demo');
                }}
              >
                Generar Informe
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                color="error"
                onClick={() => {
                  // Aquí iría la lógica para cancelar la orden
                  alert('Funcionalidad para cancelar orden no implementada en esta demo');
                }}
              >
                Cancelar Orden
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* Botón para generar reporte si la OT está completada */}
      {workOrder.status === 'Completada' && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdf />}
            onClick={handleOpenReportDialog}
            size="large"
          >
            Generar Reporte de Mantenimiento
          </Button>
        </Box>
      )}

      {/* Componente de generación de reportes */}
      <ReportGenerator 
        workOrder={workOrder}
        asset={asset}
        client={client}
        open={reportDialogOpen}
        onClose={handleCloseReportDialog}
      />
    </Box>
  );
};

export default WorkOrderDetail;