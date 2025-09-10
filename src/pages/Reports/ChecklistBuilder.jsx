import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add,
  Delete,
  DragIndicator,
  Save,
  ArrowBack,
  Preview,
  Edit,
  CheckCircle,
  RadioButtonUnchecked,
  Image,
  AttachFile,
  TextFields,
  FormatListNumbered,
  FormatListBulleted,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ChecklistBuilder = () => {
  const navigate = useNavigate();
  
  // Estado para el checklist
  const [checklistTitle, setChecklistTitle] = useState('Nueva Lista de Verificación');
  const [checklistDescription, setChecklistDescription] = useState('');
  const [checklistType, setChecklistType] = useState('maintenance');
  const [items, setItems] = useState([
    { id: '1', content: 'Verificar conexiones eléctricas', type: 'checkbox', required: true },
    { id: '2', content: 'Comprobar nivel de aceite', type: 'checkbox', required: true },
    { id: '3', content: 'Inspeccionar desgaste de componentes', type: 'checkbox', required: false },
    { id: '4', content: 'Fotografía del equipo', type: 'image', required: true },
    { id: '5', content: 'Observaciones adicionales', type: 'text', required: false }
  ]);
  
  // Estado para el diálogo de nuevo ítem
  const [openDialog, setOpenDialog] = useState(false);
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemType, setNewItemType] = useState('checkbox');
  const [newItemRequired, setNewItemRequired] = useState(false);
  
  // Estado para notificaciones
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Manejar el reordenamiento de ítems
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    
    setItems(reorderedItems);
  };
  
  // Abrir diálogo para agregar nuevo ítem
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewItemContent('');
    setNewItemType('checkbox');
    setNewItemRequired(false);
  };
  
  // Cerrar diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  // Agregar nuevo ítem
  const handleAddItem = () => {
    if (newItemContent.trim() === '') {
      setSnackbarMessage('El contenido del ítem no puede estar vacío');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    const newItem = {
      id: `item-${Date.now()}`,
      content: newItemContent,
      type: newItemType,
      required: newItemRequired
    };
    
    setItems([...items, newItem]);
    setOpenDialog(false);
    
    setSnackbarMessage('Ítem agregado correctamente');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };
  
  // Eliminar ítem
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    
    setSnackbarMessage('Ítem eliminado');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };
  
  // Guardar checklist
  const handleSaveChecklist = () => {
    if (checklistTitle.trim() === '') {
      setSnackbarMessage('El título de la lista no puede estar vacío');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    if (items.length === 0) {
      setSnackbarMessage('La lista debe contener al menos un ítem');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando checklist:', {
      title: checklistTitle,
      description: checklistDescription,
      type: checklistType,
      items
    });
    
    setSnackbarMessage('Lista de verificación guardada correctamente');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    // Redirigir después de un breve retraso
    setTimeout(() => {
      navigate('/reports');
    }, 1500);
  };
  
  // Cerrar snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  // Renderizar icono según el tipo de ítem
  const renderItemTypeIcon = (type) => {
    switch (type) {
      case 'checkbox':
        return <CheckCircle fontSize="small" />;
      case 'radio':
        return <RadioButtonUnchecked fontSize="small" />;
      case 'text':
        return <TextFields fontSize="small" />;
      case 'number':
        return <FormatListNumbered fontSize="small" />;
      case 'image':
        return <Image fontSize="small" />;
      case 'file':
        return <AttachFile fontSize="small" />;
      default:
        return <CheckCircle fontSize="small" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/reports')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">Constructor de Listas de Verificación</Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Panel de configuración */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Configuración General</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TextField
              fullWidth
              label="Título"
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Descripción"
              value={checklistDescription}
              onChange={(e) => setChecklistDescription(e.target.value)}
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="checklist-type-label">Tipo de Lista</InputLabel>
              <Select
                labelId="checklist-type-label"
                value={checklistType}
                label="Tipo de Lista"
                onChange={(e) => setChecklistType(e.target.value)}
              >
                <MenuItem value="maintenance">Mantenimiento</MenuItem>
                <MenuItem value="inspection">Inspección</MenuItem>
                <MenuItem value="safety">Seguridad</MenuItem>
                <MenuItem value="quality">Control de Calidad</MenuItem>
                <MenuItem value="custom">Personalizado</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Acciones</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Button
              fullWidth
              variant="contained"
              startIcon={<Preview />}
              sx={{ mb: 2 }}
              onClick={() => alert('Vista previa de la lista')}
            >
              Vista Previa
            </Button>
            
            <Button
              fullWidth
              variant="contained"
              color="success"
              startIcon={<Save />}
              sx={{ mb: 2 }}
              onClick={handleSaveChecklist}
            >
              Guardar Lista
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/reports')}
            >
              Cancelar
            </Button>
          </Paper>
        </Grid>
        
        {/* Panel de ítems */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Ítems de la Lista</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenDialog}
              >
                Agregar Ítem
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="checklist-items">
                {(provided) => (
                  <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={{ mb: 2 }}
                            >
                              <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box {...provided.dragHandleProps} sx={{ mr: 1, cursor: 'grab' }}>
                                    <DragIndicator color="action" />
                                  </Box>
                                  
                                  <Box sx={{ mr: 1 }}>
                                    {renderItemTypeIcon(item.type)}
                                  </Box>
                                  
                                  <ListItemText
                                    primary={item.content}
                                    secondary={
                                      <>
                                        {`Tipo: ${item.type}`}
                                        {item.required && ' • Obligatorio'}
                                      </>
                                    }
                                    sx={{ flex: 1 }}
                                  />
                                  
                                  <Box>
                                    <Tooltip title="Editar">
                                      <IconButton size="small" sx={{ mr: 1 }}>
                                        <Edit fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                      <IconButton 
                                        size="small" 
                                        color="error"
                                        onClick={() => handleDeleteItem(item.id)}
                                      >
                                        <Delete fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No hay ítems en la lista. Haga clic en "Agregar Ítem" para comenzar.
                        </Typography>
                      </Box>
                    )}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Diálogo para agregar nuevo ítem */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nuevo Ítem</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contenido del ítem"
            fullWidth
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            variant="outlined"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="item-type-label">Tipo de Ítem</InputLabel>
            <Select
              labelId="item-type-label"
              value={newItemType}
              label="Tipo de Ítem"
              onChange={(e) => setNewItemType(e.target.value)}
            >
              <MenuItem value="checkbox">Casilla de Verificación</MenuItem>
              <MenuItem value="radio">Opción Única</MenuItem>
              <MenuItem value="text">Campo de Texto</MenuItem>
              <MenuItem value="number">Campo Numérico</MenuItem>
              <MenuItem value="image">Imagen</MenuItem>
              <MenuItem value="file">Archivo Adjunto</MenuItem>
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={newItemRequired}
                onChange={(e) => setNewItemRequired(e.target.checked)}
              />
            }
            label="Ítem obligatorio"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddItem} variant="contained">Agregar</Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar para notificaciones */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChecklistBuilder;