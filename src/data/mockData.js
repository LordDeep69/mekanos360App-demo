// src/data/mockData.js
// Archivo de datos simulados para la aplicación

// Datos simulados para clientes
export const mockClients = [
  { 
    id: 1, 
    name: 'Hotel Caribe S.A.', 
    address: 'Cra 1 #5-87, Bocagrande', 
    phone: '555-1234',
    nit: '890.123.456-7',
    contact: 'Juan Carlos Pérez',
    email: 'jperez@hotelcaribe.com',
    category: 'Hotelero',
    status: 'Activo'
  },
  { 
    id: 2, 
    name: 'Comfenalco', 
    address: 'Calle 30 #89-15, Torre Norte', 
    phone: '555-5678',
    nit: '890.234.567-8',
    contact: 'Ana Martínez',
    email: 'amartinez@comfenalco.com',
    category: 'Salud',
    status: 'Activo'
  },
  { 
    id: 3, 
    name: 'C.C. La Plazuela', 
    address: 'Diagonal 35 #71-77', 
    phone: '555-9012',
    nit: '890.345.678-9',
    contact: 'Carlos López',
    email: 'clopez@plazuela.com',
    category: 'Comercial',
    status: 'Activo'
  },
  { 
    id: 4, 
    name: 'Edificio Marina', 
    address: 'Carrera 2 #8-45', 
    phone: '555-3456',
    nit: '890.456.789-0',
    contact: 'María García',
    email: 'mgarcia@edificiomarina.com',
    category: 'Residencial',
    status: 'Activo'
  }
];

// Datos simulados para activos
export const mockAssets = [
  { 
    id: 1, 
    name: 'Planta Eléctrica 150KVA', 
    type: 'Planta Eléctrica', 
    client_id: 1,
    client_name: 'Hotel Caribe S.A.',
    site: 'Sede Principal',
    brand: 'Cummins',
    model: 'C150D5',
    serial: 'CUM2024-1234',
    power: '150 KVA',
    year: 2020,
    status: 'Activo',
    criticality: 'Alta',
    location: 'Sótano 2',
    coordinates: { lat: 10.4, lng: -75.5 }
  },
  { 
    id: 2, 
    name: 'Sistema de Bombeo 10HP', 
    type: 'Bomba', 
    client_id: 1,
    client_name: 'Hotel Caribe S.A.',
    site: 'Sede Principal',
    brand: 'Barnes',
    model: '5HP',
    serial: 'BAR2024-5678',
    power: '10 HP',
    year: 2019,
    status: 'Activo',
    criticality: 'Media',
    location: 'Sótano 1',
    coordinates: { lat: 10.4, lng: -75.5 }
  },
  { 
    id: 3, 
    name: 'Planta Eléctrica 75KVA', 
    type: 'Planta Eléctrica', 
    client_id: 2,
    client_name: 'Comfenalco',
    site: 'Torre Norte',
    brand: 'Perkins',
    model: 'P75',
    serial: 'PER2024-9012',
    power: '75 KVA',
    year: 2021,
    status: 'En Mantenimiento',
    criticality: 'Alta',
    location: 'Sótano 3',
    coordinates: { lat: 10.42, lng: -75.48 }
  },
  { 
    id: 4, 
    name: 'Sistema de Refrigeración', 
    type: 'Refrigeración', 
    client_id: 3,
    client_name: 'C.C. La Plazuela',
    site: 'Centro Comercial',
    brand: 'Carrier',
    model: 'CR-50',
    serial: 'CAR2024-3456',
    power: '50 TR',
    year: 2020,
    status: 'Activo',
    criticality: 'Media',
    location: 'Terraza',
    coordinates: { lat: 10.38, lng: -75.52 }
  }
];

// Datos simulados para técnicos
export const mockTechnicians = [
  { 
    id: 1, 
    name: 'Juan Pérez', 
    specialty: 'Mecánico', 
    phone: '555-1111',
    email: 'jperez@mekanos.com',
    experience: '8 años',
    certifications: ['Cummins', 'Perkins'],
    status: 'Activo',
    currentLocation: { lat: 10.4, lng: -75.5 }
  },
  { 
    id: 2, 
    name: 'Carlos López', 
    specialty: 'Eléctrico', 
    phone: '555-2222',
    email: 'clopez@mekanos.com',
    experience: '6 años',
    certifications: ['Siemens', 'Schneider'],
    status: 'Activo',
    currentLocation: { lat: 10.42, lng: -75.48 }
  },
  { 
    id: 3, 
    name: 'María García', 
    specialty: 'Electrónico', 
    phone: '555-3333',
    email: 'mgarcia@mekanos.com',
    experience: '5 años',
    certifications: ['ABB', 'Rockwell'],
    status: 'Disponible',
    currentLocation: { lat: 10.38, lng: -75.52 }
  }
];

// Datos simulados para órdenes de trabajo
export const mockWorkOrders = [
  { 
    id: 'OT-2025-043',
    client: 'Hotel Caribe S.A.',
    client_id: 1,
    site: 'Sede Principal',
    asset: 'Planta Eléctrica 150KVA',
    asset_id: 1,
    type: 'Mantenimiento Tipo A',
    priority: 'Alta',
    date: '2025-01-21',
    time: '08:00',
    technician: 'Juan Pérez',
    technician_id: 1,
    status: 'EN RUTA',
    description: 'Mantenimiento preventivo mensual de planta eléctrica',
    estimatedHours: 3,
    actualHours: null,
    materials: [
      { id: 'FIL-001', name: 'Filtro aceite C8', quantity: 2, unit: 'unidad' },
      { id: 'ACE-001', name: 'Aceite 15W40', quantity: 8, unit: 'litro' }
    ],
    checklist: [
      { id: 1, task: 'Inspección visual del equipo', completed: false, required: true },
      { id: 2, task: 'Verificar niveles de aceite', completed: false, required: true },
      { id: 3, task: 'Cambio de filtros', completed: false, required: true },
      { id: 4, task: 'Prueba de funcionamiento', completed: false, required: true },
      { id: 5, task: 'Limpieza general', completed: false, required: false },
      { id: 6, task: 'Verificar conexiones eléctricas', completed: false, required: true },
      { id: 7, task: 'Registro de lecturas', completed: false, required: true },
      { id: 8, task: 'Toma de fotografías', completed: false, required: true }
    ],
    sla: 24,
    location: { lat: 10.4, lng: -75.5 },
    address: 'Cra 1 #5-87, Bocagrande'
  },
  { 
    id: 'OT-2025-044',
    client: 'Comfenalco',
    client_id: 2,
    site: 'Torre Norte',
    asset: 'Planta Eléctrica 75KVA',
    asset_id: 3,
    type: 'Revisión Bomba',
    priority: 'Alta',
    date: '2025-01-21',
    time: '10:30',
    technician: 'Carlos López',
    technician_id: 2,
    status: 'ASIGNADA',
    description: 'Revisión de sistema de bombeo',
    estimatedHours: 2,
    actualHours: null,
    materials: [],
    checklist: [],
    sla: 12,
    location: { lat: 10.42, lng: -75.48 },
    address: 'Calle 30 #89-15, Torre Norte'
  },
  { 
    id: 'OT-2025-045',
    client: 'C.C. La Plazuela',
    client_id: 3,
    site: 'Centro Comercial',
    asset: 'Sistema de Refrigeración',
    asset_id: 4,
    type: 'Preventivo',
    priority: 'Normal',
    date: '2025-01-21',
    time: '14:00',
    technician: 'María García',
    technician_id: 3,
    status: 'ASIGNADA',
    description: 'Mantenimiento preventivo sistema de refrigeración',
    estimatedHours: 4,
    actualHours: null,
    materials: [],
    checklist: [],
    sla: 48,
    location: { lat: 10.38, lng: -75.52 },
    address: 'Diagonal 35 #71-77'
  },
  { 
    id: 'OT-2025-042',
    client: 'Hotel Caribe S.A.',
    client_id: 1,
    site: 'Sede Principal',
    asset: 'Sistema de Bombeo 10HP',
    asset_id: 2,
    type: 'Mantenimiento Correctivo',
    priority: 'Alta',
    date: '2025-01-20',
    time: '11:00',
    technician: 'Juan Pérez',
    technician_id: 1,
    status: 'COMPLETADA',
    description: 'Reparación de falla en sistema de bombeo',
    estimatedHours: 2.5,
    actualHours: 2.5,
    materials: [
      { id: 'COR-001', name: 'Correa AX30', quantity: 1, unit: 'unidad' }
    ],
    checklist: [
      { id: 1, task: 'Inspección visual del equipo', completed: true, required: true },
      { id: 2, task: 'Verificar niveles de aceite', completed: true, required: true },
      { id: 3, task: 'Cambio de correa', completed: true, required: true },
      { id: 4, task: 'Prueba de funcionamiento', completed: true, required: true }
    ],
    sla: 12,
    location: { lat: 10.4, lng: -75.5 },
    address: 'Cra 1 #5-87, Bocagrande',
    completedAt: '2025-01-20T13:30:00Z',
    reportId: 'RPT-2025-001'
  }
];

// Datos simulados para inventario
export const mockInventory = [
  { id: 1, name: 'Filtro de aire', quantity: 15, unit: 'unidad' },
  { id: 2, name: 'Aceite lubricante', quantity: 50, unit: 'litro' },
  { id: 3, name: 'Correa de transmisión', quantity: 8, unit: 'unidad' },
  { id: 4, name: 'Sensor de temperatura', quantity: 12, unit: 'unidad' },
  { id: 5, name: 'Motor eléctrico 2HP', quantity: 3, unit: 'unidad' }
];

// Datos simulados para checklist
export const mockChecklists = [
  {
    id: 1,
    name: 'Mantenimiento Preventivo Compresor',
    items: [
      { id: 1, description: 'Verificar nivel de aceite', required: true },
      { id: 2, description: 'Cambiar filtro de aire', required: true },
      { id: 3, description: 'Revisar presión de trabajo', required: true },
      { id: 4, description: 'Limpiar sistema de enfriamiento', required: false },
      { id: 5, description: 'Verificar fugas', required: true }
    ]
  },
  {
    id: 2,
    name: 'Inspección Sistema Eléctrico',
    items: [
      { id: 1, description: 'Verificar conexiones', required: true },
      { id: 2, description: 'Medir voltaje', required: true },
      { id: 3, description: 'Revisar aislamiento', required: true },
      { id: 4, description: 'Comprobar puesta a tierra', required: true }
    ]
  }
];

// Datos simulados para sitios
export const mockSites = [
  { id: 1, name: 'Planta Principal', client_id: 1, address: 'Calle Principal 123, Ciudad Industrial' },
  { id: 2, name: 'Sucursal Norte', client_id: 2, address: 'Avenida Central 456, Zona Norte' },
  { id: 3, name: 'Bodega Central', client_id: 3, address: 'Boulevard Norte 789, Parque Logístico' }
];

// Datos simulados para reportes
export const mockReports = [
  {
    id: 'RPT-2025-001',
    work_order_id: 'OT-2025-042',
    client_id: 1,
    client_name: 'Hotel Caribe S.A.',
    asset_id: 2,
    asset_name: 'Sistema de Bombeo 10HP',
    date_generated: '2025-01-20T13:30:00Z',
    technician: 'Juan Pérez',
    technician_id: 1,
    type: 'Mantenimiento Correctivo',
    findings: 'Se encontró desgaste excesivo en la correa de transmisión principal',
    actions_taken: 'Reemplazo de correa AX30 y verificación de alineación',
    parts_used: [
      { id: 'COR-001', name: 'Correa AX30', quantity: 1, unit: 'unidad', cost: 45000 }
    ],
    checklist_completed: [
      { task: 'Inspección visual del equipo', status: 'OK', observations: 'Equipo en buen estado general' },
      { task: 'Verificar niveles de aceite', status: 'OK', value: '2.5L', observations: 'Nivel correcto' },
      { task: 'Cambio de correa', status: 'OK', observations: 'Correa reemplazada exitosamente' },
      { task: 'Prueba de funcionamiento', status: 'OK', observations: 'Funcionamiento normal' }
    ],
    photos: 6,
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    status: 'completed',
    total_cost: 45000,
    duration_hours: 2.5
  },
  {
    id: 'RPT-2025-002',
    work_order_id: 'OT-2025-041',
    client_id: 2,
    client_name: 'Comfenalco',
    asset_id: 3,
    asset_name: 'Planta Eléctrica 75KVA',
    date_generated: '2025-01-19T16:45:00Z',
    technician: 'Carlos López',
    technician_id: 2,
    type: 'Mantenimiento Preventivo',
    findings: 'Equipo funcionando correctamente, se realizó limpieza general',
    actions_taken: 'Limpieza de filtros, verificación de conexiones y calibración',
    parts_used: [
      { id: 'FIL-002', name: 'Filtro aire Perkins', quantity: 2, unit: 'unidad', cost: 85000 },
      { id: 'ACE-002', name: 'Aceite Perkins 15W40', quantity: 12, unit: 'litro', cost: 180000 }
    ],
    checklist_completed: [
      { task: 'Inspección visual del equipo', status: 'OK', observations: 'Sin anomalías visibles' },
      { task: 'Verificar niveles de aceite', status: 'OK', value: '11.5L', observations: 'Nivel óptimo' },
      { task: 'Cambio de filtros', status: 'OK', observations: 'Filtros reemplazados' },
      { task: 'Prueba de funcionamiento', status: 'OK', observations: 'Rendimiento normal' }
    ],
    photos: 8,
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    status: 'completed',
    total_cost: 265000,
    duration_hours: 3.5
  }
];

// Datos simulados para bitácoras
export const mockBitacoras = [
  {
    id: 'BIT-2025-001',
    client_id: 1,
    client_name: 'Hotel Caribe S.A.',
    asset_id: 1,
    asset_name: 'Planta Eléctrica 150KVA',
    date: '2025-01-20',
    technician: 'Juan Pérez',
    technician_id: 1,
    type: 'Mantenimiento Preventivo',
    activities: [
      {
        time: '08:00',
        activity: 'Inicio de actividades de mantenimiento',
        observations: 'Equipo en funcionamiento normal'
      },
      {
        time: '08:15',
        activity: 'Inspección visual del equipo',
        observations: 'Sin anomalías visibles, estado general bueno'
      },
      {
        time: '08:30',
        activity: 'Verificación de niveles de aceite',
        observations: 'Nivel: 11.5L - Correcto'
      },
      {
        time: '09:00',
        activity: 'Cambio de filtros de aire',
        observations: 'Filtros reemplazados exitosamente'
      },
      {
        time: '09:30',
        activity: 'Limpieza general del equipo',
        observations: 'Equipo limpiado, sin residuos'
      },
      {
        time: '10:00',
        activity: 'Prueba de funcionamiento',
        observations: 'Funcionamiento normal, sin ruidos anómalos'
      },
      {
        time: '10:15',
        activity: 'Registro de lecturas',
        observations: 'Horómetro: 2,450 hrs, Temperatura: 85°C'
      },
      {
        time: '10:30',
        activity: 'Finalización de actividades',
        observations: 'Mantenimiento completado exitosamente'
      }
    ],
    materials_used: [
      { name: 'Filtro aire Cummins', quantity: 2, unit: 'unidad' },
      { name: 'Aceite 15W40', quantity: 12, unit: 'litro' }
    ],
    photos: 8,
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    status: 'completed',
    duration_hours: 2.5
  },
  {
    id: 'BIT-2025-002',
    client_id: 2,
    client_name: 'Comfenalco',
    asset_id: 3,
    asset_name: 'Planta Eléctrica 75KVA',
    date: '2025-01-19',
    technician: 'Carlos López',
    technician_id: 2,
    type: 'Revisión Técnica',
    activities: [
      {
        time: '14:00',
        activity: 'Inicio de revisión técnica',
        observations: 'Equipo apagado para inspección'
      },
      {
        time: '14:15',
        activity: 'Inspección de conexiones eléctricas',
        observations: 'Conexiones en buen estado, sin corrosión'
      },
      {
        time: '14:30',
        activity: 'Verificación de sistema de arranque',
        observations: 'Batería: 12.8V - Correcto'
      },
      {
        time: '15:00',
        activity: 'Prueba de arranque',
        observations: 'Arranque normal, sin problemas'
      },
      {
        time: '15:15',
        activity: 'Verificación de carga',
        observations: 'Carga estable a 75KVA'
      },
      {
        time: '15:30',
        activity: 'Finalización de revisión',
        observations: 'Equipo en perfecto estado operativo'
      }
    ],
    materials_used: [],
    photos: 5,
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    status: 'completed',
    duration_hours: 1.5
  }
];

// Datos simulados para notificaciones
export const mockNotifications = [
  {
    id: 1,
    type: 'assignment',
    message: 'Se te ha asignado una nueva orden de trabajo',
    date: '2023-06-15',
    read: false
  },
  {
    id: 2,
    type: 'alert',
    message: 'OT #003 está retrasada',
    date: '2023-06-14',
    read: true
  }
];

// Datos simulados para usuarios
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    name: 'Administrador',
    role: 'admin',
    email: 'admin@mekanos.com'
  },
  {
    id: 2,
    username: 'tecnico1',
    name: 'Juan Pérez',
    role: 'technician',
    email: 'jperez@mekanos.com'
  },
  {
    id: 3,
    username: 'supervisor1',
    name: 'Ana Gómez',
    role: 'supervisor',
    email: 'agomez@mekanos.com'
  }
];