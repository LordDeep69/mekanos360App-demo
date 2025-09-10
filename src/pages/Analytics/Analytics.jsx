import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search,
  Download,
  BarChart,
  PieChart,
  Timeline,
  TrendingUp,
  Build,
  People,
  LocalShipping,
  Inventory,
  CalendarToday
} from '@mui/icons-material';

// Componente para simular gráficos
const ChartPlaceholder = ({ type, height = 300, title }) => {
  const colors = {
    bar: '#2196f3',
    pie: '#4caf50',
    line: '#ff9800',
    area: '#9c27b0'
  };

  const getIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart fontSize="large" sx={{ color: colors.bar }} />;
      case 'pie':
        return <PieChart fontSize="large" sx={{ color: colors.pie }} />;
      case 'line':
        return <Timeline fontSize="large" sx={{ color: colors.line }} />;
      case 'area':
        return <TrendingUp fontSize="large" sx={{ color: colors.area }} />;
      default:
        return <BarChart fontSize="large" />;
    }
  };

  return (
    <Paper
      sx={{
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${colors[type]}10`,
        border: `1px dashed ${colors[type]}`,
        borderRadius: 2,
        p: 2
      }}
    >
      {getIcon()}
      <Typography variant="h6" sx={{ mt: 2, color: `${colors[type]}` }}>
        {title || `Gráfico ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
        Aquí se mostraría un gráfico real con datos del sistema
      </Typography>
    </Paper>
  );
};

// Componente para tarjetas de KPI
const KpiCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box
              sx={{
                backgroundColor: `${color}15`,
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {React.cloneElement(icon, { sx: { color } })}
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Analytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Análisis y Reportes
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Dashboard" />
          <Tab label="Mantenimiento" />
          <Tab label="Activos" />
          <Tab label="Operaciones" />
        </Tabs>
      </Paper>

      {/* Filtros comunes */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Período</InputLabel>
              <Select
                value={timeRange}
                label="Período"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="week">Última semana</MenuItem>
                <MenuItem value="month">Último mes</MenuItem>
                <MenuItem value="quarter">Último trimestre</MenuItem>
                <MenuItem value="year">Último año</MenuItem>
                <MenuItem value="custom">Personalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de reporte</InputLabel>
              <Select
                value={reportType}
                label="Tipo de reporte"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="preventive">Mantenimiento preventivo</MenuItem>
                <MenuItem value="corrective">Mantenimiento correctivo</MenuItem>
                <MenuItem value="predictive">Mantenimiento predictivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" startIcon={<Download />}>
              Exportar datos
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Dashboard principal */}
      {tabValue === 0 && (
        <>
          {/* KPIs */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <KpiCard
                title="Órdenes de trabajo"
                value="156"
                icon={<Build />}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KpiCard
                title="Activos monitoreados"
                value="342"
                icon={<Inventory />}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KpiCard
                title="Técnicos activos"
                value="28"
                icon={<People />}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KpiCard
                title="Tiempo medio de respuesta"
                value="4.2h"
                icon={<CalendarToday />}
                color="#9c27b0"
              />
            </Grid>
          </Grid>

          {/* Gráficos principales */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ChartPlaceholder
                type="line"
                height={350}
                title="Tendencia de órdenes de trabajo"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ChartPlaceholder
                type="pie"
                height={350}
                title="Distribución por tipo"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartPlaceholder
                type="bar"
                height={300}
                title="Tiempo promedio por categoría"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ChartPlaceholder
                type="area"
                height={300}
                title="Costos de mantenimiento"
              />
            </Grid>
          </Grid>
        </>
      )}

      {/* Análisis de mantenimiento */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Análisis de Mantenimiento
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="bar"
              height={350}
              title="Mantenimientos por tipo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="pie"
              height={350}
              title="Distribución de causas de falla"
            />
          </Grid>
          <Grid item xs={12}>
            <ChartPlaceholder
              type="line"
              height={300}
              title="Tiempo medio entre fallos (MTBF)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="area"
              height={300}
              title="Costos de mantenimiento por categoría"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="bar"
              height={300}
              title="Eficiencia de mantenimiento preventivo"
            />
          </Grid>
        </Grid>
      )}

      {/* Análisis de activos */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Análisis de Activos
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <ChartPlaceholder
              type="bar"
              height={350}
              title="Activos por categoría"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartPlaceholder
              type="pie"
              height={350}
              title="Estado de activos"
            />
          </Grid>
          <Grid item xs={12}>
            <ChartPlaceholder
              type="line"
              height={300}
              title="Valor de activos a lo largo del tiempo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="area"
              height={300}
              title="Depreciación de activos"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="bar"
              height={300}
              title="Frecuencia de mantenimiento por activo"
            />
          </Grid>
        </Grid>
      )}

      {/* Análisis de operaciones */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Análisis de Operaciones
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="line"
              height={350}
              title="Productividad por equipo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder
              type="bar"
              height={350}
              title="Tiempo de inactividad por departamento"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ChartPlaceholder
              type="pie"
              height={300}
              title="Distribución de recursos"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ChartPlaceholder
              type="area"
              height={300}
              title="Tendencia de eficiencia operativa"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Analytics;