// src/data/globalMockData.js
// Sistema completo de datos sintéticos para Mekanos S.A.S.

// ==================== EMPLEADOS Y TÉCNICOS ====================
export const employeesData = [
  {
    id: 'EMP-001',
    codigo: 'JPPEREZ',
    nombre: 'Juan Carlos',
    apellidos: 'Pérez Rodríguez',
    nombreCompleto: 'Juan Carlos Pérez Rodríguez',
    cargo: 'Técnico Senior',
    especialidad: 'Sistemas Eléctricos y Electromecánicos',
    telefono: '+57 320 456 7890',
    email: 'juan.perez@mekanos.com',
    fechaIngreso: '2021-03-15',
    estado: 'Activo',
    disponible: true,
    ubicacionActual: { lat: 10.3932, lng: -75.4832 },
    certificaciones: ['Schneider Electric', 'Siemens PLC', 'Soldadura Industrial'],
    horasTrabajadasMes: 186,
    otCompletadas: 45,
    calificacionPromedio: 4.8
  },
  {
    id: 'EMP-002',
    codigo: 'CLOPEZ',
    nombre: 'Carlos Alberto',
    apellidos: 'López Martínez',
    nombreCompleto: 'Carlos Alberto López Martínez',
    cargo: 'Técnico Especialista',
    especialidad: 'HVAC y Refrigeración',
    telefono: '+57 315 987 6543',
    email: 'carlos.lopez@mekanos.com',
    fechaIngreso: '2020-08-22',
    estado: 'Activo',
    disponible: true,
    ubicacionActual: { lat: 10.4036, lng: -75.4849 },
    certificaciones: ['Carrier HVAC', 'R-410A Manejo', 'Trabajos en Altura'],
    horasTrabajadasMes: 192,
    otCompletadas: 52,
    calificacionPromedio: 4.9
  },
  {
    id: 'EMP-003',
    codigo: 'MGARCIA',
    nombre: 'María Elena',
    apellidos: 'García Vásquez',
    nombreCompleto: 'María Elena García Vásquez',
    cargo: 'Técnico Junior',
    especialidad: 'Mantenimiento General',
    telefono: '+57 301 234 5678',
    email: 'maria.garcia@mekanos.com',
    fechaIngreso: '2022-01-10',
    estado: 'Activo',
    disponible: false,
    ubicacionActual: { lat: 10.3995, lng: -75.4921 },
    certificaciones: ['Seguridad Industrial', 'Primeros Auxilios'],
    horasTrabajadasMes: 176,
    otCompletadas: 31,
    calificacionPromedio: 4.6
  }
];

// ==================== CLIENTES EXPANDIDOS ====================
export const clientsDataComplete = [
  {
    id: 1,
    nit: '890.123.456-7',
    nombre: 'Hotel Caribe S.A.',
    categoria: 'Hotelero',
    segmento: 'Premium',
    estado: 'Activo',
    direccionPrincipal: 'Cra 1 #5-87, Bocagrande',
    ciudad: 'Cartagena',
    telefono: '(605) 665-1234',
    email: 'contacto@hotelcaribe.com',
    contactoPrincipal: {
      nombre: 'Ana María Vélez',
      cargo: 'Gerente de Mantenimiento',
      telefono: '+57 320 654 9876',
      email: 'ana.velez@hotelcaribe.com'
    },
    sedes: [
      {
        id: 'SEDE-HC-001',
        nombre: 'Hotel Caribe Principal',
        direccion: 'Cra 1 #5-87, Bocagrande',
        responsable: 'Ana María Vélez',
        telefono: '(605) 665-1234'
      },
      {
        id: 'SEDE-HC-002',
        nombre: 'Hotel Caribe Spa',
        direccion: 'Cra 2 #7-45, Bocagrande',
        responsable: 'Roberto Silva',
        telefono: '(605) 665-1235'
      }
    ],
    activos: 15,
    contratoVigente: {
      numero: 'CONT-HC-2024-001',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      valor: 185000000,
      frecuenciaPago: 'Mensual'
    },
    fechaRegistro: '2023-05-15',
    ultimaFacturacion: '2025-01-01',
    estadoCuenta: 'Al día'
  },
  {
    id: 2,
    nit: '900.456.789-1',
    nombre: 'Comfenalco Sede Torre Norte',
    categoria: 'Salud',
    segmento: 'Standard',
    estado: 'Activo',
    direccionPrincipal: 'Calle 30 #89-15',
    ciudad: 'Cartagena',
    telefono: '(605) 672-8900',
    email: 'servicios@comfenalco.com',
    contactoPrincipal: {
      nombre: 'Roberto Gómez',
      cargo: 'Jefe de Infraestructura',
      telefono: '+57 315 789 4561',
      email: 'roberto.gomez@comfenalco.com'
    },
    sedes: [
      {
        id: 'SEDE-CF-001',
        nombre: 'Torre Norte Principal',
        direccion: 'Calle 30 #89-15',
        responsable: 'Roberto Gómez',
        telefono: '(605) 672-8900'
      },
      {
        id: 'SEDE-CF-002',
        nombre: 'Laboratorios Anexos',
        direccion: 'Calle 30 #89-25',
        responsable: 'Luisa Torres',
        telefono: '(605) 672-8901'
      }
    ],
    activos: 28,
    contratoVigente: {
      numero: 'CONT-CF-2024-002',
      fechaInicio: '2024-06-01',
      fechaFin: '2025-05-31',
      valor: 320000000,
      frecuenciaPago: 'Bimestral'
    },
    fechaRegistro: '2023-08-20',
    ultimaFacturacion: '2025-01-01',
    estadoCuenta: 'Al día'
  },
  {
    id: 3,
    nit: '901.234.567-8',
    nombre: 'C.C. La Plazuela',
    categoria: 'Comercial',
    segmento: 'Standard',
    estado: 'Activo',
    direccionPrincipal: 'Diagonal 35 #71-77',
    ciudad: 'Cartagena',
    telefono: '(605) 669-4321',
    email: 'administracion@plazuela.com',
    contactoPrincipal: {
      nombre: 'Carolina Ruiz',
      cargo: 'Administradora General',
      telefono: '+57 301 987 6543',
      email: 'carolina.ruiz@plazuela.com'
    },
    sedes: [
      {
        id: 'SEDE-PZ-001',
        nombre: 'Centro Comercial Principal',
        direccion: 'Diagonal 35 #71-77',
        responsable: 'Carolina Ruiz',
        telefono: '(605) 669-4321'
      }
    ],
    activos: 12,
    contratoVigente: {
      numero: 'CONT-PZ-2024-003',
      fechaInicio: '2024-03-01',
      fechaFin: '2025-02-28',
      valor: 125000000,
      frecuenciaPago: 'Mensual'
    },
    fechaRegistro: '2023-11-10',
    ultimaFacturacion: '2025-01-01',
    estadoCuenta: 'Al día'
  }
];

// ==================== ACTIVOS Y EQUIPOS EXPANDIDOS ====================
export const assetsDataComplete = [
  {
    id: 'A-001',
    codigo: 'PE-HC-001',
    nombre: 'Planta Eléctrica Principal',
    tipo: 'Generador Eléctrico',
    marca: 'Cummins',
    modelo: 'C150D5',
    numeroSerie: 'CUM2023150789',
    año: 2021,
    cliente: 'Hotel Caribe S.A.',
    clienteId: 1,
    sede: 'SEDE-HC-001',
    ubicacion: 'Sótano 2 - Cuarto de Máquinas',
    estado: 'Operativo',
    criticidad: 'Alta',
    fechaInstalacion: '2021-06-15',
    fechaUltimoMtto: '2024-12-15',
    fechaProximoMtto: '2025-03-15',
    frecuenciaMtto: 'Trimestral',
    valorEquipo: 85000000,
    proveedor: 'Cummins Colombia',
    garantia: {
      vigente: true,
      fechaVencimiento: '2026-06-15',
      cobertura: 'Completa'
    },
    especificaciones: {
      potencia: '150 KVA',
      voltaje: '220/440V',
      frecuencia: '60Hz',
      combustible: 'Diesel',
      capacidadTanque: '400L',
      horasOperacion: 2847,
      horasProximoServicio: 3000
    },
    documentos: [
      { tipo: 'Manual', url: '/docs/cummins-c150d5-manual.pdf' },
      { tipo: 'Certificado', url: '/docs/cert-instalacion-pe001.pdf' }
    ],
    historialMantenimientos: [
      {
        fecha: '2024-12-15',
        tipo: 'Preventivo',
        tecnico: 'Juan Carlos Pérez',
        ot: 'OT-2024-289',
        trabajosRealizados: 'Cambio de aceite, filtros, revisión general',
        proximoServicio: '2025-03-15'
      },
      {
        fecha: '2024-09-15',
        tipo: 'Preventivo',
        tecnico: 'Carlos López',
        ot: 'OT-2024-201',
        trabajosRealizados: 'Revisión trimestral, pruebas de carga',
        proximoServicio: '2024-12-15'
      }
    ]
  },
  {
    id: 'A-002',
    codigo: 'CH-CF-001',
    nombre: 'Chiller Torre Norte',
    tipo: 'Sistema de Refrigeración',
    marca: 'Carrier',
    modelo: 'AquaForce 30XA',
    numeroSerie: 'CAR20221234',
    año: 2022,
    cliente: 'Comfenalco Sede Torre Norte',
    clienteId: 2,
    sede: 'SEDE-CF-001',
    ubicacion: 'Azotea - Cuarto de Máquinas HVAC',
    estado: 'Operativo',
    criticidad: 'Alta',
    fechaInstalacion: '2022-03-20',
    fechaUltimoMtto: '2025-01-10',
    fechaProximoMtto: '2025-04-10',
    frecuenciaMtto: 'Trimestral',
    valorEquipo: 125000000,
    proveedor: 'Carrier Colombia',
    garantia: {
      vigente: true,
      fechaVencimiento: '2027-03-20',
      cobertura: 'Partes y mano de obra'
    },
    especificaciones: {
      capacidad: '150 TR',
      refrigerante: 'R-410A',
      voltaje: '440V',
      consumo: '180 kW',
      caudal: '450 GPM',
      presionTrabajo: '250 PSI'
    },
    documentos: [
      { tipo: 'Manual', url: '/docs/carrier-30xa-manual.pdf' },
      { tipo: 'Planos', url: '/docs/planos-instalacion-ch001.pdf' }
    ],
    historialMantenimientos: [
      {
        fecha: '2025-01-10',
        tipo: 'Preventivo',
        tecnico: 'Carlos López',
        ot: 'OT-2025-008',
        trabajosRealizados: 'Limpieza condensador, revisión refrigerante',
        proximoServicio: '2025-04-10'
      }
    ]
  },
  {
    id: 'A-003',
    codigo: 'UPS-PZ-001',
    nombre: 'UPS Centro Comercial',
    tipo: 'Sistema de Energía Ininterrumpida',
    marca: 'APC',
    modelo: 'Smart-UPS RT 10000',
    numeroSerie: 'APC2024RT5678',
    año: 2024,
    cliente: 'C.C. La Plazuela',
    clienteId: 3,
    sede: 'SEDE-PZ-001',
    ubicacion: 'Cuarto Técnico Principal',
    estado: 'Requiere Atención',
    criticidad: 'Media',
    fechaInstalacion: '2024-01-15',
    fechaUltimoMtto: '2024-11-20',
    fechaProximoMtto: '2025-02-20',
    frecuenciaMtto: 'Trimestral',
    valorEquipo: 45000000,
    proveedor: 'APC by Schneider Electric',
    garantia: {
      vigente: true,
      fechaVencimiento: '2027-01-15',
      cobertura: 'Reemplazo de baterías incluido'
    },
    especificaciones: {
      potencia: '10 KVA',
      voltajeEntrada: '220V',
      voltajeSalida: '220V',
      autonomia: '15 min a carga completa',
      numeroBaterias: 16,
      tipoBaterias: 'Selladas 12V 9Ah'
    },
    documentos: [
      { tipo: 'Manual', url: '/docs/apc-rt10000-manual.pdf' }
    ],
    historialMantenimientos: [
      {
        fecha: '2024-11-20',
        tipo: 'Correctivo',
        tecnico: 'María García',
        ot: 'OT-2024-267',
        trabajosRealizados: 'Reemplazo de 4 baterías defectuosas',
        proximoServicio: '2025-02-20'
      }
    ]
  }
];

// ==================== ÓRDENES DE TRABAJO COMPLETAS ====================
export const workOrdersDataComplete = [
  {
    id: 'OT-2025-043',
    numero: 'OT-2025-043',
    titulo: 'Mantenimiento Preventivo Planta Eléctrica',
    cliente: 'Hotel Caribe S.A.',
    clienteId: 1,
    sede: 'SEDE-HC-001',
    activo: 'A-001',
    activoNombre: 'Planta Eléctrica Principal',
    tipo: 'Mantenimiento Preventivo',
    subtipo: 'Tipo A - Completo',
    estado: 'ASIGNADA',
    prioridad: 'Normal',
    fechaCreacion: '2025-01-20T09:00:00',
    fechaProgramada: '2025-01-21T08:00:00',
    fechaInicio: null,
    fechaFinalizacion: null,
    tecnicoAsignado: 'Juan Carlos Pérez',
    tecnicoId: 'EMP-001',
    descripcion: 'Mantenimiento preventivo trimestral de planta eléctrica según protocolo estándar',
    observaciones: '',
    tiempoEstimado: 180, // minutos
    tiempoReal: null,
    ubicacionTrabajo: 'Sótano 2 - Cuarto de Máquinas',
    materiales: [
      { codigo: 'REP-001', nombre: 'Filtro de aire Cummins', cantidadPlaneada: 2, cantidadUsada: 0 },
      { codigo: 'REP-002', nombre: 'Aceite lubricante 15W40', cantidadPlaneada: 8, cantidadUsada: 0 },
      { codigo: 'REP-003', nombre: 'Filtro de aceite', cantidadPlaneada: 1, cantidadUsada: 0 }
    ],
    checklist: {
      templateId: 'CHKL-PE-001',
      nombre: 'Checklist Planta Eléctrica Tipo A',
      items: [
        { id: 1, descripcion: 'Inspección visual general', completado: false, observaciones: '', obligatorio: true },
        { id: 2, descripcion: 'Verificar nivel de aceite motor', completado: false, observaciones: '', obligatorio: true },
        { id: 3, descripcion: 'Verificar nivel refrigerante', completado: false, observaciones: '', obligatorio: true },
        { id: 4, descripcion: 'Cambio de filtro de aire', completado: false, observaciones: '', obligatorio: true },
        { id: 5, descripcion: 'Cambio de aceite motor', completado: false, observaciones: '', obligatorio: true },
        { id: 6, descripcion: 'Cambio de filtro de aceite', completado: false, observaciones: '', obligatorio: true },
        { id: 7, descripcion: 'Limpieza de bornes de batería', completado: false, observaciones: '', obligatorio: false },
        { id: 8, descripcion: 'Prueba de funcionamiento sin carga', completado: false, observaciones: '', obligatorio: true },
        { id: 9, descripcion: 'Prueba de funcionamiento con carga', completado: false, observaciones: '', obligatorio: true },
        { id: 10, descripcion: 'Registro de lecturas de parámetros', completado: false, observaciones: '', obligatorio: true }
      ]
    },
    multimedia: {
      fotos: [],
      videos: [],
      audios: [],
      documentos: []
    },
    firmaCliente: null,
    fechaFirma: null,
    coordenadas: { lat: 10.3932, lng: -75.4832 },
    progreso: 0
  },
  {
    id: 'OT-2025-044',
    numero: 'OT-2025-044',
    titulo: 'Revisión Diagnóstica Chiller Torre Norte',
    cliente: 'Comfenalco Sede Torre Norte',
    clienteId: 2,
    sede: 'SEDE-CF-001',
    activo: 'A-002',
    activoNombre: 'Chiller Torre Norte',
    tipo: 'Revisión',
    subtipo: 'Diagnóstico por ruido anormal',
    estado: 'ASIGNADA',
    prioridad: 'Alta',
    fechaCreacion: '2025-01-20T14:30:00',
    fechaProgramada: '2025-01-21T10:30:00',
    fechaInicio: null,
    fechaFinalizacion: null,
    tecnicoAsignado: 'Carlos Alberto López',
    tecnicoId: 'EMP-002',
    descripcion: 'Revisión diagnóstica por reporte de ruido anormal en compresor del chiller',
    observaciones: 'Cliente reporta ruido metálico intermitente desde hace 3 días',
    tiempoEstimado: 120,
    tiempoReal: null,
    ubicacionTrabajo: 'Azotea - Cuarto de Máquinas HVAC',
    materiales: [
      { codigo: 'HER-001', nombre: 'Multímetro digital Fluke 87V', cantidadPlaneada: 1, cantidadUsada: 0 },
      { codigo: 'CON-001', nombre: 'Refrigerante R-410A', cantidadPlaneada: 0.5, cantidadUsada: 0 }
    ],
    checklist: {
      templateId: 'CHKL-CH-002',
      nombre: 'Checklist Diagnóstico Chiller',
      items: [
        { id: 1, descripcion: 'Inspección auditiva del equipo', completado: false, observaciones: '', obligatorio: true },
        { id: 2, descripcion: 'Verificar presiones de trabajo', completado: false, observaciones: '', obligatorio: true },
        { id: 3, descripcion: 'Revisar conexiones eléctricas', completado: false, observaciones: '', obligatorio: true },
        { id: 4, descripcion: 'Medir amperajes del compresor', completado: false, observaciones: '', obligatorio: true },
        { id: 5, descripcion: 'Verificar nivel de refrigerante', completado: false, observaciones: '', obligatorio: true },
        { id: 6, descripcion: 'Inspeccionar filtros de aire', completado: false, observaciones: '', obligatorio: false },
        { id: 7, descripcion: 'Documentar hallazgos', completado: false, observaciones: '', obligatorio: true }
      ]
    },
    multimedia: {
      fotos: [],
      videos: [],
      audios: [],
      documentos: []
    },
    firmaCliente: null,
    fechaFirma: null,
    coordenadas: { lat: 10.4036, lng: -75.4849 },
    progreso: 0
  },
  {
    id: 'OT-2025-045',
    numero: 'OT-2025-045',
    titulo: 'Mantenimiento Preventivo UPS Centro Comercial',
    cliente: 'C.C. La Plazuela',
    clienteId: 3,
    sede: 'SEDE-PZ-001',
    activo: 'A-003',
    activoNombre: 'UPS Centro Comercial',
    tipo: 'Mantenimiento Preventivo',
    subtipo: 'Estándar',
    estado: 'COMPLETADA',
    prioridad: 'Normal',
    fechaCreacion: '2025-01-20T11:15:00',
    fechaProgramada: '2025-01-21T14:00:00',
    fechaInicio: '2025-01-21T14:05:00',
    fechaFinalizacion: '2025-01-21T16:30:00',
    tecnicoAsignado: 'María Elena García',
    tecnicoId: 'EMP-003',
    descripcion: 'Mantenimiento preventivo trimestral de UPS',
    observaciones: 'Trabajo completado sin novedades',
    tiempoEstimado: 90,
    tiempoReal: 145,
    ubicacionTrabajo: 'Cuarto Técnico Principal',
    materiales: [
      { codigo: 'REP-005', nombre: 'Batería 12V 150Ah', cantidadPlaneada: 2, cantidadUsada: 2 },
      { codigo: 'CON-003', nombre: 'Cinta aislante 3M', cantidadPlaneada: 2, cantidadUsada: 1 }
    ],
    checklist: {
      templateId: 'CHKL-UPS-001',
      nombre: 'Checklist UPS Estándar',
      items: [
        { id: 1, descripcion: 'Inspección visual del equipo', completado: true, observaciones: 'Equipo en buen estado', obligatorio: true },
        { id: 2, descripcion: 'Verificar voltajes de entrada', completado: true, observaciones: '220V nominal', obligatorio: true },
        { id: 3, descripcion: 'Verificar voltajes de salida', completado: true, observaciones: '220V estable', obligatorio: true },
        { id: 4, descripcion: 'Revisar estado de baterías', completado: true, observaciones: 'Reemplazadas 2 baterías', obligatorio: true },
        { id: 5, descripcion: 'Prueba de autonomía', completado: true, observaciones: '12 min autonomía a 80% carga', obligatorio: true },
        { id: 6, descripcion: 'Limpieza general', completado: true, observaciones: 'Limpieza completa realizada', obligatorio: false }
      ]
    },
    multimedia: {
      fotos: ['foto-ups-antes.jpg', 'foto-baterias-nuevas.jpg', 'foto-ups-despues.jpg'],
      videos: [],
      audios: ['audio-cliente-satisfecho.mp3'],
      documentos: []
    },
    firmaCliente: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Base64 de firma
    fechaFirma: '2025-01-21T16:35:00',
    coordenadas: { lat: 10.3995, lng: -75.4921 },
    progreso: 100
  }
];

// ==================== INVENTARIO COMPLETO ====================
export const inventoryDataComplete = [
  {
    id: 1,
    codigo: 'REP-001',
    nombre: 'Filtro de aire Cummins',
    descripcion: 'Filtro de aire para planta eléctrica Cummins C150D5',
    categoria: 'repuestos',
    subcategoria: 'Filtros',
    marca: 'Cummins',
    modelo: 'AF26114',
    cantidad: 12,
    cantidadMinima: 5,
    cantidadMaxima: 20,
    precioUnitario: 85000,
    precioPromedio: 83500,
    ubicacion: 'Bodega A - Estante 3 - Nivel 2',
    proveedor: 'Cummins Colombia',
    codigoProveedor: 'CUM-AF26114',
    fechaUltimaCompra: '2024-12-15',
    fechaUltimoMovimiento: '2025-01-18',
    estado: 'Disponible',
    reservado: 0,
    imagen: '/images/inventory/rep-001.jpg',
    movimientos: [
      { fecha: '2025-01-18', tipo: 'Entrada', cantidad: 8, motivo: 'Compra programada', documento: 'FC-2025-001' },
      { fecha: '2025-01-15', tipo: 'Salida', cantidad: 2, motivo: 'OT-2025-041', documento: 'OT-2025-041' }
    ],
    compatibilidad: ['A-001', 'A-004', 'A-007'],
    especificaciones: {
      diametroExterno: '152mm',
      diametroInterno: '95mm',
      altura: '280mm',
      eficiencia: '99.5%'
    }
  },
  {
    id: 2,
    codigo: 'REP-002',
    nombre: 'Aceite lubricante 15W40',
    descripcion: 'Aceite lubricante sintético para motores diesel',
    categoria: 'consumibles',
    subcategoria: 'Lubricantes',
    marca: 'Shell',
    modelo: 'Rimula R6 M 15W40',
    cantidad: 45,
    cantidadMinima: 20,
    cantidadMaxima: 80,
    precioUnitario: 65000,
    precioPromedio: 63200,
    ubicacion: 'Bodega A - Estante 1 - Nivel 1',
    proveedor: 'Lubricantes del Caribe',
    codigoProveedor: 'SHELL-R6M-15W40',
    fechaUltimaCompra: '2025-01-10',
    fechaUltimoMovimiento: '2025-01-20',
    estado: 'Disponible',
    reservado: 8,
    imagen: '/images/inventory/rep-002.jpg',
    movimientos: [
      { fecha: '2025-01-20', tipo: 'Reserva', cantidad: 8, motivo: 'OT-2025-043', documento: 'OT-2025-043' },
      { fecha: '2025-01-15', tipo: 'Salida', cantidad: 12, motivo: 'OT-2025-040', documento: 'OT-2025-040' }
    ],
    compatibilidad: ['A-001', 'A-004', 'A-005', 'A-006'],
    especificaciones: {
      viscosidad: '15W40',
      tipo: 'Semi-sintético',
      presentacion: 'Galón 4L',
      certificaciones: ['API CK-4', 'ACEA E7']
    }
  },
  {
    id: 3,
    codigo: 'REP-003',
    nombre: 'Correa de transmisión A-78',
    descripcion: 'Correa trapezoidal tipo A longitud 78"',
    categoria: 'repuestos',
    subcategoria: 'Transmisión',
    marca: 'Gates',
    modelo: 'A78',
    cantidad: 8,
    cantidadMinima: 10,
    cantidadMaxima: 25,
    precioUnitario: 35000,
    precioPromedio: 34200,
    ubicacion: 'Bodega B - Estante 2 - Nivel 3',
    proveedor: 'Bandas y Correas SA',
    codigoProveedor: 'GATES-A78',
    fechaUltimaCompra: '2024-11-20',
    fechaUltimoMovimiento: '2024-12-18',
    estado: 'Bajo Stock',
    reservado: 0,
    imagen: '/images/inventory/rep-003.jpg',
    movimientos: [
      { fecha: '2024-12-18', tipo: 'Salida', cantidad: 3, motivo: 'OT-2024-298', documento: 'OT-2024-298' }
    ],
    compatibilidad: ['A-003', 'A-008'],
    especificaciones: {
      tipo: 'Trapezoidal',
      seccion: 'A',
      longitud: '78 pulgadas',
      material: 'Caucho reforzado'
    }
  },
  {
    id: 4,
    codigo: 'HER-001',
    nombre: 'Multímetro digital Fluke 87V',
    descripcion: 'Multímetro industrial True RMS',
    categoria: 'herramientas',
    subcategoria: 'Instrumentos de medición',
    marca: 'Fluke',
    modelo: '87V',
    cantidad: 3,
    cantidadMinima: 2,
    cantidadMaxima: 5,
    precioUnitario: 1850000,
    precioPromedio: 1820000,
    ubicacion: 'Almacén Principal - Vitrina de herramientas',
    proveedor: 'Instrumentos Técnicos',
    codigoProveedor: 'FLUKE-87V',
    fechaUltimaCompra: '2024-10-05',
    fechaUltimoMovimiento: '2025-01-21',
    estado: 'Disponible',
    reservado: 1,
    imagen: '/images/inventory/her-001.jpg',
    movimientos: [
      { fecha: '2025-01-21', tipo: 'Préstamo', cantidad: 1, motivo: 'OT-2025-044', documento: 'OT-2025-044' }
    ],
    compatibilidad: ['Todos los equipos eléctricos'],
    especificaciones: {
      tipo: 'True RMS',
      voltajeDC: '1000V',
      voltajeAC: '1000V',
      corrienteAC: '10A',
      resistencia: '50MΩ',
      precision: '±0.05%'
    }
  },
  {
    id: 5,
    codigo: 'REP-004',
    nombre: 'Batería 12V 150Ah',
    descripcion: 'Batería de arranque para planta eléctrica',
    categoria: 'repuestos',
    subcategoria: 'Baterías',
    marca: 'MAC',
    modelo: 'MAC-150',
    cantidad: 4,
    cantidadMinima: 2,
    cantidadMaxima: 8,
    precioUnitario: 580000,
    precioPromedio: 575000,
    ubicacion: 'Bodega A - Estante 5 - Nivel 1',
    proveedor: 'Baterías MAC',
    codigoProveedor: 'MAC-150-12V',
    fechaUltimaCompra: '2024-12-20',
    fechaUltimoMovimiento: '2025-01-21',
    estado: 'Disponible',
    reservado: 0,
    imagen: '/images/inventory/rep-004.jpg',
    movimientos: [
      { fecha: '2025-01-21', tipo: 'Salida', cantidad: 2, motivo: 'OT-2025-045', documento: 'OT-2025-045' }
    ],
    compatibilidad: ['A-001', 'A-003', 'A-004'],
    especificaciones: {
      voltaje: '12V',
      capacidad: '150Ah',
      tipo: 'AGM',
      dimensiones: '343x175x190mm',
      peso: '42kg',
      ciclosVida: '500 ciclos'
    }
  }
];

// ==================== REPORTES Y BITÁCORAS ====================
export const reportsDataComplete = [
  {
    id: 'RPT-2025-001',
    titulo: 'Reporte de Mantenimiento - UPS Centro Comercial',
    tipo: 'Mantenimiento',
    subtipo: 'Preventivo',
    cliente: 'C.C. La Plazuela',
    clienteId: 3,
    activo: 'A-003',
    ot: 'OT-2025-045',
    tecnico: 'María Elena García',
    fechaGeneracion: '2025-01-21T16:45:00',
    fechaTrabajo: '2025-01-21T14:00:00',
    duracion: 145,
    estado: 'Finalizado',
    resumenEjecutivo: 'Mantenimiento preventivo completado exitosamente. Se reemplazaron 2 baterías que presentaban baja capacidad. El sistema UPS opera dentro de parámetros normales.',
    trabajosRealizados: [
      'Inspección visual completa del equipo',
      'Medición de voltajes de entrada y salida',
      'Prueba de carga y autonomía',
      'Reemplazo de 2 baterías defectuosas',
      'Limpieza general del equipo',
      'Verificación de conexiones eléctricas'
    ],
    materialesUsados: [
      { codigo: 'REP-005', nombre: 'Batería 12V 150Ah', cantidad: 2, valor: 1160000 },
      { codigo: 'CON-003', nombre: 'Cinta aislante 3M', cantidad: 1, valor: 8500 }
    ],
    observaciones: 'Cliente muy satisfecho con el servicio. Se recomienda programar próximo mantenimiento en 3 meses.',
    recomendaciones: [
      'Mantener limpio el área del UPS',
      'Revisar carga conectada mensualmente',
      'Realizar prueba de autonomía cada 6 meses'
    ],
    proximoMantenimiento: '2025-04-21',
    valorTotal: 1168500,
    firmaCliente: 'Carolina Ruiz',
    calificacionServicio: 5,
    evidencias: {
      fotos: 3,
      videos: 0,
      audios: 1,
      documentos: 0
    }
  },
  {
    id: 'RPT-2025-002',
    titulo: 'Bitácora Mensual - Enero 2025',
    tipo: 'Bitácora',
    subtipo: 'Mensual',
    periodo: '2025-01',
    fechaGeneracion: '2025-01-31T23:59:00',
    estado: 'En proceso',
    resumen: {
      otProgramadas: 15,
      otCompletadas: 12,
      otPendientes: 3,
      horasTrabajadas: 287,
      eficiencia: 80,
      satisfaccionCliente: 4.7
    },
    clientes: [
      {
        cliente: 'Hotel Caribe S.A.',
        otCompletadas: 4,
        otPendientes: 1,
        horasTrabajadas: 89,
        valorFacturado: 15400000,
        satisfaccion: 4.8
      },
      {
        cliente: 'Comfenalco Sede Torre Norte',
        otCompletadas: 5,
        otPendientes: 1,
        horasTrabajadas: 125,
        valorFacturado: 28750000,
        satisfaccion: 4.9
      },
      {
        cliente: 'C.C. La Plazuela',
        otCompletadas: 3,
        otPendientes: 1,
        horasTrabajadas: 73,
        valorFacturado: 9280000,
        satisfaccion: 4.4
      }
    ],
    tecnicos: [
      {
        tecnico: 'Juan Carlos Pérez',
        otCompletadas: 5,
        horasTrabajadas: 108,
        eficiencia: 85,
        calificacion: 4.9
      },
      {
        tecnico: 'Carlos Alberto López',
        otCompletadas: 4,
        horasTrabajadas: 95,
        eficiencia: 82,
        calificacion: 4.8
      },
      {
        tecnico: 'María Elena García',
        otCompletadas: 3,
        horasTrabajadas: 84,
        eficiencia: 75,
        calificacion: 4.5
      }
    ]
  }
];

// ==================== PLANES Y CRONOGRAMAS ====================
export const planningDataComplete = [
  {
    id: 'PLAN-2025-Q1',
    nombre: 'Plan de Mantenimiento Q1 2025',
    periodo: 'Q1-2025',
    fechaInicio: '2025-01-01',
    fechaFin: '2025-03-31',
    estado: 'Activo',
    responsable: 'Coordinador de Mantenimiento',
    descripcion: 'Plan maestro de mantenimiento preventivo primer trimestre 2025',
    actividades: [
      {
        id: 'ACT-001',
        tipo: 'Mantenimiento Preventivo',
        activo: 'A-001',
        cliente: 'Hotel Caribe S.A.',
        frecuencia: 'Trimestral',
        fechasProgramadas: ['2025-01-15', '2025-04-15', '2025-07-15', '2025-10-15'],
        tecnicoAsignado: 'Juan Carlos Pérez',
        duracionEstimada: 180,
        estado: 'Programado'
      },
      {
        id: 'ACT-002',
        tipo: 'Mantenimiento Preventivo',
        activo: 'A-002',
        cliente: 'Comfenalco Sede Torre Norte',
        frecuencia: 'Trimestral',
        fechasProgramadas: ['2025-01-20', '2025-04-20', '2025-07-20', '2025-10-20'],
        tecnicoAsignado: 'Carlos Alberto López',
        duracionEstimada: 240,
        estado: 'Programado'
      },
      {
        id: 'ACT-003',
        tipo: 'Mantenimiento Preventivo',
        activo: 'A-003',
        cliente: 'C.C. La Plazuela',
        frecuencia: 'Trimestral',
        fechasProgramadas: ['2025-01-25', '2025-04-25', '2025-07-25', '2025-10-25'],
        tecnicoAsignado: 'María Elena García',
        duracionEstimada: 90,
        estado: 'Completado'
      }
    ],
    metricas: {
      cumplimiento: 85,
      eficiencia: 78,
      satisfaccionCliente: 4.7,
      costosReales: 125000000,
      costosPresupuestados: 140000000
    }
  }
];

// ==================== ESTADO GLOBAL DE LA APLICACIÓN ====================
export const appGlobalState = {
  usuario: {
    id: 'USR-001',
    nombre: 'Administrador Sistema',
    rol: 'Administrador',
    permisos: ['all']
  },
  configuracion: {
    empresa: 'MEKANOS S.A.S.',
    version: '1.0.3',
    fechaUltimaActualizacion: '2025-01-21T16:45:00'
  },
  estadisticas: {
    clientesActivos: 3,
    activosGestionados: 15,
    otPendientes: 3,
    otEnProceso: 0,
    tecnicosDisponibles: 2,
    alertasActivas: 2,
    inventarioCritico: 3
  }
};

export default {
  employeesData,
  clientsDataComplete,
  assetsDataComplete,
  workOrdersDataComplete,
  inventoryDataComplete,
  reportsDataComplete,
  planningDataComplete,
  appGlobalState
};
