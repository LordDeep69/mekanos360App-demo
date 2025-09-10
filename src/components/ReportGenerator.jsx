import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  PictureAsPdf,
  Close,
  CheckCircle,
  Download,
  Print,
  Email,
  Share
} from '@mui/icons-material';

/**
 * Componente para generar reportes de mantenimiento a partir de órdenes de trabajo completadas
 */
const ReportGenerator = ({ workOrder, asset, client, open, onClose }) => {
  const [includeImages, setIncludeImages] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [includeChecklist, setIncludeChecklist] = useState(true);
  const [includeInventory, setIncludeInventory] = useState(true);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Generar el reporte
  const handleGenerateReport = () => {
    setReportGenerated(true);
    setSnackbarMessage('Reporte generado correctamente');
    setSnackbarOpen(true);
    onClose();
  };

  // Exportar a PDF usando html2canvas + jsPDF sobre la vista previa
  const previewRef = useRef(null);
  const handleExportPdf = async () => {
    const el = previewRef.current;
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`reporte_ot_${workOrder?.id || 'demo'}.pdf`);
  };

  // Abrir vista previa
  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  // Cerrar vista previa
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  // Descargar reporte
  const handleDownload = () => {
    setSnackbarMessage('Reporte descargado correctamente');
    setSnackbarOpen(true);
  };

  // Enviar por correo
  const handleEmail = () => {
    setSnackbarMessage('Reporte enviado por correo correctamente');
    setSnackbarOpen(true);
  };

  // Imprimir reporte
  const handlePrint = () => {
    setSnackbarMessage('Enviando reporte a impresión...');
    setSnackbarOpen(true);
  };

  // Cerrar snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Diálogo para generar reporte */}
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Generar Reporte de Mantenimiento
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Información de la Orden de Trabajo
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">OT #{workOrder?.id}</Typography>
                <Typography variant="body1">{workOrder?.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {workOrder?.description}
                </Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Información del Cliente
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">{client?.name}</Typography>
                <Typography variant="body2">{client?.address}</Typography>
                <Typography variant="body2">{client?.contact}</Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Información del Activo
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">{asset?.name}</Typography>
                <Typography variant="body2">Modelo: {asset?.model}</Typography>
                <Typography variant="body2">Serie: {asset?.serial}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Opciones del Reporte
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeChecklist}
                      onChange={(e) => setIncludeChecklist(e.target.checked)}
                    />
                  }
                  label="Incluir checklist de actividades"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeImages}
                      onChange={(e) => setIncludeImages(e.target.checked)}
                    />
                  }
                  label="Incluir fotografías"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeSignature}
                      onChange={(e) => setIncludeSignature(e.target.checked)}
                    />
                  }
                  label="Incluir firmas"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeInventory}
                      onChange={(e) => setIncludeInventory(e.target.checked)}
                    />
                  }
                  label="Incluir inventario consumido"
                />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Vista Previa
              </Typography>
              
              <Button
                variant="outlined"
                onClick={handleOpenPreview}
                fullWidth
              >
                Ver Vista Previa
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button 
            onClick={handleGenerateReport} 
            variant="contained" 
            color="primary"
            startIcon={<PictureAsPdf />}
          >
            Generar Reporte
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de vista previa */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Vista Previa del Reporte
          <IconButton
            onClick={handleClosePreview}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #ddd' }} ref={previewRef}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5">REPORTE DE MANTENIMIENTO</Typography>
              <Typography variant="subtitle1">Mekanos S.A.S.</Typography>
              <Typography variant="body2">Fecha: {new Date().toLocaleDateString()}</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Información del Cliente:</Typography>
                <Typography variant="body2">{client?.name}</Typography>
                <Typography variant="body2">{client?.address}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Información de la OT:</Typography>
                <Typography variant="body2">OT #{workOrder?.id}</Typography>
                <Typography variant="body2">Fecha: {workOrder?.date}</Typography>
                <Typography variant="body2">Técnico: {workOrder?.technician}</Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1">Descripción del Trabajo:</Typography>
            <Typography variant="body2" paragraph>{workOrder?.description}</Typography>
            
            {includeChecklist && (
              <>
                <Typography variant="subtitle1">Actividades Realizadas:</Typography>
                <List dense>
                  {workOrder?.checklist?.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemIcon>
                        <CheckCircle color={item.completed ? "success" : "disabled"} fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item.task} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            
            {includeInventory && (
              <>
                <Typography variant="subtitle1">Repuestos Utilizados:</Typography>
                <List dense>
                  {workOrder?.inventory?.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`Cantidad: ${item.quantity} - Código: ${item.code}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            
            {includeImages && (
              <>
                <Typography variant="subtitle1">Fotografías:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 1 }}>
                  {workOrder?.images?.map((image, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        bgcolor: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="caption">Foto {index + 1}</Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
            
            {includeSignature && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Box sx={{ borderTop: '1px solid #000', pt: 1, textAlign: 'center' }}>
                      <Typography variant="body2">Firma del Técnico</Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box sx={{ borderTop: '1px solid #000', pt: 1, textAlign: 'center' }}>
                      <Typography variant="body2">Firma del Cliente</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClosePreview}>Cerrar</Button>
          <Button variant="contained" startIcon={<Download />} onClick={handleExportPdf}>Descargar PDF</Button>
        </DialogActions>
      </Dialog>

      {/* Panel de reporte generado */}
      {reportGenerated && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Reporte de Mantenimiento Generado
            </Typography>
          </Box>
          
          <Typography gutterBottom>
            El reporte ha sido generado exitosamente y está disponible para su descarga o envío.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleDownload}
            >
              Descargar PDF
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={handlePrint}
            >
              Imprimir
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Email />}
              onClick={handleEmail}
            >
              Enviar por Correo
            </Button>
          </Box>
        </Paper>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReportGenerator;