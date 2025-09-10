// src/components/BitacoraGenerator.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert
} from '@mui/material';
import {
  PictureAsPdf,
  Download,
  Visibility,
  Close
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BitacoraGenerator = ({ bitacora, open, onClose }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('bitacora-content');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`bitacora-${bitacora.id}.pdf`);
      setSnackbar({ open: true, message: 'Bitácora descargada exitosamente' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSnackbar({ open: true, message: 'Error al generar PDF', severity: 'error' });
    }
  };

  if (!bitacora) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Bitácora {bitacora.id}</Typography>
            <Button startIcon={<Close />} onClick={onClose}>Cerrar</Button>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box id="bitacora-content" sx={{ p: 2 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" gutterBottom>BITÁCORA DE MANTENIMIENTO</Typography>
              <Typography variant="h6" color="primary">{bitacora.id}</Typography>
            </Box>

            {/* Información General */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Información General</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2"><strong>Cliente:</strong> {bitacora.client_name}</Typography>
                    <Typography variant="body2"><strong>Activo:</strong> {bitacora.asset_name}</Typography>
                    <Typography variant="body2"><strong>Fecha:</strong> {bitacora.date}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2"><strong>Técnico:</strong> {bitacora.technician}</Typography>
                    <Typography variant="body2"><strong>Tipo:</strong> {bitacora.type}</Typography>
                    <Typography variant="body2"><strong>Duración:</strong> {bitacora.duration_hours} horas</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Actividades Realizadas */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Actividades Realizadas</Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Hora</strong></TableCell>
                        <TableCell><strong>Actividad</strong></TableCell>
                        <TableCell><strong>Observaciones</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bitacora.activities.map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell>{activity.time}</TableCell>
                          <TableCell>{activity.activity}</TableCell>
                          <TableCell>{activity.observations}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Materiales Utilizados */}
            {bitacora.materials_used && bitacora.materials_used.length > 0 && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Materiales Utilizados</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Material</strong></TableCell>
                          <TableCell><strong>Cantidad</strong></TableCell>
                          <TableCell><strong>Unidad</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bitacora.materials_used.map((material, index) => (
                          <TableRow key={index}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{material.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {/* Evidencias */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Evidencias</Typography>
                <Typography variant="body2">📷 Fotografías tomadas: {bitacora.photos}</Typography>
                {bitacora.signature && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>Firma del Cliente:</Typography>
                    <img 
                      src={bitacora.signature} 
                      alt="Firma del cliente" 
                      style={{ maxWidth: 200, border: '1px solid #ccc' }} 
                    />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Bitácora generada el {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button startIcon={<Visibility />} onClick={() => setSnackbar({ open: true, message: 'Vista previa en pantalla' })}>
            Vista Previa
          </Button>
          <Button startIcon={<Download />} onClick={handleDownloadPDF} variant="contained">
            Descargar PDF
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity || 'success'} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BitacoraGenerator;
