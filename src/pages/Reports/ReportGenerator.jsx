import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Paper, Typography } from '@mui/material'
import ReportGenerator from '@components/ReportGenerator'

export default function ReportPreviewPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const report = state?.report

  if (!report) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No hay reporte para mostrar</Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/reports')}>Volver</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <ReportGenerator title={`Reporte ${report.id}`}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Información General</Typography>
          <Typography variant="body1"><strong>OT:</strong> {report.work_order_id}</Typography>
          <Typography variant="body1"><strong>Cliente:</strong> {report.client_name}</Typography>
          <Typography variant="body1"><strong>Activo:</strong> {report.asset_name}</Typography>
          <Typography variant="body1"><strong>Técnico:</strong> {report.technician}</Typography>
          <Typography variant="body1"><strong>Fecha:</strong> {new Date(report.date_generated).toLocaleString()}</Typography>
          <Typography variant="body1"><strong>Tipo:</strong> {report.type}</Typography>
          <Typography variant="body1"><strong>Duración:</strong> {report.duration_hours} horas</Typography>
          <Typography variant="body1"><strong>Costo Total:</strong> ${report.total_cost?.toLocaleString() || '0'}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Hallazgos</Typography>
          <Typography variant="body2">{report.findings}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Acciones Realizadas</Typography>
          <Typography variant="body2">{report.actions_taken}</Typography>
        </Box>

        {report.checklist_completed && report.checklist_completed.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Checklist Completado</Typography>
            {report.checklist_completed.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 200 }}>{item.task}</Typography>
                <Typography variant="body2" sx={{ minWidth: 100, color: item.status === 'OK' ? 'green' : 'orange' }}>
                  {item.status}
                </Typography>
                {item.value && <Typography variant="body2" sx={{ ml: 2 }}>Valor: {item.value}</Typography>}
                {item.observations && <Typography variant="body2" sx={{ ml: 2, fontStyle: 'italic' }}>({item.observations})</Typography>}
              </Box>
            ))}
          </Box>
        )}

        {report.parts_used && report.parts_used.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Repuestos Utilizados</Typography>
            {report.parts_used.map((part, index) => (
              <Typography key={index} variant="body2">
                • {part.name} - Cantidad: {part.quantity} {part.unit}
                {part.cost && ` - Costo: $${part.cost.toLocaleString()}`}
              </Typography>
            ))}
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Evidencias</Typography>
          <Typography variant="body2">Fotografías tomadas: {report.photos}</Typography>
          {report.signature && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>Firma del Cliente:</Typography>
              <img src={report.signature} alt="Firma del cliente" style={{ maxWidth: 200, border: '1px solid #ccc' }} />
            </Box>
          )}
        </Box>
      </ReportGenerator>
    </Box>
  )
}


