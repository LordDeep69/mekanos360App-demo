// src/data/mockData.jsx

// Datos de clientes
export const clientsData = [
  {
    id: 1,
    nit: '890.123.456-7',
    nombre: 'Hotel Caribe S.A.',
    categoria: 'Hotelero',
    sedes: 2,
    activos: 15,
    estado: 'Activo',
    direccion: 'Cra 1 #5-87, Bocagrande',
    telefono: '(605) 665-1234',
    email: 'contacto@hotelcaribe.com',
    contacto: 'Ana María Vélez',
    ciudad: 'Cartagena'
  },
  {
    id: 2,
    nit: '900.456.789-1',
    nombre: 'Comfenalco Sede Torre Norte',
    categoria: 'Salud',
    sedes: 5,
    activos: 28,
    estado: 'Activo',
    direccion: 'Calle 30 #89-15',
    telefono: '(605) 672-8900',
    email: 'servicios@comfenalco.com',
    contacto: 'Roberto Gómez',
    ciudad: 'Cartagena'
  },
  {
    id: 3,
    nit: '901.234.567-8',
    nombre: 'C.C. La Plazuela',
    categoria: 'Comercial',
    sedes: 1,
    activos: 12,
    estado: 'Activo',
    direccion: 'Diagonal 35 #71-77',
    telefono: '(605) 669-4321',
    email: 'administracion@plazuela.com',
    contacto: 'Carolina Ruiz',
    ciudad: 'Cartagena'
  }
];

// Datos de activos
export const assetsData = [
  {
    id: 'A-001',
    tipo: 'Planta Eléctrica',
    marca: 'Cummins',
    modelo: 'C150D5',
    serie: 'CUM2023150789',
    cliente: 'Hotel Caribe',
    clientId: 1,
    ubicacion: 'Sótano 2',
    estado: 'Operativo',
    criticidad: 'Alta',
    ultimoMtto: '2024-12-15',
    proximoMtto: '2025-03-15'
  },
  {
    id: 'A-002',
    tipo: 'Chiller',
    marca: 'Carrier',
    modelo: 'AquaForce 30XA',
    serie: 'CAR20221234',
    cliente: 'Comfenalco Sede Torre Norte',
    clientId: 2,
    ubicacion: 'Azotea',
    estado: 'Operativo',
    criticidad: 'Alta',
    ultimoMtto: '2025-01-10',
    proximoMtto: '2025-04-10'
  },
  {
    id: 'A-003',
    tipo: 'UPS',
    marca: 'APC',
    modelo: 'Smart-UPS RT 10000',
    serie: 'APC2024RT5678',
    cliente: 'C.C. La Plazuela',
    clientId: 3,
    ubicacion: 'Cuarto Técnico',
    estado: 'Requiere Atención',
    criticidad: 'Media',
    ultimoMtto: '2024-11-20',
    proximoMtto: '2025-02-20'
  }
];

// Datos de órdenes de trabajo
export const workOrdersData = [
  {
    id: 'OT-2025-043',
    cliente: 'Hotel Caribe',
    clientId: 1,
    activo: 'A-001',
    tipo: 'Mantenimiento Preventivo',
    subtipo: 'Tipo A',
    estado: 'Programada',
    prioridad: 'Normal',
    fechaProgramada: '2025-01-21T08:00:00',
    tecnicoAsignado: 'Juan Pérez',
    descripcion: 'Mantenimiento preventivo trimestral de planta eléctrica'
  },
  {
    id: 'OT-2025-044',
    cliente: 'Comfenalco Sede Torre Norte',
    clientId: 2,
    activo: 'A-002',
    tipo: 'Revisión',
    subtipo: 'Diagnóstico',
    estado: 'Programada',
    prioridad: 'Alta',
    fechaProgramada: '2025-01-21T10:30:00',
    tecnicoAsignado: 'Juan Pérez',
    descripcion: 'Revisión de bomba de agua por ruido anormal'
  },
  {
    id: 'OT-2025-045',
    cliente: 'C.C. La Plazuela',
    clientId: 3,
    activo: 'A-003',
    tipo: 'Mantenimiento Preventivo',
    subtipo: 'Estándar',
    estado: 'Programada',
    prioridad: 'Normal',
    fechaProgramada: '2025-01-21T14:00:00',
    tecnicoAsignado: 'Juan Pérez',
    descripcion: 'Mantenimiento preventivo de UPS'
  }
];

// Datos de inventario
export const inventoryData = [
  {
    id: 1,
    code: 'REP-001',
    name: 'Filtro de aire Cummins',
    description: 'Filtro de aire para planta eléctrica Cummins C150D5',
    category: 'repuestos',
    quantity: 12,
    minQuantity: 5,
    price: 85000,
    location: 'Bodega A - Estante 3',
    supplier: 'Cummins Colombia',
    lastPurchase: '2024-12-15',
    image: null
  },
  {
    id: 2,
    code: 'REP-002',
    name: 'Aceite lubricante 15W40',
    description: 'Aceite lubricante sintético para motores diesel',
    category: 'consumibles',
    quantity: 45,
    minQuantity: 20,
    price: 65000,
    location: 'Bodega A - Estante 1',
    supplier: 'Lubricantes del Caribe',
    lastPurchase: '2025-01-10',
    image: null
  },
  {
    id: 3,
    code: 'REP-003',
    name: 'Correa de transmisión A-78',
    description: 'Correa trapezoidal tipo A longitud 78"',
    category: 'repuestos',
    quantity: 8,
    minQuantity: 10,
    price: 35000,
    location: 'Bodega B - Estante 2',
    supplier: 'Bandas y Correas SA',
    lastPurchase: '2024-11-20',
    image: null
  },
  {
    id: 4,
    code: 'HER-001',
    name: 'Multímetro digital Fluke 87V',
    description: 'Multímetro industrial True RMS',
    category: 'herramientas',
    quantity: 3,
    minQuantity: 2,
    price: 1850000,
    location: 'Almacén Principal',
    supplier: 'Instrumentos Técnicos',
    lastPurchase: '2024-10-05',
    image: null
  },
  {
    id: 5,
    code: 'REP-004',
    name: 'Batería 12V 150Ah',
    description: 'Batería de arranque para planta eléctrica',
    category: 'repuestos',
    quantity: 4,
    minQuantity: 2,
    price: 580000,
    location: 'Bodega A - Estante 5',
    supplier: 'Baterías MAC',
    lastPurchase: '2024-12-20',
    image: null
  },
  {
    id: 6,
    code: 'CON-001',
    name: 'Refrigerante R-410A',
    description: 'Gas refrigerante ecológico R-410A cilindro 11.3kg',
    category: 'consumibles',
    quantity: 6,
    minQuantity: 4,
    price: 420000,
    location: 'Bodega C - Área refrigerada',
    supplier: 'Gases Industriales',
    lastPurchase: '2025-01-05',
    image: null
  },
  {
    id: 7,
    code: 'HER-002',
    name: 'Llave de torque 1/2"',
    description: 'Llave dinamométrica 40-200 Nm',
    category: 'herramientas',
    quantity: 2,
    minQuantity: 1,
    price: 650000,
    location: 'Almacén Principal',
    supplier: 'Herramientas Stanley',
    lastPurchase: '2024-09-15',
    image: null
  },
  {
    id: 8,
    code: 'REP-005',
    name: 'Contactor trifásico 100A',
    description: 'Contactor Schneider LC1D100 220V',
    category: 'repuestos',
    quantity: 0,
    minQuantity: 3,
    price: 285000,
    location: 'Bodega B - Estante 4',
    supplier: 'Schneider Electric',
    lastPurchase: '2024-11-10',
    image: null
  },
  {
    id: 9,
    code: 'CON-002',
    name: 'Grasa multiuso',
    description: 'Grasa lubricante multiuso cartucho 400g',
    category: 'consumibles',
    quantity: 24,
    minQuantity: 12,
    price: 18000,
    location: 'Bodega A - Estante 2',
    supplier: 'Lubricantes del Caribe',
    lastPurchase: '2025-01-10',
    image: null
  },
  {
    id: 10,
    code: 'EQU-001',
    name: 'Bomba de vacío 5CFM',
    description: 'Bomba de vacío doble etapa para HVAC',
    category: 'equipos',
    quantity: 2,
    minQuantity: 1,
    price: 1250000,
    location: 'Almacén Principal',
    supplier: 'Equipos HVAC Colombia',
    lastPurchase: '2024-08-20',
    image: null
  },
  {
    id: 11,
    code: 'REP-006',
    name: 'Sensor de temperatura PT100',
    description: 'Sensor RTD PT100 clase A con vaina',
    category: 'repuestos',
    quantity: 5,
    minQuantity: 5,
    price: 125000,
    location: 'Bodega B - Estante 3',
    supplier: 'Instrumentos Técnicos',
    lastPurchase: '2024-12-01',
    image: null
  },
  {
    id: 12,
    code: 'CON-003',
    name: 'Cinta aislante 3M',
    description: 'Cinta aislante eléctrica 19mm x 20m',
    category: 'consumibles',
    quantity: 48,
    minQuantity: 24,
    price: 8500,
    location: 'Bodega A - Estante 1',
    supplier: '3M Colombia',
    lastPurchase: '2025-01-08',
    image: null
  },
  {
    id: 13,
    code: 'HER-003',
    name: 'Juego de llaves Allen',
    description: 'Set de llaves hexagonales 1.5-10mm',
    category: 'herramientas',
    quantity: 4,
    minQuantity: 2,
    price: 85000,
    location: 'Almacén Principal',
    supplier: 'Herramientas Stanley',
    lastPurchase: '2024-10-10',
    image: null
  },
  {
    id: 14,
    code: 'REP-007',
    name: 'Fusible NH 100A',
    description: 'Fusible tipo cuchilla NH tamaño 00',
    category: 'repuestos',
    quantity: 15,
    minQuantity: 10,
    price: 45000,
    location: 'Bodega B - Estante 4',
    supplier: 'Siemens Colombia',
    lastPurchase: '2024-12-15',
    image: null
  },
  {
    id: 15,
    code: 'OTR-001',
    name: 'Kit de primeros auxilios',
    description: 'Botiquín industrial completo',
    category: 'otros',
    quantity: 3,
    minQuantity: 2,
    price: 185000,
    location: 'Oficina Principal',
    supplier: 'Seguridad Industrial SA',
    lastPurchase: '2024-11-01',
    image: null
  }
];

// Exportación de datos para el dashboard
export const dashboardData = {
  kpis: {
    cumplimiento: 92,
    ttr: 2.5,
    mttr: 4.2,
    mtbf: 720,
    instrumentos: 95
  },
  comercial: {
    conversion: 45,
    margen: 28,
    rotacion: 4.2
  }
};

// Datos de técnicos
export const technicianData = [
  { id: 1, nombre: 'Juan Pérez', disponible: true },
  { id: 2, nombre: 'Carlos López', disponible: true },
  { id: 3, nombre: 'María García', disponible: false }
];