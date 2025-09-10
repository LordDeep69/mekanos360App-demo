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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Person,
  Security,
  Business,
  Build,
  Notifications,
  Email,
  CloudUpload,
  Add,
  Edit,
  Delete,
  Save
} from '@mui/icons-material';

// Datos sintéticos para usuarios
const usersData = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@mekanos.com', role: 'Técnico', active: true },
  { id: 2, name: 'María García', email: 'maria.garcia@mekanos.com', role: 'Técnico', active: true },
  { id: 3, name: 'Carlos López', email: 'carlos.lopez@mekanos.com', role: 'Supervisor', active: true },
  { id: 4, name: 'Ana Martínez', email: 'ana.martinez@mekanos.com', role: 'Administrador', active: true },
  { id: 5, name: 'Roberto Sánchez', email: 'roberto.sanchez@mekanos.com', role: 'Gerente', active: true }
];

// Datos sintéticos para roles
const rolesData = [
  { id: 1, name: 'Técnico', permissions: ['ver_ot', 'editar_ot', 'ver_clientes'] },
  { id: 2, name: 'Supervisor', permissions: ['ver_ot', 'editar_ot', 'crear_ot', 'ver_clientes', 'editar_clientes'] },
  { id: 3, name: 'Administrador', permissions: ['ver_ot', 'editar_ot', 'crear_ot', 'eliminar_ot', 'ver_clientes', 'editar_clientes', 'crear_clientes'] },
  { id: 4, name: 'Gerente', permissions: ['*'] }
];

// Datos sintéticos para configuración del sistema
const systemSettings = {
  companyName: 'Mekanos S.A.S.',
  companyLogo: '/assets/images/logo.png',
  companyAddress: 'Calle Principal #123, Cartagena',
  companyPhone: '+57 300 123 4567',
  companyEmail: 'info@mekanos.com',
  notificationsEnabled: true,
  emailNotifications: true,
  pushNotifications: true,
  autoGenerateReports: true,
  defaultLanguage: 'es',
  timezone: 'America/Bogota'
};

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState(usersData);
  const [roles, setRoles] = useState(rolesData);
  const [settings, setSettings] = useState(systemSettings);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Manejadores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenUserDialog = (user = null) => {
    setCurrentUser(user || { name: '', email: '', role: '', active: true });
    setOpenUserDialog(true);
  };

  const handleOpenRoleDialog = (role = null) => {
    setCurrentRole(role || { name: '', permissions: [] });
    setOpenRoleDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
  };

  const handleSaveUser = () => {
    if (currentUser.id) {
      // Actualizar usuario existente
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    } else {
      // Crear nuevo usuario
      setUsers([...users, { ...currentUser, id: users.length + 1 }]);
    }
    setOpenUserDialog(false);
  };

  const handleSaveRole = () => {
    if (currentRole.id) {
      // Actualizar rol existente
      setRoles(roles.map(role => role.id === currentRole.id ? currentRole : role));
    } else {
      // Crear nuevo rol
      setRoles([...roles, { ...currentRole, id: roles.length + 1 }]);
    }
    setOpenRoleDialog(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleSaveSettings = () => {
    // Aquí se implementaría la lógica para guardar la configuración en el backend
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSettingChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Configuración del Sistema</Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<Person />} label="Usuarios" />
          <Tab icon={<Security />} label="Roles y Permisos" />
          <Tab icon={<Business />} label="Empresa" />
          <Tab icon={<Build />} label="Sistema" />
          <Tab icon={<Notifications />} label="Notificaciones" />
        </Tabs>

        {/* Panel de Usuarios */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Gestión de Usuarios</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Add />}
                onClick={() => handleOpenUserDialog()}
              >
                Nuevo Usuario
              </Button>
            </Box>
            
            <List>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText 
                      primary={user.name} 
                      secondary={`${user.email} - ${user.role}`} 
                    />
                    <ListItemSecondaryAction>
                      <Switch 
                        edge="end" 
                        checked={user.active} 
                        onChange={() => {
                          const updatedUsers = users.map(u => 
                            u.id === user.id ? { ...u, active: !u.active } : u
                          );
                          setUsers(updatedUsers);
                        }}
                      />
                      <IconButton edge="end" onClick={() => handleOpenUserDialog(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteUser(user.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Panel de Roles y Permisos */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Roles y Permisos</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Add />}
                onClick={() => handleOpenRoleDialog()}
              >
                Nuevo Rol
              </Button>
            </Box>
            
            <List>
              {roles.map((role) => (
                <React.Fragment key={role.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Security />
                    </ListItemIcon>
                    <ListItemText 
                      primary={role.name} 
                      secondary={`Permisos: ${role.permissions.join(', ')}`} 
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleOpenRoleDialog(role)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteRole(role.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Panel de Configuración de Empresa */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Información de la Empresa</Typography>
            
            {saveSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Configuración guardada correctamente
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre de la Empresa"
                  value={settings.companyName}
                  onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Dirección"
                  value={settings.companyAddress}
                  onChange={(e) => handleSettingChange('companyAddress', e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={settings.companyPhone}
                  onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  value={settings.companyEmail}
                  onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2, textAlign: 'center', p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Logo de la Empresa</Typography>
                  <Box sx={{ height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed grey', mb: 2 }}>
                    {settings.companyLogo ? (
                      <img src={settings.companyLogo} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    ) : (
                      <Typography variant="body2" color="textSecondary">Sin logo</Typography>
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    component="label"
                  >
                    Subir Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        // Aquí se implementaría la lógica para subir la imagen
                        // Por ahora solo simulamos un cambio
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            handleSettingChange('companyLogo', event.target.result);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    onClick={handleSaveSettings}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Panel de Configuración del Sistema */}
        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Configuración del Sistema</Typography>
            
            {saveSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Configuración guardada correctamente
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Idioma Predeterminado</InputLabel>
                  <Select
                    value={settings.defaultLanguage}
                    onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                    label="Idioma Predeterminado"
                  >
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="en">Inglés</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Zona Horaria</InputLabel>
                  <Select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                    label="Zona Horaria"
                  >
                    <MenuItem value="America/Bogota">Bogotá (GMT-5)</MenuItem>
                    <MenuItem value="America/Mexico_City">Ciudad de México (GMT-6)</MenuItem>
                    <MenuItem value="America/Santiago">Santiago (GMT-4)</MenuItem>
                    <MenuItem value="America/Buenos_Aires">Buenos Aires (GMT-3)</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Generación de Reportes</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={settings.autoGenerateReports}
                      onChange={(e) => handleSettingChange('autoGenerateReports', e.target.checked)}
                    />
                    <Typography>Generar reportes automáticamente al cerrar OT</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    onClick={handleSaveSettings}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Panel de Notificaciones */}
        {tabValue === 4 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Configuración de Notificaciones</Typography>
            
            {saveSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Configuración guardada correctamente
              </Alert>
            )}
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText 
                  primary="Notificaciones del Sistema" 
                  secondary="Habilitar o deshabilitar todas las notificaciones" 
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={settings.notificationsEnabled} 
                    onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText 
                  primary="Notificaciones por Correo" 
                  secondary="Recibir alertas y actualizaciones por correo electrónico" 
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={settings.emailNotifications} 
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    disabled={!settings.notificationsEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText 
                  primary="Notificaciones Push" 
                  secondary="Recibir notificaciones push en dispositivos móviles" 
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={settings.pushNotifications} 
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    disabled={!settings.notificationsEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSaveSettings}
              >
                Guardar Cambios
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Diálogo para crear/editar usuario */}
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentUser && currentUser.id ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={currentUser ? currentUser.name : ''}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            value={currentUser ? currentUser.email : ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              value={currentUser ? currentUser.role : ''}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              label="Rol"
            >
              {roles.map(role => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography>Usuario Activo</Typography>
            <Switch 
              checked={currentUser ? currentUser.active : true} 
              onChange={(e) => setCurrentUser({ ...currentUser, active: e.target.checked })}
              sx={{ ml: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para crear/editar rol */}
      <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentRole && currentRole.id ? 'Editar Rol' : 'Nuevo Rol'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre del Rol"
            value={currentRole ? currentRole.name : ''}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
            margin="normal"
          />
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Permisos</Typography>
          
          {/* Lista de permisos disponibles */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['ver_ot', 'editar_ot', 'crear_ot', 'eliminar_ot', 'ver_clientes', 'editar_clientes', 'crear_clientes', 'eliminar_clientes', '*'].map((permission) => (
              <Chip 
                key={permission}
                label={permission === '*' ? 'Todos los permisos' : permission}
                color={currentRole && currentRole.permissions && currentRole.permissions.includes(permission) ? 'primary' : 'default'}
                onClick={() => {
                  if (permission === '*') {
                    setCurrentRole({ ...currentRole, permissions: ['*'] });
                  } else {
                    const newPermissions = currentRole && currentRole.permissions ? [...currentRole.permissions] : [];
                    if (newPermissions.includes('*')) {
                      // Si tenía todos los permisos, quitamos ese y añadimos todos menos el actual
                      setCurrentRole({ 
                        ...currentRole, 
                        permissions: ['ver_ot', 'editar_ot', 'crear_ot', 'eliminar_ot', 'ver_clientes', 'editar_clientes', 'crear_clientes', 'eliminar_clientes'].filter(p => p !== permission)
                      });
                    } else if (newPermissions.includes(permission)) {
                      // Quitar permiso
                      setCurrentRole({ 
                        ...currentRole, 
                        permissions: newPermissions.filter(p => p !== permission)
                      });
                    } else {
                      // Añadir permiso
                      setCurrentRole({ 
                        ...currentRole, 
                        permissions: [...newPermissions, permission]
                      });
                    }
                  }
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog}>Cancelar</Button>
          <Button onClick={handleSaveRole} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;