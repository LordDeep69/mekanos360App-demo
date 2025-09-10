// src/pages/WorkOrders/WorkOrders.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  MoreVert,
  AccessTime,
  LocationOn,
  Person,
  Warning,
  CheckCircle,
  Schedule,
  DirectionsCar,
  Assignment,
  NavigateNext,
  Refresh,
  ViewKanban,
  ViewList,
  CalendarMonth,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../../store/globalStore';

function WorkOrders() {
  const navigate = useNavigate();
  
  // Usar el store global
  const {
    workOrders,
    employees,
    updateWorkOrder,
    assignTechnician,
    getWorkOrdersByStatus
  } = useGlobalStore();
  
  // Generar columnas del kanban dinámicamente desde el store
  const generateKanbanColumns = () => {
    const planificadas = getWorkOrdersByStatus('PLANIFICADA');
    const asignadas = getWorkOrdersByStatus('ASIGNADA');
    const enRuta = getWorkOrdersByStatus('EN RUTA');
    const ejecutando = getWorkOrdersByStatus('EJECUTANDO');
    const completadas = getWorkOrdersByStatus('COMPLETADA');

    return {
      planificada: {
        title: 'PLANIFICADA',
        color: '#757575',
        items: planificadas.map(ot => ({
          id: ot.id,
          cliente: ot.cliente,
          tipo: ot.tipo,
          prioridad: ot.prioridad?.toLowerCase() || 'normal',
          fecha: ot.fechaProgramada,
          hora: ot.horaProgramada,
          tecnico: ot.tecnicoAsignado,
          estado: 'planificada',
          progreso: ot.progreso || 0,
          ubicacion: ot.ubicacion,
          activo: ot.activoNombre
        }))
      },
      asignada: {
        title: 'ASIGNADA',
        color: '#2196f3',
        items: asignadas.map(ot => ({
          id: ot.id,
          cliente: ot.cliente,
          tipo: ot.tipo,
          prioridad: ot.prioridad?.toLowerCase() || 'normal',
          fecha: ot.fechaProgramada,
          hora: ot.horaProgramada,
          tecnico: ot.tecnicoAsignado,
          estado: 'asignada',
          progreso: ot.progreso || 0,
          ubicacion: ot.ubicacion,
          activo: ot.activoNombre
        }))
      },
      enRuta: {
        title: 'EN RUTA',
        color: '#ff9800',
        items: enRuta.map(ot => ({
          id: ot.id,
          cliente: ot.cliente,
          tipo: ot.tipo,
          prioridad: ot.prioridad?.toLowerCase() || 'normal',
          fecha: ot.fechaProgramada,
          hora: ot.horaProgramada,
          tecnico: ot.tecnicoAsignado,
          estado: 'enRuta',
          progreso: ot.progreso || 0,
          ubicacion: ot.ubicacion,
          activo: ot.activoNombre
        }))
      },
      ejecutando: {
        title: 'EJECUTANDO',
        color: '#4caf50',
        items: ejecutando.map(ot => ({
          id: ot.id,
          cliente: ot.cliente,
          tipo: ot.tipo,
          prioridad: ot.prioridad?.toLowerCase() || 'normal',
          fecha: ot.fechaProgramada,
          hora: ot.horaProgramada,
          tecnico: ot.tecnicoAsignado,
          estado: 'ejecutando',
          progreso: ot.progreso || 0,
          ubicacion: ot.ubicacion,
          activo: ot.activoNombre
        }))
      },
      completada: {
        title: 'COMPLETADA',
        color: '#2e7d32',
        items: completadas.map(ot => ({
          id: ot.id,
          cliente: ot.cliente,
          tipo: ot.tipo,
          prioridad: ot.prioridad?.toLowerCase() || 'normal',
          fecha: ot.fechaProgramada,
          hora: ot.horaProgramada,
          tecnico: ot.tecnicoAsignado,
          estado: 'completada',
          progreso: ot.progreso || 100,
          ubicacion: ot.ubicacion,
          activo: ot.activoNombre
        }))
      }
    };
  };

  const [columns, setColumns] = useState(generateKanbanColumns());
  const [viewMode, setViewMode] = useState('kanban');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOT, setSelectedOT] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
  // Obtener técnicos desde el store
  const technicians = employees.map(emp => emp.nombre);
  
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [otToAssign, setOtToAssign] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState('');

  // Actualizar columnas cuando cambien las OTs
  useEffect(() => {
    setColumns(generateKanbanColumns());
  }, [workOrders]);

  // Abrir diálogo de asignación
  const openAssignDialog = (ot) => {
    setOtToAssign(ot);
    setAssignDialogOpen(true);
  };
  
  const closeAssignDialog = () => {
    setAssignDialogOpen(false);
    setOtToAssign(null);
    setSelectedTechnician('');
  };
  
  // Asignar técnico y reservar inventario
  const handleAssignTechnician = () => {
    if (!selectedTechnician) {
      alert('Seleccione un técnico');
      return;
    }
    
    // Obtener ID del técnico desde el store
    const technician = employees.find(emp => emp.nombre === selectedTechnician);
    const technicianId = technician ? technician.id : null;
    
    // Asignar técnico usando el store global
    assignTechnician(otToAssign.id, technicianId, selectedTechnician);
    
    // Actualizar estado local del kanban
    const updatedColumns = { ...columns };
    const otIndex = updatedColumns['planificada'].items.findIndex(ot => ot.id === otToAssign.id);
    if (otIndex !== -1) {
      const ot = { ...updatedColumns['planificada'].items[otIndex], tecnico: selectedTechnician, estado: 'asignada' };
      updatedColumns['planificada'].items.splice(otIndex, 1);
      updatedColumns['asignada'].items.push(ot);
      setColumns(updatedColumns);
      alert(`OT ${otToAssign.id} asignada a ${selectedTechnician}. Inventario reservado.`);
    }
    
    closeAssignDialog();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      
      // Si se mueve a 'asignada' desde 'planificada', abrir diálogo de asignación
      if (source.droppableId === 'planificada' && destination.droppableId === 'asignada') {
        openAssignDialog(removed);
        return;
      }
      
      // Mapear estados de columnas a estados del store
      const statusMapping = {
        'planificada': 'PLANIFICADA',
        'asignada': 'ASIGNADA',
        'enRuta': 'EN RUTA',
        'ejecutando': 'EJECUTANDO',
        'completada': 'COMPLETADA'
      };
      
      // Actualizar estado en el store global
      const newStatus = statusMapping[destination.droppableId];
      if (newStatus) {
        updateWorkOrder(removed.id, { estado: newStatus });
      }
      
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  // Diálogo de asignación de técnico
  const AssignTechnicianDialog = () => (
    <Dialog open={assignDialogOpen} onClose={closeAssignDialog}>
      <DialogTitle>Asignar Técnico y Reservar Inventario</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Técnico</InputLabel>
          <Select value={selectedTechnician} label="Técnico" onChange={e => setSelectedTechnician(e.target.value)}>
            {technicians.map(t => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Al asignar la OT, se reservará el inventario previsto automáticamente.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAssignDialog}>Cancelar</Button>
        <Button variant="contained" onClick={handleAssignTechnician}>Asignar</Button>
      </DialogActions>
    </Dialog>
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critica': return 'error';
      case 'alta': return 'warning';
      case 'normal': return 'info';
      case 'baja': return 'default';
      default: return 'default';
    }
  };

  const OrderCard = ({ order, isDragging }) => (
    <Card
      sx={{
        mb: 2,
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(5deg)' : 'none',
        cursor: 'move',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {order.id}
          </Typography>
          <Chip
            label={order.prioridad}
            size="small"
            color={getPriorityColor(order.prioridad)}
          />
        </Box>

        <Typography variant="body2" gutterBottom>
          {order.cliente}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          {order.tipo}
        </Typography>

        {order.progreso && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <LinearProgress variant="determinate" value={order.progreso} />
            <Typography variant="caption" color="text.secondary">
              {order.progreso}% completado
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          {order.tecnico ? (
            <Chip
              avatar={<Avatar sx={{ width: 20, height: 20 }}>{order.tecnico.charAt(0)}</Avatar>}
              label={order.tecnico}
              size="small"
              variant="outlined"
            />
          ) : (
            <Button size="small" variant="outlined">
              Asignar
            </Button>
          )}

          {order.hora && (
            <Chip
              icon={<AccessTime />}
              label={order.hora}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {order.eta && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <DirectionsCar fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              ETA: {order.eta}
            </Typography>
          </Box>
        )}

        {order.tiempoTranscurrido && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <Schedule fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {order.tiempoTranscurrido}
            </Typography>
          </Box>
        )}

        {order.duracion && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <CheckCircle fontSize="small" color="success" />
            <Typography variant="caption" color="text.secondary">
              Completado en {order.duracion}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            size="small"
            onClick={() => navigate(`/work-orders/${order.id}`)}
          >
            Ver Detalle
          </Button>
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  const NewOrderDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
      <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select label="Cliente">
                <MenuItem value="1">Hotel Caribe S.A.</MenuItem>
                <MenuItem value="2">Comfenalco</MenuItem>
                <MenuItem value="3">C.C. La Plazuela</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sede</InputLabel>
              <Select label="Sede">
                <MenuItem value="1">Sede Principal</MenuItem>
                <MenuItem value="2">Sede Norte</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Activo</InputLabel>
              <Select label="Activo">
                <MenuItem value="1">Planta Eléctrica 150KVA</MenuItem>
                <MenuItem value="2">Sistema de Bombeo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Servicio</InputLabel>
              <Select label="Tipo de Servicio">
                <MenuItem value="preventivo">Preventivo</MenuItem>
                <MenuItem value="correctivo">Correctivo</MenuItem>
                <MenuItem value="emergencia">Emergencia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Programada"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="time"
              label="Hora"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Prioridad</InputLabel>
              <Select label="Prioridad">
                <MenuItem value="critica">Crítica</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="baja">Baja</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Técnico Asignado</InputLabel>
              <Select label="Técnico Asignado">
                <MenuItem value="1">Juan Pérez</MenuItem>
                <MenuItem value="2">Carlos López</MenuItem>
                <MenuItem value="3">María García</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descripción del Trabajo"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
        <Button variant="contained" onClick={() => setOpenDialog(false)}>
          Crear Orden
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <AssignTechnicianDialog />
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Órdenes de Trabajo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Object.values(columns).reduce((acc, col) => acc + col.items.length, 0)} órdenes totales
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button startIcon={<Refresh />} variant="outlined">
            Actualizar
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Nueva OT
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar OT, cliente, técnico..."
            size="small"
            sx={{ flex: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select label="Período">
              <MenuItem value="hoy">Hoy</MenuItem>
              <MenuItem value="semana">Esta Semana</MenuItem>
              <MenuItem value="mes">Este Mes</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              color={viewMode === 'kanban' ? 'primary' : 'default'}
              onClick={() => setViewMode('kanban')}
            >
              <ViewKanban />
            </IconButton>
            <IconButton
              color={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => setViewMode('list')}
            >
              <ViewList />
            </IconButton>
            <IconButton
              color={viewMode === 'calendar' ? 'primary' : 'default'}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarMonth />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {viewMode === 'kanban' && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={2}>
            {Object.entries(columns).map(([columnId, column]) => (
              <Grid item xs={12} sm={6} md={2.4} key={columnId}>
                <Paper sx={{ bgcolor: 'grey.50', p: 1, height: '100%', minHeight: 500 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {column.title}
                    </Typography>
                    <Chip
                      label={column.items.length}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ minHeight: 400 }}
                      >
                        {column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <OrderCard
                                  order={item}
                                  isDragging={snapshot.isDragging}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      )}

      <NewOrderDialog />
    </Box>
  );
}

export default WorkOrders;