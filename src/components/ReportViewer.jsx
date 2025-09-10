// src/components/ReportViewer.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs
} from '@mui/material';
import {
  Close,
  Download,
  Print,
  Share,
  CheckCircle,
  Error,
  Warning,
  Info,
  Image,
  VideoFile,
  AudioFile,
  InsertDriveFile,
  Person,
  Build,
  CalendarToday,
  LocationOn,
  Timer,
  Assignment
} from '@mui/icons-material';

const ReportViewer = ({ open, onClose, report, type = 'report' }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  if (!report) return null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderWorkOrderReport = () => {
    if (type !== 'workOrder') return null;

    return (
      <Box>
        {/* Header del Reporte */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom color="primary">
                  Reporte de Trabajo #{report.id}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {report.cliente}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.activoNombre}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'right' }}>
                  <Chip
                    label={report.estado}
                    color={report.estado === 'COMPLETADA' ? 'success' : 'primary'}
                    size="large"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Generado: {new Date(report.fechaCreacion).toLocaleString('es-ES')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Información General" />
          <Tab label="Checklist" />
          <Tab label="Materiales" />
          <Tab label="Evidencias" />
        </Tabs>

        {/* Tab 0: Información General */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Detalles del Trabajo
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Build /></ListItemIcon>
                      <ListItemText primary="Tipo" secondary={`${report.tipo} - ${report.subtipo}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Person /></ListItemIcon>
                      <ListItemText primary="Técnico" secondary={report.tecnicoAsignado || 'No asignado'} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText primary="Ubicación" secondary={report.ubicacionTrabajo} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Timer /></ListItemIcon>
                      <ListItemText 
                        primary="Duración" 
                        secondary={`Estimado: ${report.tiempoEstimado}h ${report.tiempoReal ? `- Real: ${report.tiempoReal}h` : ''}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday /></ListItemIcon>
                      <ListItemText 
                        primary="Fechas" 
                        secondary={`Programado: ${new Date(report.fechaProgramada).toLocaleString('es-ES')}`} 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Observaciones</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {report.observaciones || 'Sin observaciones adicionales'}
                  </Typography>
                  
                  {report.estado === 'COMPLETADA' && report.nombreFirmaCliente && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="success.dark">
                        Trabajo Aprobado por:
                      </Typography>
                      <Typography variant="body2" color="success.dark">
                        {report.nombreFirmaCliente}
                      </Typography>
                      <Typography variant="caption" color="success.dark">
                        {new Date(report.fechaFirma).toLocaleString('es-ES')}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tab 1: Checklist */}
        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lista de Verificación: {report.checklist?.nombre}
              </Typography>
              <List>
                {report.checklist?.items?.map((item, index) => (
                  <ListItem key={index} divider>
                    <ListItemIcon>
                      {item.completado ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Error color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.descripcion}
                      secondary={
                        <Box>
                          {item.valor && (
                            <Typography variant="body2" component="span">
                              Valor: {item.valor}
                            </Typography>
                          )}
                          {item.observaciones && (
                            <Typography variant="body2" color="text.secondary" component="div">
                              {item.observaciones}
                            </Typography>
                          )}
                          {item.fechaCompletado && (
                            <Typography variant="caption" color="text.secondary" component="div">
                              Completado: {new Date(item.fechaCompletado).toLocaleString('es-ES')}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <Chip
                      label={item.estado || (item.completado ? 'OK' : 'Pendiente')}
                      color={item.completado ? 'success' : 'default'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Materiales */}
        {activeTab === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Materiales Utilizados</Typography>
              <List>
                {report.materiales?.map((material, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`${material.nombre} (${material.codigo})`}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            Planificado: {material.cantidadPlanificada} | 
                            Usado: {material.cantidadUsada || 0} | 
                            Precio Unit: ${material.precioUnitario?.toLocaleString('es-ES')}
                          </Typography>
                          <Typography variant="body2" color="primary" component="div">
                            Subtotal: ${((material.cantidadUsada || 0) * (material.precioUnitario || 0)).toLocaleString('es-ES')}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="primary">
                        Total Materiales: ${report.materiales?.reduce((total, m) => 
                          total + ((m.cantidadUsada || 0) * (m.precioUnitario || 0)), 0
                        ).toLocaleString('es-ES')}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Evidencias Multimedia */}
        {activeTab === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Evidencias Multimedia</Typography>
              
              {/* Fotos */}
              {report.multimedia?.fotos?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <Image sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Fotografías ({report.multimedia.fotos.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {report.multimedia.fotos.map((foto, index) => (
                      <Grid item xs={6} md={3} key={index}>
                        <Card 
                          sx={{ cursor: 'pointer' }}
                          onClick={() => setImagePreview(foto)}
                        >
                          <CardMedia
                            component="div"
                            sx={{ 
                              height: 120, 
                              bgcolor: 'grey.200',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Image sx={{ fontSize: 40, color: 'grey.500' }} />
                          </CardMedia>
                          <CardContent sx={{ p: 1 }}>
                            <Typography variant="caption" noWrap>
                              {foto.nombre}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Videos */}
              {report.multimedia?.videos?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <VideoFile sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Videos ({report.multimedia.videos.length})
                  </Typography>
                  <List>
                    {report.multimedia.videos.map((video, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><VideoFile /></ListItemIcon>
                        <ListItemText
                          primary={video.nombre}
                          secondary={new Date(video.fecha).toLocaleString('es-ES')}
                        />
                        <Button size="small" startIcon={<Download />}>
                          Descargar
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Documentos */}
              {report.multimedia?.documentos?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <InsertDriveFile sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Documentos ({report.multimedia.documentos.length})
                  </Typography>
                  <List>
                    {report.multimedia.documentos.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><InsertDriveFile /></ListItemIcon>
                        <ListItemText
                          primary={doc.nombre}
                          secondary={new Date(doc.fecha).toLocaleString('es-ES')}
                        />
                        <Button size="small" startIcon={<Download />}>
                          Descargar
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {(!report.multimedia?.fotos?.length && !report.multimedia?.videos?.length && !report.multimedia?.documentos?.length) && (
                <Alert severity="info">
                  No hay evidencias multimedia disponibles para este trabajo.
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    );
  };

  const renderGenericReport = () => {
    if (type === 'workOrder') return null;

    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {report.titulo || report.name || 'Reporte'}
        </Typography>
        <Typography variant="body1">
          {report.contenido || report.description || 'Contenido del reporte no disponible.'}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Visualizador de {type === 'workOrder' ? 'Orden de Trabajo' : 'Reporte'}
            </Typography>
            <Box>
              <IconButton onClick={() => window.print()}>
                <Print />
              </IconButton>
              <IconButton>
                <Download />
              </IconButton>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {type === 'workOrder' ? renderWorkOrderReport() : renderGenericReport()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
          <Button variant="contained" startIcon={<Download />}>
            Exportar PDF
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview de Imagen */}
      <Dialog
        open={Boolean(imagePreview)}
        onClose={() => setImagePreview(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {imagePreview?.nombre}
            </Typography>
            <IconButton onClick={() => setImagePreview(null)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box
              sx={{
                width: '100%',
                height: 400,
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Image sx={{ fontSize: 60, color: 'grey.500', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Vista previa de imagen
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {imagePreview?.nombre}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportViewer;
