import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Add,
  Close,
  FilterList,
  Today,
  CalendarMonth,
  CalendarViewWeek,
  CalendarViewMonth
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

// Importar datos de ejemplo
import { mockWorkOrders, mockAssets, mockClients } from '../../data/mockData';

const Planning = () => {
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  // Usar Dayjs para el DatePicker y convertir a Date cuando usemos date-fns
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    technician: 'all',
    status: 'all'
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: dayjs(),
    type: 'Mantenimiento Preventivo',
    technician: '',
    assetId: '',
    duration: 2
  });

  // Cargar eventos desde los datos de ejemplo
  useEffect(() => {
    // Convertir órdenes de trabajo a eventos de calendario
    const workOrderEvents = mockWorkOrders.map(wo => ({
      id: wo.id,
      title: wo.description || wo.type,
      date: new Date(wo.date),
      type: wo.type,
      technician: wo.technician || 'Sin asignar',
      assetId: wo.asset_id,
      assetName: mockAssets.find(a => a.id === wo.asset_id)?.name || 'Activo desconocido',
      status: wo.status,
      duration: wo.estimatedHours || 2
    }));
    
    setEvents(workOrderEvents);
    applyFilters(workOrderEvents, filters);
  }, []);

  // Aplicar filtros a los eventos
  const applyFilters = (eventsList, currentFilters) => {
    const filtered = eventsList.filter(event => {
      const matchesType = currentFilters.type === 'all' || event.type === currentFilters.type;
      const matchesTechnician = currentFilters.technician === 'all' || event.technician === currentFilters.technician;
      const matchesStatus = currentFilters.status === 'all' || event.status === currentFilters.status;
      
      return matchesType && matchesTechnician && matchesStatus;
    });
    
    setFilteredEvents(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    applyFilters(events, newFilters);
  };

  const handleAddEvent = () => {
    // Validar campos requeridos
    if (!newEvent.title || !newEvent.technician || !newEvent.assetId) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Crear nuevo evento
    const event = {
      id: events.length + 1,
      ...newEvent,
      // asegurar que la fecha del evento sea un Date para las utilidades de date-fns
      date: dayjs.isDayjs(newEvent.date) ? newEvent.date.toDate() : newEvent.date,
      status: 'Pendiente',
      assetName: assetsData.find(a => a.id === parseInt(newEvent.assetId))?.name || 'Activo desconocido'
    };
    
    // Actualizar estado
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    applyFilters(updatedEvents, filters);
    
    // Cerrar diálogo y resetear formulario
    setOpenDialog(false);
    setNewEvent({
      title: '',
      date: dayjs(),
      type: 'Mantenimiento Preventivo',
      technician: '',
      assetId: '',
      duration: 2
    });
  };

  // Renderizar vista de día
  const renderDayView = () => {
    const dayEvents = filteredEvents.filter(event => 
      isSameDay(event.date, currentDate.toDate())
    );
    
    return (
      <Paper sx={{ p: 3, height: '70vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          {format(currentDate.toDate(), 'EEEE, d MMMM yyyy', { locale: es })}
        </Typography>
        
        {dayEvents.length > 0 ? (
          <Grid container spacing={2}>
            {dayEvents.map(event => (
              <Grid item xs={12} key={event.id}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    borderLeft: 4, 
                    borderColor: getEventColor(event.type),
                    bgcolor: 'background.default'
                  }}
                >
                  <Typography variant="subtitle1">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora: {format(event.date, 'HH:mm')} | Duración: {event.duration}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Técnico: {event.technician} | Activo: {event.assetName}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" sx={{ 
                      bgcolor: getStatusColor(event.status), 
                      color: 'white',
                      px: 1,
                      borderRadius: 1
                    }}>
                      {event.status}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      bgcolor: getEventColor(event.type), 
                      color: 'white',
                      px: 1,
                      borderRadius: 1
                    }}>
                      {event.type}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" color="text.secondary">
              No hay eventos programados para este día
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              sx={{ mt: 2 }}
              onClick={() => setOpenDialog(true)}
            >
              Programar Evento
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  // Renderizar vista de semana
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate.toDate(), { weekStartsOn: 1 }); // Semana comienza el lunes
    const weekEnd = endOfWeek(currentDate.toDate(), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return (
      <Paper sx={{ p: 3, height: '70vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Semana: {format(weekStart, 'd MMM', { locale: es })} - {format(weekEnd, 'd MMM yyyy', { locale: es })}
        </Typography>
        
        <Grid container spacing={2}>
          {days.map(day => {
            const dayEvents = filteredEvents.filter(event => 
              isSameDay(event.date, day)
            );
            
            return (
              <Grid item xs={12} key={day.toString()}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    bgcolor: isToday(day) ? 'primary.50' : 'background.paper',
                    border: isToday(day) ? 1 : 0,
                    borderColor: 'primary.main'
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: isToday(day) ? 'bold' : 'normal',
                      color: isToday(day) ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {format(day, 'EEEE, d MMMM', { locale: es })}
                  </Typography>
                  
                  {dayEvents.length > 0 ? (
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      {dayEvents.map(event => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                          <Paper 
                            elevation={2} 
                            sx={{ 
                              p: 1.5, 
                              borderLeft: 4, 
                              borderColor: getEventColor(event.type),
                              bgcolor: 'background.default'
                            }}
                          >
                            <Typography variant="body2" noWrap>{event.title}</Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                              {event.technician} | {event.duration}h
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              bgcolor: getStatusColor(event.status), 
                              color: 'white',
                              px: 0.5,
                              borderRadius: 1,
                              fontSize: '0.7rem'
                            }}>
                              {event.status}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      No hay eventos programados
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    );
  };

  // Renderizar vista de mes (simplificada)
  const renderMonthView = () => {
    return (
      <Paper sx={{ p: 3, height: '70vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          {format(currentDate.toDate(), 'MMMM yyyy', { locale: es })}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 5 }}>
          Vista de mes simplificada para esta demo.
          <br />
          Se muestran {filteredEvents.length} eventos en el mes actual.
        </Typography>
      </Paper>
    );
  };

  // Funciones auxiliares para colores
  const getEventColor = (type) => {
    switch (type) {
      case 'Mantenimiento Preventivo': return '#4caf50';
      case 'Mantenimiento Correctivo': return '#f44336';
      case 'Inspección': return '#2196f3';
      case 'Instalación': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada': return '#4caf50';
      case 'En Progreso': return '#2196f3';
      case 'Pendiente': return '#ff9800';
      case 'Cancelada': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Planificación</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Programar Evento
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
              <DatePicker
                label="Fecha"
                value={currentDate}
                onChange={(newDate) => setCurrentDate(newDate || dayjs())}
                slotProps={{ textField: { size: "small", sx: { width: 200 } } }}
              />
            </LocalizationProvider>
            
            <Box sx={{ display: 'flex', ml: 2 }}>
              <Button 
                variant={view === 'day' ? 'contained' : 'outlined'} 
                startIcon={<Today />}
                onClick={() => setView('day')}
                sx={{ mr: 1 }}
              >
                Día
              </Button>
              <Button 
                variant={view === 'week' ? 'contained' : 'outlined'} 
                startIcon={<CalendarViewWeek />}
                onClick={() => setView('week')}
                sx={{ mr: 1 }}
              >
                Semana
              </Button>
              <Button 
                variant={view === 'month' ? 'contained' : 'outlined'} 
                startIcon={<CalendarViewMonth />}
                onClick={() => setView('month')}
              >
                Mes
              </Button>
            </Box>
            
            <Box sx={{ ml: 'auto', display: 'flex' }}>
              <Button 
                onClick={() => setCurrentDate(dayjs())}
                variant="outlined"
                size="small"
              >
                Hoy
              </Button>
              <IconButton onClick={() => setCurrentDate(dayjs(addDays(currentDate.toDate(), -1)))}>
                &lt;
              </IconButton>
              <IconButton onClick={() => setCurrentDate(dayjs(addDays(currentDate.toDate(), 1)))}>
                &gt;
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FilterList sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Filtros</Typography>
            </Box>
            
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel id="type-filter-label">Tipo</InputLabel>
              <Select
                labelId="type-filter-label"
                value={filters.type}
                label="Tipo"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="all">Todos los tipos</MenuItem>
                <MenuItem value="Mantenimiento Preventivo">Mantenimiento Preventivo</MenuItem>
                <MenuItem value="Mantenimiento Correctivo">Mantenimiento Correctivo</MenuItem>
                <MenuItem value="Inspección">Inspección</MenuItem>
                <MenuItem value="Instalación">Instalación</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel id="technician-filter-label">Técnico</InputLabel>
              <Select
                labelId="technician-filter-label"
                value={filters.technician}
                label="Técnico"
                onChange={(e) => handleFilterChange('technician', e.target.value)}
              >
                <MenuItem value="all">Todos los técnicos</MenuItem>
                <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                <MenuItem value="Sin asignar">Sin asignar</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filters.status}
                label="Estado"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="all">Todos los estados</MenuItem>
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="En Progreso">En Progreso</MenuItem>
                <MenuItem value="Completada">Completada</MenuItem>
                <MenuItem value="Cancelada">Cancelada</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>

      {view === 'day' && renderDayView()}
      {view === 'week' && renderWeekView()}
      {view === 'month' && renderMonthView()}

      {/* Diálogo para agregar nuevo evento */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Programar Nuevo Evento
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                fullWidth
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
                <DatePicker
                  label="Fecha"
                  value={newEvent.date}
                  onChange={(newDate) => setNewEvent({ ...newEvent, date: newDate || dayjs() })}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duración (horas)"
                type="number"
                fullWidth
                value={newEvent.duration}
                onChange={(e) => setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })}
                InputProps={{ inputProps: { min: 1, max: 24 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="event-type-label">Tipo</InputLabel>
                <Select
                  labelId="event-type-label"
                  value={newEvent.type}
                  label="Tipo"
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                >
                  <MenuItem value="Mantenimiento Preventivo">Mantenimiento Preventivo</MenuItem>
                  <MenuItem value="Mantenimiento Correctivo">Mantenimiento Correctivo</MenuItem>
                  <MenuItem value="Inspección">Inspección</MenuItem>
                  <MenuItem value="Instalación">Instalación</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="technician-label">Técnico</InputLabel>
                <Select
                  labelId="technician-label"
                  value={newEvent.technician}
                  label="Técnico"
                  onChange={(e) => setNewEvent({ ...newEvent, technician: e.target.value })}
                >
                  <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                  <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                  <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="asset-label">Activo</InputLabel>
                <Select
                  labelId="asset-label"
                  value={newEvent.assetId}
                  label="Activo"
                  onChange={(e) => setNewEvent({ ...newEvent, assetId: e.target.value })}
                >
                  {mockAssets.map(asset => (
                    <MenuItem key={asset.id} value={asset.id}>
                      {asset.name} - {asset.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddEvent} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Planning;