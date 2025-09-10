import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Cancel,
  Assignment,
  Build,
  Person,
  CalendarToday,
  AttachMoney,
  PhotoLibrary,
  Description,
  CheckBox,
  CheckBoxOutlineBlank
} from '@mui/icons-material';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`report-tabpanel-${index}`}
    aria-labelledby={`report-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const ReportViewer = ({ open, onClose, workOrder, report }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const data = workOrder || report;

  if (!data) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Error
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>No hay datos para mostrar</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const renderGeneralInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
              Información General
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" gutterBottom>
              <strong>ID:</strong> {workOrder ? `OT-${data.id}` : data.id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Título:</strong> {data.title || data.name || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Descripción:</strong> {data.description || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Estado:</strong> 
              <Chip 
                label={data.status} 
                color={data.status === 'Completada' ? 'success' : 'primary'} 
                size="small" 
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Prioridad:</strong> 
              <Chip 
                label={data.priority} 
                color={data.priority === 'Alta' ? 'error' : data.priority === 'Media' ? 'warning' : 'info'} 
                size="small" 
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tipo:</strong> {data.type || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
              Asignación y Fechas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" gutterBottom>
              <strong>Técnico Asignado:</strong> {data.assignedTechnician || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha Programada:</strong> {data.scheduledDate ? new Date(data.scheduledDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de Inicio:</strong> {data.startDate ? new Date(data.startDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de Finalización:</strong> {data.completionDate ? new Date(data.completionDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Duración Estimada:</strong> {data.estimatedDuration || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tiempo Real:</strong> {data.actualDuration || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderChecklist = () => {
    if (!data.checklist || data.checklist.length === 0) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No hay lista de verificación disponible para esta orden.
          </Typography>
        </Paper>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Elemento</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.checklist.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.completed ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </TableCell>
                <TableCell>{item.item || item.name}</TableCell>
                <TableCell>{item.description || 'N/A'}</TableCell>
                <TableCell>{item.notes || item.observations || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderMaterials = () => {
    if (!data.materials || data.materials.length === 0) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No hay materiales registrados para esta orden.
          </Typography>
        </Paper>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Unidad</TableCell>
              <TableCell>Costo Unitario</TableCell>
              <TableCell>Costo Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>{material.unit}</TableCell>
                <TableCell>${material.unitCost?.toLocaleString() || '0'}</TableCell>
                <TableCell>${(material.quantity * material.unitCost)?.toLocaleString() || '0'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderMultimedia = () => {
    const evidence = data.multimediaEvidence || data.evidence || [];
    
    if (evidence.length === 0) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No hay evidencia multimedia disponible.
          </Typography>
        </Paper>
      );
    }

    return (
      <Grid container spacing={2}>
        {evidence.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {item.type === 'image' && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.url || '/placeholder-image.jpg'}
                  alt={item.description || `Evidencia ${index + 1}`}
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description || `Archivo ${index + 1}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Fecha: {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {workOrder ? `Orden de Trabajo OT-${data.id}` : `Reporte ${data.id}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="report tabs">
            <Tab label="General" />
            <Tab label="Lista de Verificación" />
            <Tab label="Materiales" />
            <Tab label="Evidencia Multimedia" />
          </Tabs>
        </Box>
        
        <TabPanel value={activeTab} index={0}>
          {renderGeneralInfo()}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {renderChecklist()}
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {renderMaterials()}
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          {renderMultimedia()}
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportViewer;
