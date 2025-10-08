import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  // Utilidad para obtener URL de imagen (con placeholder si la real no existe)
  const getImageUrl = (foto, index) => {
    // Si la foto tiene una URL válida (http, https o data:image), usarla directamente
    if (foto.url && (
      foto.url.startsWith('http://') || 
      foto.url.startsWith('https://') || 
      foto.url.startsWith('data:image')
    )) {
      return foto.url;
    }
    
    // Si la URL comienza con /uploads o no existe, usar placeholder de demostración
    if (!foto.url || foto.url.startsWith('/uploads') || foto.url.startsWith('/')) {
      // Usar imágenes de demostración de mantenimiento de Unsplash
      const demoImages = [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop', // Herramientas
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop', // Equipo industrial
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop', // Medición
        'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&h=400&fit=crop', // HVAC
        'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop', // Técnico
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop'  // Industrial
      ];
      return demoImages[index % demoImages.length];
    }
    
    return foto.url;
  };

  // Utilidad para convertir imagen a base64
  const getImageBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = function (err) { reject(err); };
      img.src = url;
    });
  };

  // Función para descargar el PDF con imágenes y diseño profesional
  const handleDownloadPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Colores corporativos
    const primaryColor = [41, 128, 185]; // Azul
    const secondaryColor = [52, 73, 94]; // Gris oscuro
    const accentColor = [46, 204, 113]; // Verde
    const lightGray = [236, 240, 241];
    
    let y = 10;
    
    // ========== ENCABEZADO ==========
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('MEKANOS 360', 15, 20);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Reporte de Mantenimiento', 15, 28);
    
    doc.setFontSize(9);
    doc.text(`ID: ${data.id}`, 150, 20);
    doc.text(`Fecha: ${new Date(data.fechaFinalizacion || data.fechaGeneracion || Date.now()).toLocaleDateString('es-ES')}`, 150, 25);
    
    y = 50;
    
    // ========== INFORMACIÓN GENERAL ==========
    doc.setTextColor(...secondaryColor);
    doc.setFillColor(...lightGray);
    doc.rect(10, y, 190, 8, 'F');
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('INFORMACIÓN GENERAL', 15, y + 5.5);
    
    y += 12;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    const infoData = [
      ['Cliente:', data.cliente || data.client || 'N/A'],
      ['Activo:', data.activoNombre || data.asset || 'N/A'],
      ['Técnico:', data.tecnicoAsignado || data.technician || 'N/A'],
      ['Tipo:', `${data.tipo || data.type || 'N/A'} - ${data.subtipo || ''}`],
      ['Duración:', `${data.tiempoReal || data.actualDuration || 'N/A'} horas`],
      ['Estado:', 'COMPLETADA ✓']
    ];
    
    infoData.forEach(([label, value]) => {
      doc.setFont(undefined, 'bold');
      doc.text(label, 15, y);
      doc.setFont(undefined, 'normal');
      doc.text(value, 60, y);
      y += 6;
    });
    
    y += 5;
    
    // ========== RESUMEN EJECUTIVO ==========
    if (data.resumenEjecutivo || data.observaciones) {
      doc.setFillColor(...lightGray);
      doc.rect(10, y, 190, 8, 'F');
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('RESUMEN EJECUTIVO', 15, y + 5.5);
      
      y += 12;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const resumen = data.resumenEjecutivo || data.observaciones || data.description || '';
      const resumenLines = doc.splitTextToSize(resumen, 180);
      doc.text(resumenLines, 15, y);
      y += (resumenLines.length * 5) + 8;
    }
    
    // ========== MEDICIONES ==========
    if (data.checklist?.items) {
      const mediciones = data.checklist.items.filter(item => item.valor);
      if (mediciones.length > 0) {
        if (y > 240) { doc.addPage(); y = 15; }
        
        doc.setFillColor(...accentColor);
        doc.rect(10, y, 190, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('MEDICIONES REALIZADAS', 15, y + 5.5);
        
        y += 12;
        doc.setTextColor(...secondaryColor);
        
        const tableData = mediciones.map(item => [
          item.descripcion,
          item.valor,
          item.rangoMinimo !== undefined ? `${item.rangoMinimo} - ${item.rangoMaximo} ${item.unidad || ''}` : 'N/A',
          item.estado || 'OK'
        ]);
        
        autoTable(doc, {
          startY: y,
          head: [['Parámetro', 'Valor Medido', 'Rango Normal', 'Estado']],
          body: tableData,
          theme: 'striped',
          headStyles: { 
            fillColor: primaryColor,
            fontSize: 9,
            fontStyle: 'bold'
          },
          bodyStyles: { 
            fontSize: 8 
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          margin: { left: 15, right: 15 }
        });
        
        y = doc.lastAutoTable.finalY + 10;
      }
    }
    
    // ========== RECOMENDACIONES ==========
    if (data.recomendaciones && data.recomendaciones.length > 0) {
      if (y > 240) { doc.addPage(); y = 15; }
      
      doc.setFillColor(255, 193, 7);
      doc.rect(10, y, 190, 8, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('⚠ RECOMENDACIONES', 15, y + 5.5);
      
      y += 12;
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      
      data.recomendaciones.forEach((rec, index) => {
        if (y > 270) { doc.addPage(); y = 15; }
        const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 175);
        doc.text(recLines, 15, y);
        y += (recLines.length * 5) + 3;
      });
      
      y += 5;
    }

    // ========== EVIDENCIAS FOTOGRÁFICAS ==========
    const fotos = (data.multimedia && data.multimedia.fotos) ? data.multimedia.fotos : [];
    if (fotos.length > 0) {
      if (y > 230) { doc.addPage(); y = 15; }
      
      doc.setFillColor(...primaryColor);
      doc.rect(10, y, 190, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('📷 EVIDENCIAS FOTOGRÁFICAS', 15, y + 5.5);
      
      y += 15;
      doc.setTextColor(...secondaryColor);
      
      for (let i = 0; i < fotos.length; i++) {
        const foto = fotos[i];
        try {
          const imageUrl = getImageUrl(foto, i);
          const imgData = await getImageBase64(imageUrl);
          
          if (y > 210) { 
            doc.addPage(); 
            y = 15; 
          }
          
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.5);
          doc.rect(15, y, 80, 60);
          doc.addImage(imgData, 'JPEG', 16, y + 1, 78, 58);
          
          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.text(`Foto ${i + 1}:`, 100, y + 5);
          doc.setFont(undefined, 'normal');
          const descLines = doc.splitTextToSize(foto.descripcion || foto.description || 'Sin descripción', 90);
          doc.text(descLines, 100, y + 12);
          
          if (foto.fecha || foto.timestamp) {
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(`Fecha: ${new Date(foto.fecha || foto.timestamp).toLocaleString('es-ES')}`, 100, y + 25);
            doc.setTextColor(...secondaryColor);
          }
          
          y += 68;
          
        } catch (e) {
          doc.setFontSize(9);
          doc.text(`📷 ${foto.descripcion || foto.description || `Foto ${i + 1}`}`, 15, y);
          y += 8;
        }
      }
    }
    
    // ========== PIE DE PÁGINA ==========
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${pageCount} | Generado el ${new Date().toLocaleString('es-ES')} | MEKANOS 360`,
        105,
        290,
        { align: 'center' }
      );
    }

    doc.save(`Reporte_${data.id || 'mantenimiento'}_${new Date().getTime()}.pdf`);
  };

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
              <strong>Cliente:</strong> {data.cliente || data.client || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Activo:</strong> {data.activoNombre || data.asset || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Estado:</strong> 
              <Chip 
                label={data.estado || data.status || 'N/A'} 
                color={data.estado === 'COMPLETADA' || data.status === 'Completada' ? 'success' : 'primary'} 
                size="small" 
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Prioridad:</strong> 
              <Chip 
                label={data.prioridad || data.priority || 'N/A'} 
                color={data.prioridad === 'Alta' || data.priority === 'Alta' ? 'error' : data.prioridad === 'Media' || data.priority === 'Media' ? 'warning' : 'info'} 
                size="small" 
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tipo:</strong> {data.tipo || data.type || 'N/A'}
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
              <strong>Técnico Asignado:</strong> {data.tecnicoAsignado || data.assignedTechnician || 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha Programada:</strong> {data.fechaProgramada || data.scheduledDate ? new Date(data.fechaProgramada || data.scheduledDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de Inicio:</strong> {data.fechaInicio || data.startDate ? new Date(data.fechaInicio || data.startDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Fecha de Finalización:</strong> {data.fechaFinalizacion || data.completionDate ? new Date(data.fechaFinalizacion || data.completionDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Duración Estimada:</strong> {data.tiempoEstimado || data.estimatedDuration || 'N/A'} h
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tiempo Real:</strong> {data.tiempoReal || data.actualDuration || 'N/A'} h
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Resumen Ejecutivo */}
      {(data.resumenEjecutivo || data.observaciones) && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen Ejecutivo
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                {data.resumenEjecutivo || data.observaciones}
              </Typography>
              
              {/* Recomendaciones */}
              {data.recomendaciones && data.recomendaciones.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Recomendaciones:
                  </Typography>
                  <List dense>
                    {data.recomendaciones.map((rec, index) => (
                      <ListItem key={index} sx={{ pl: 0 }}>
                        <ListItemText 
                          primary={`• ${rec}`}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );

  const renderChecklist = () => {
    // Verificar si el checklist existe y tiene items
    const checklistItems = data.checklist?.items || data.checklist || [];
    
    if (checklistItems.length === 0) {
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
              <TableCell>Medición / Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checklistItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.completado || item.completed ? (
                    <Chip 
                      icon={<CheckCircle />} 
                      label={item.estado || 'OK'} 
                      color={item.estado === 'OK' ? 'success' : 'warning'}
                      size="small"
                    />
                  ) : (
                    <Chip 
                      icon={<Cancel />} 
                      label="Pendiente" 
                      color="error"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {item.descripcion || item.item || item.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* Mostrar medición si existe */}
                  {item.valor && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        📊 {item.valor}
                      </Typography>
                      {item.rangoMinimo !== undefined && item.rangoMaximo !== undefined && (
                        <Typography variant="caption" color="text.secondary">
                          Rango: {item.rangoMinimo} - {item.rangoMaximo} {item.unidad || ''}
                        </Typography>
                      )}
                    </Box>
                  )}
                  {/* Observaciones */}
                  <Typography variant="body2" color="text.secondary">
                    {item.observaciones || item.notes || item.observations || 'N/A'}
                  </Typography>
                </TableCell>
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
    // Buscar evidencia en diferentes estructuras de datos
    let evidence = [];
    
    if (data.multimediaEvidence) {
      evidence = data.multimediaEvidence;
    } else if (data.evidence) {
      evidence = data.evidence;
    } else if (data.multimedia && data.multimedia.fotos) {
      // Convertir estructura multimedia.fotos a formato compatible
      evidence = data.multimedia.fotos.map((foto, index) => ({
        type: 'image',
        url: getImageUrl(foto, index), // Usar getImageUrl para placeholders
        description: foto.descripcion || foto.description,
        timestamp: foto.fecha || foto.timestamp
      }));
    }
    
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
                  image={item.url || `https://placehold.co/600x400/cccccc/333333?text=Imagen+${index + 1}`}
                  alt={item.description || `Evidencia ${index + 1}`}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x400/cccccc/333333?text=Error+cargando`;
                  }}
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
        <Button variant="contained" onClick={handleDownloadPDF}>
          Exportar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportViewer;
