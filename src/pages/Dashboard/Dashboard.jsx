// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  CheckCircle,
  Warning,
  Refresh,
  Fullscreen,
  MoreVert,
  Speed,
  Engineering,
  LocalShipping,
  AttachMoney,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import GaugeChart from 'react-gauge-chart';
import CountUp from 'react-countup';
import { MapContainer, TileLayer, Marker, Popup, Circle as MapCircle } from 'react-leaflet';
import L from 'leaflet';

// Fix para iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Data
const kpiData = [
  { nombre: 'CUMPLIMIENTO', valor: 92, meta: 95, icono: <CheckCircle />, color: '#4caf50' },
  { nombre: 'TTR', valor: 2.5, meta: 2, unidad: 'hrs', icono: <AccessTime />, color: '#2196f3' },
  { nombre: 'MTTR', valor: 4.2, meta: 4, unidad: 'hrs', icono: <Engineering />, color: '#ff9800' },
  { nombre: 'MTBF', valor: 720, meta: 800, unidad: 'hrs', icono: <Speed />, color: '#9c27b0' },
  { nombre: 'INSTRUMENTOS', valor: 95, meta: 100, unidad: '%', icono: <CheckCircle />, color: '#00bcd4' },
];

const comercialData = [
  { nombre: 'Conversión REC→COT', valor: 45, tendencia: 'up' },
  { nombre: 'Margen Promedio', valor: 28, tendencia: 'stable' },
  { nombre: 'Rotación Inventario', valor: 4.2, tendencia: 'up' },
];

const carteraData = [
  { rango: '0-30 días', monto: 20000000, porcentaje: 45 },
  { rango: '31-60 días', monto: 8000000, porcentaje: 18 },
  { rango: '61-90 días', monto: 5000000, porcentaje: 11 },
  { rango: '90+ días', monto: 2000000, porcentaje: 5 },
];

const actividadReciente = [
  { tipo: 'OT', mensaje: 'OT-2025-043 completada', tiempo: 'Hace 5 min', estado: 'success' },
  { tipo: 'Alerta', mensaje: 'Stock bajo en FIL-001', tiempo: 'Hace 15 min', estado: 'warning' },
  { tipo: 'Cliente', mensaje: 'Nueva cotización aprobada', tiempo: 'Hace 30 min', estado: 'info' },
  { tipo: 'Sistema', mensaje: 'Backup completado', tiempo: 'Hace 1 hora', estado: 'success' },
];

const tecnicosActivos = [
  { id: 1, nombre: 'Juan Pérez', lat: 10.4, lng: -75.5, estado: 'En ruta', ots: 3 },
  { id: 2, nombre: 'Carlos López', lat: 10.42, lng: -75.48, estado: 'En sitio', ots: 2 },
  { id: 3, nombre: 'María García', lat: 10.38, lng: -75.52, estado: 'Disponible', ots: 0 },
];

function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('hoy');
  const [tabValue, setTabValue] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 300000); // 5 minutos
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const KPICard = ({ kpi }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{ bgcolor: kpi.color + '20', color: kpi.color }}>
            {kpi.icono}
          </Avatar>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
        
        <Typography variant="h4" fontWeight="bold">
          <CountUp end={kpi.valor} decimals={kpi.valor < 10 ? 1 : 0} duration={2} />
          {kpi.unidad && <Typography component="span" variant="h6" color="text.secondary"> {kpi.unidad}</Typography>}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {kpi.nombre}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption">Meta: {kpi.meta}{kpi.unidad}</Typography>
            <Typography variant="caption" color={kpi.valor >= kpi.meta ? 'success.main' : 'warning.main'}>
              {((kpi.valor / kpi.meta) * 100).toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min((kpi.valor / kpi.meta) * 100, 100)}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: kpi.valor >= kpi.meta ? 'success.main' : 'warning.main',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Dashboard Ejecutivo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Última actualización: {new Date().toLocaleString('es-CO')}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <MenuItem value="hoy">Hoy</MenuItem>
              <MenuItem value="semana">Esta Semana</MenuItem>
              <MenuItem value="mes">Este Mes</MenuItem>
              <MenuItem value="año">Este Año</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Actualizando...' : 'Actualizar'}
          </Button>
          
          <Button variant="contained" startIcon={<Fullscreen />}>
            Presentación
          </Button>
        </Box>
      </Box>

      {refreshing && <LinearProgress sx={{ mb: 2 }} />}

      {/* KPIs Operativos */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
        KPIs Operativos en Tiempo Real
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <KPICard kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Métricas Comerciales y Mapa */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Métricas Comerciales y Financieras
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {comercialData.map((metrica, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="bold">
                      {metrica.valor}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {metrica.nombre}
                    </Typography>
                    <Box>
                      {metrica.tendencia === 'up' ? (
                        <TrendingUp color="success" />
                      ) : (
                        <TrendingDown color="error" />
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle2" gutterBottom>
              Cartera por Edades
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={carteraData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rango" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                <Bar dataKey="monto" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Mapa de Calor Operativo + Tracking Live
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Chip label={`Técnicos activos: 12/15`} color="primary" />
              <Chip label={`OTs en proceso: 18`} color="warning" />
              <Chip label={`2 críticas`} color="error" />
            </Box>

            <MapContainer 
              center={[10.4, -75.5]} 
              zoom={12} 
              style={{ height: 280, borderRadius: 8 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {tecnicosActivos.map((tecnico) => (
                <Marker key={tecnico.id} position={[tecnico.lat, tecnico.lng]}>
                  <Popup>
                    <strong>{tecnico.nombre}</strong><br />
                    Estado: {tecnico.estado}<br />
                    OTs: {tecnico.ots}
                  </Popup>
                </Marker>
              ))}
              <MapCircle center={[10.4, -75.5]} radius={2000} color="red" fillOpacity={0.1} />
            </MapContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Actividad Reciente */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Actividad Reciente
        </Typography>
        <Box>
          {actividadReciente.map((actividad, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                borderBottom: index < actividadReciente.length - 1 ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={actividad.tipo} 
                  size="small" 
                  color={
                    actividad.estado === 'success' ? 'success' :
                    actividad.estado === 'warning' ? 'warning' : 'default'
                  }
                />
                <Typography>{actividad.mensaje}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {actividad.tiempo}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default Dashboard;