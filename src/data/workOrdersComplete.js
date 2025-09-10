// Datos completos de órdenes de trabajo para el 8 de septiembre de 2025
export const workOrdersCompleteData = [
  // ============ ÓRDENES COMPLETADAS RECIENTEMENTE (Con reportes completos) ============
  {
    id: 'OT-2025-089',
    cliente: 'Hotel Caribe Internacional',
    clienteId: 1,
    activo: 'AST-001',
    activoNombre: 'Chiller Principal Lobby',
    tipo: 'Preventivo',
    subtipo: 'Mantenimiento Tipo A',
    prioridad: 'Media',
    estado: 'COMPLETADA',
    fechaCreacion: '2025-09-07',
    fechaProgramada: '2025-09-07',
    fechaInicio: '2025-09-07T08:00:00',
    fechaFinalizacion: '2025-09-07T11:30:00',
    horaProgramada: '08:00',
    ubicacion: 'Cartagena',
    ubicacionTrabajo: 'Lobby Principal - Nivel Sótano',
    tecnicoAsignado: 'Juan Carlos Pérez',
    tecnicoId: 1,
    tiempoEstimado: 3,
    tiempoReal: 3.5,
    progreso: 100,
    observaciones: 'Mantenimiento preventivo completado exitosamente. Se detectó desgaste en rodamientos, se recomienda reemplazo en próximo mantenimiento.',
    materiales: [
      { 
        codigo: 'FIL-001', 
        nombre: 'Filtro de aire industrial', 
        cantidadPlanificada: 2, 
        cantidadUsada: 2, 
        precioUnitario: 45000,
        unidad: 'unidades'
      },
      { 
        codigo: 'ACE-002', 
        nombre: 'Aceite sintético SAE 10W-30', 
        cantidadPlanificada: 8, 
        cantidadUsada: 7.5, 
        precioUnitario: 12000,
        unidad: 'litros'
      },
      { 
        codigo: 'LUB-003', 
        nombre: 'Grasa multiuso alta temperatura', 
        cantidadPlanificada: 2, 
        cantidadUsada: 1.8, 
        precioUnitario: 18000,
        unidad: 'kg'
      }
    ],
    checklist: {
      nombre: 'Mantenimiento Preventivo Chiller - Tipo A',
      items: [
        {
          id: 1, 
          descripcion: 'Inspección visual general del equipo',
          completado: true,
          estado: 'OK',
          observaciones: 'Equipo en buen estado visual, sin corrosión aparente',
          valor: null,
          fechaCompletado: '2025-09-07T08:15:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 2,
          descripcion: 'Verificar presión del refrigerante R-410A',
          completado: true,
          estado: 'OK',
          valor: '4.2 bar',
          unidad: 'bar',
          rangoMinimo: 3.8,
          rangoMaximo: 4.5,
          observaciones: 'Presión dentro de parámetros normales',
          fechaCompletado: '2025-09-07T08:30:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 3,
          descripcion: 'Medición de temperatura de entrada del agua',
          completado: true,
          estado: 'OK',
          valor: '12.5°C',
          unidad: '°C',
          rangoMinimo: 10,
          rangoMaximo: 15,
          observaciones: 'Temperatura dentro del rango óptimo',
          fechaCompletado: '2025-09-07T08:45:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 4,
          descripcion: 'Cambio de filtros de aire',
          completado: true,
          estado: 'OK',
          observaciones: 'Filtros reemplazados exitosamente. Filtros anteriores muy sucios.',
          fechaCompletado: '2025-09-07T09:15:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 5,
          descripcion: 'Limpieza profunda del condensador',
          completado: true,
          estado: 'OK',
          observaciones: 'Condensador limpiado con químicos especializados. Mejoró transferencia de calor.',
          fechaCompletado: '2025-09-07T10:00:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 6,
          descripcion: 'Verificar conexiones eléctricas y torque',
          completado: true,
          estado: 'OBSERVACION',
          observaciones: 'Encontrada conexión floja en contactor principal. Corregida.',
          fechaCompletado: '2025-09-07T10:30:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 7,
          descripcion: 'Medición de corriente eléctrica',
          completado: true,
          estado: 'OK',
          valor: '22.8 A',
          unidad: 'A',
          rangoMinimo: 20,
          rangoMaximo: 25,
          observaciones: 'Corriente dentro de parámetros normales',
          fechaCompletado: '2025-09-07T10:45:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 8,
          descripcion: 'Lubricación de rodamientos',
          completado: true,
          estado: 'OBSERVACION',
          observaciones: 'Rodamientos lubricados. Se observa ligero desgaste, programar revisión en 3 meses.',
          fechaCompletado: '2025-09-07T11:00:00',
          tecnico: 'Juan Carlos Pérez'
        },
        {
          id: 9,
          descripcion: 'Prueba de funcionamiento final',
          completado: true,
          estado: 'OK',
          observaciones: 'Sistema funcionando correctamente. Temperaturas estables.',
          fechaCompletado: '2025-09-07T11:15:00',
          tecnico: 'Juan Carlos Pérez'
        }
      ]
    },
    multimedia: {
      fotos: [
        { 
          id: 'foto-001', 
          nombre: 'estado_inicial_chiller.jpg', 
          url: '/uploads/ot-2025-089/estado_inicial_chiller.jpg', 
          fecha: '2025-09-07T08:00:00',
          descripcion: 'Estado inicial del chiller antes del mantenimiento',
          tipo: 'antes'
        },
        { 
          id: 'foto-002', 
          nombre: 'filtros_sucios_removidos.jpg', 
          url: '/uploads/ot-2025-089/filtros_sucios_removidos.jpg', 
          fecha: '2025-09-07T09:10:00',
          descripcion: 'Filtros de aire removidos - estado muy sucio',
          tipo: 'proceso'
        },
        { 
          id: 'foto-003', 
          nombre: 'filtros_nuevos_instalados.jpg', 
          url: '/uploads/ot-2025-089/filtros_nuevos_instalados.jpg', 
          fecha: '2025-09-07T09:20:00',
          descripcion: 'Filtros nuevos instalados correctamente',
          tipo: 'proceso'
        },
        { 
          id: 'foto-004', 
          nombre: 'conexion_electrica_corregida.jpg', 
          url: '/uploads/ot-2025-089/conexion_electrica_corregida.jpg', 
          fecha: '2025-09-07T10:35:00',
          descripcion: 'Conexión eléctrica floja corregida y asegurada',
          tipo: 'correccion'
        },
        { 
          id: 'foto-005', 
          nombre: 'mediciones_finales_ok.jpg', 
          url: '/uploads/ot-2025-089/mediciones_finales_ok.jpg', 
          fecha: '2025-09-07T11:10:00',
          descripcion: 'Mediciones finales dentro de parámetros',
          tipo: 'resultado'
        },
        { 
          id: 'foto-006', 
          nombre: 'sistema_funcionando_final.jpg', 
          url: '/uploads/ot-2025-089/sistema_funcionando_final.jpg', 
          fecha: '2025-09-07T11:25:00',
          descripcion: 'Sistema funcionando correctamente después del mantenimiento',
          tipo: 'despues'
        }
      ],
      videos: [
        {
          id: 'video-001',
          nombre: 'prueba_funcionamiento_final.mp4',
          url: '/uploads/ot-2025-089/prueba_funcionamiento_final.mp4',
          fecha: '2025-09-07T11:20:00',
          descripcion: 'Video de prueba de funcionamiento final del chiller',
          duracion: '2:45'
        }
      ],
      audios: [],
      documentos: [
        {
          id: 'doc-001',
          nombre: 'hoja_vida_filtros.pdf',
          url: '/uploads/ot-2025-089/hoja_vida_filtros.pdf',
          fecha: '2025-09-07T09:30:00',
          descripcion: 'Hoja de vida de los filtros instalados'
        }
      ]
    },
    instrumentos: [
      {
        id: 'inst-001',
        nombre: 'Manómetro digital',
        marca: 'Fluke',
        modelo: 'DPI-104',
        ultimaCalibracion: '2025-08-15',
        proximaCalibracion: '2026-08-15',
        medicionesRealizadas: ['Presión refrigerante: 4.2 bar']
      },
      {
        id: 'inst-002',
        nombre: 'Termómetro infrarrojo',
        marca: 'Fluke',
        modelo: '62-MAX',
        ultimaCalibracion: '2025-07-20',
        proximaCalibracion: '2026-07-20',
        medicionesRealizadas: ['Temperatura entrada agua: 12.5°C']
      },
      {
        id: 'inst-003',
        nombre: 'Amperímetro de gancho',
        marca: 'Fluke',
        modelo: '376',
        ultimaCalibracion: '2025-08-01',
        proximaCalibracion: '2026-08-01',
        medicionesRealizadas: ['Corriente motor: 22.8 A']
      }
    ],
    firmaCliente: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    fechaFirma: '2025-09-07T11:30:00',
    nombreFirmaCliente: 'Carlos Mendoza - Jefe de Mantenimiento Hotel Caribe',
    calificacionServicio: 5,
    comentariosCliente: 'Excelente trabajo, muy profesional y detallado. Quedó muy satisfecho con el servicio.',
    recomendaciones: [
      'Programar revisión de rodamientos en 3 meses',
      'Mantener frecuencia de cambio de filtros cada 2 meses',
      'Monitorear conexiones eléctricas mensualmente'
    ],
    proximoMantenimiento: '2025-12-07',
    costoManoObra: 280000,
    costoMateriales: 126000,
    costoTotal: 406000,
    reporteGenerado: true,
    reporteId: 'RPT-2025-089',
    fechaReporte: '2025-09-07T11:45:00'
  },

  {
    id: 'OT-2025-090',
    cliente: 'Centro Comercial Bocagrande',
    clienteId: 2,
    activo: 'AST-005',
    activoNombre: 'Sistema HVAC Zona de Comidas',
    tipo: 'Correctivo',
    subtipo: 'Reparación Urgente',
    prioridad: 'Alta',
    estado: 'COMPLETADA',
    fechaCreacion: '2025-09-06',
    fechaProgramada: '2025-09-06',
    fechaInicio: '2025-09-06T14:00:00',
    fechaFinalizacion: '2025-09-06T17:45:00',
    horaProgramada: '14:00',
    ubicacion: 'Cartagena',
    ubicacionTrabajo: 'Zona de Comidas - Nivel 2',
    tecnicoAsignado: 'María Elena Rodríguez',
    tecnicoId: 2,
    tiempoEstimado: 3,
    tiempoReal: 3.75,
    progreso: 100,
    observaciones: 'Reparación de emergencia completada. Se reemplazó motor del ventilador principal que presentaba falla total.',
    materiales: [
      { 
        codigo: 'MOT-005', 
        nombre: 'Motor ventilador 3HP 220V', 
        cantidadPlanificada: 1, 
        cantidadUsada: 1, 
        precioUnitario: 850000,
        unidad: 'unidades'
      },
      { 
        codigo: 'ROD-001', 
        nombre: 'Rodamientos 6208-2RS', 
        cantidadPlanificada: 2, 
        cantidadUsada: 2, 
        precioUnitario: 35000,
        unidad: 'unidades'
      },
      { 
        codigo: 'CAB-003', 
        nombre: 'Cable eléctrico 12AWG', 
        cantidadPlanificada: 5, 
        cantidadUsada: 4.2, 
        precioUnitario: 8500,
        unidad: 'metros'
      }
    ],
    checklist: {
      nombre: 'Reparación Sistema HVAC - Emergencia',
      items: [
        {
          id: 1,
          descripcion: 'Diagnóstico inicial del sistema',
          completado: true,
          estado: 'CRITICO',
          observaciones: 'Motor principal completamente dañado, sin funcionamiento',
          fechaCompletado: '2025-09-06T14:15:00',
          tecnico: 'María Elena Rodríguez'
        },
        {
          id: 2,
          descripcion: 'Desconexión segura del sistema eléctrico',
          completado: true,
          estado: 'OK',
          observaciones: 'Sistema desconectado correctamente, etiquetado para seguridad',
          fechaCompletado: '2025-09-06T14:30:00',
          tecnico: 'María Elena Rodríguez'
        },
        {
          id: 3,
          descripcion: 'Desmontaje del motor dañado',
          completado: true,
          estado: 'OK',
          observaciones: 'Motor removido. Se encontró bobinado quemado y rodamientos grippados',
          fechaCompletado: '2025-09-06T15:15:00',
          tecnico: 'María Elena Rodríguez'
        },
        {
          id: 4,
          descripcion: 'Instalación del motor nuevo',
          completado: true,
          estado: 'OK',
          observaciones: 'Motor nuevo instalado con torque adecuado',
          fechaCompletado: '2025-09-06T16:30:00',
          tecnico: 'María Elena Rodríguez'
        },
        {
          id: 5,
          descripcion: 'Conexión eléctrica y cableado',
          completado: true,
          estado: 'OK',
          observaciones: 'Cableado renovado, conexiones aseguradas correctamente',
          fechaCompletado: '2025-09-06T17:00:00',
          tecnico: 'María Elena Rodríguez'
        },
        {
          id: 6,
          descripcion: 'Pruebas de funcionamiento y ajuste',
          completado: true,
          estado: 'OK',
          observaciones: 'Sistema funcionando correctamente, caudal de aire restaurado',
          fechaCompletado: '2025-09-06T17:30:00',
          tecnico: 'María Elena Rodríguez'
        }
      ]
    },
    multimedia: {
      fotos: [
        { 
          id: 'foto-001', 
          nombre: 'motor_dañado_inicial.jpg', 
          url: '/uploads/ot-2025-090/motor_dañado_inicial.jpg', 
          fecha: '2025-09-06T14:20:00',
          descripcion: 'Estado del motor dañado - bobinado quemado visible',
          tipo: 'antes'
        },
        { 
          id: 'foto-002', 
          nombre: 'rodamientos_grippados.jpg', 
          url: '/uploads/ot-2025-090/rodamientos_grippados.jpg', 
          fecha: '2025-09-06T15:00:00',
          descripcion: 'Rodamientos completamente grippados del motor anterior',
          tipo: 'diagnostico'
        },
        { 
          id: 'foto-003', 
          nombre: 'motor_nuevo_empacado.jpg', 
          url: '/uploads/ot-2025-090/motor_nuevo_empacado.jpg', 
          fecha: '2025-09-06T15:45:00',
          descripcion: 'Motor de reemplazo nuevo en su empaque original',
          tipo: 'proceso'
        },
        { 
          id: 'foto-004', 
          nombre: 'instalacion_motor_proceso.jpg', 
          url: '/uploads/ot-2025-090/instalacion_motor_proceso.jpg', 
          fecha: '2025-09-06T16:15:00',
          descripcion: 'Proceso de instalación del motor nuevo',
          tipo: 'proceso'
        },
        { 
          id: 'foto-005', 
          nombre: 'conexiones_electricas_nuevas.jpg', 
          url: '/uploads/ot-2025-090/conexiones_electricas_nuevas.jpg', 
          fecha: '2025-09-06T17:05:00',
          descripcion: 'Nuevas conexiones eléctricas instaladas y etiquetadas',
          tipo: 'proceso'
        },
        { 
          id: 'foto-006', 
          nombre: 'sistema_funcionando_reparado.jpg', 
          url: '/uploads/ot-2025-090/sistema_funcionando_reparado.jpg', 
          fecha: '2025-09-06T17:40:00',
          descripcion: 'Sistema HVAC funcionando correctamente después de la reparación',
          tipo: 'despues'
        }
      ],
      videos: [
        {
          id: 'video-001',
          nombre: 'prueba_funcionamiento_hvac.mp4',
          url: '/uploads/ot-2025-090/prueba_funcionamiento_hvac.mp4',
          fecha: '2025-09-06T17:35:00',
          descripcion: 'Video prueba de funcionamiento del sistema HVAC reparado',
          duracion: '1:30'
        }
      ],
      audios: [],
      documentos: [
        {
          id: 'doc-001',
          nombre: 'garantia_motor_nuevo.pdf',
          url: '/uploads/ot-2025-090/garantia_motor_nuevo.pdf',
          fecha: '2025-09-06T17:45:00',
          descripcion: 'Certificado de garantía del motor instalado - 2 años'
        }
      ]
    },
    instrumentos: [
      {
        id: 'inst-004',
        nombre: 'Multímetro digital',
        marca: 'Fluke',
        modelo: '87V',
        ultimaCalibracion: '2025-07-15',
        proximaCalibracion: '2026-07-15',
        medicionesRealizadas: ['Continuidad bobinado: OK', 'Voltaje alimentación: 220V']
      },
      {
        id: 'inst-005',
        nombre: 'Anemómetro',
        marca: 'Extech',
        modelo: 'AN25',
        ultimaCalibracion: '2025-08-10',
        proximaCalibracion: '2026-08-10',
        medicionesRealizadas: ['Velocidad aire: 4.2 m/s']
      }
    ],
    firmaCliente: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    fechaFirma: '2025-09-06T17:45:00',
    nombreFirmaCliente: 'Roberto Silva - Administrador Centro Comercial',
    calificacionServicio: 5,
    comentariosCliente: 'Respuesta muy rápida ante la emergencia. Solucionaron el problema eficientemente.',
    recomendaciones: [
      'Implementar mantenimiento preventivo mensual',
      'Instalar sistema de monitoreo de vibraciones',
      'Revisar otras unidades del mismo modelo'
    ],
    proximoMantenimiento: '2025-10-06',
    costoManoObra: 450000,
    costoMateriales: 920700,
    costoTotal: 1370700,
    reporteGenerado: true,
    reporteId: 'RPT-2025-090',
    fechaReporte: '2025-09-06T18:00:00'
  },

  // ============ ÓRDENES PROGRAMADAS PARA HOY (8 Sept 2025) ============
  {
    id: 'OT-2025-091',
    cliente: 'Hotel Caribe Internacional',
    clienteId: 1,
    activo: 'AST-002',
    activoNombre: 'Bomba de Agua Potable Principal',
    tipo: 'Preventivo',
    subtipo: 'Mantenimiento Tipo B',
    prioridad: 'Media',
    estado: 'ASIGNADA',
    fechaCreacion: '2025-09-06',
    fechaProgramada: '2025-09-08',
    fechaInicio: null,
    fechaFinalizacion: null,
    horaProgramada: '09:00',
    ubicacion: 'Cartagena',
    ubicacionTrabajo: 'Cuarto de Máquinas - Sótano Principal',
    tecnicoAsignado: 'Juan Carlos Pérez',
    tecnicoId: 1,
    tiempoEstimado: 2.5,
    tiempoReal: null,
    progreso: 0,
    observaciones: 'Mantenimiento preventivo programado - revisión bomba principal',
    materiales: [
      { 
        codigo: 'SEL-001', 
        nombre: 'Sello mecánico bomba', 
        cantidadPlanificada: 1, 
        cantidadUsada: 0, 
        precioUnitario: 125000,
        unidad: 'unidades'
      },
      { 
        codigo: 'ACE-004', 
        nombre: 'Aceite hidráulico ISO 46', 
        cantidadPlanificada: 3, 
        cantidadUsada: 0, 
        precioUnitario: 15000,
        unidad: 'litros'
      }
    ],
    checklist: {
      nombre: 'Mantenimiento Preventivo Bomba - Tipo B',
      items: [
        {
          id: 1,
          descripcion: 'Inspección visual de la bomba y accesorios',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 2,
          descripcion: 'Verificar presión de succión y descarga',
          completado: false,
          estado: null,
          valor: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 3,
          descripcion: 'Revisar sello mecánico',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 4,
          descripcion: 'Lubricación de rodamientos',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 5,
          descripcion: 'Prueba de funcionamiento',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        }
      ]
    },
    multimedia: {
      fotos: [],
      videos: [],
      audios: [],
      documentos: []
    },
    instrumentos: [],
    firmaCliente: null,
    fechaFirma: null,
    nombreFirmaCliente: null,
    reporteGenerado: false
  },

  {
    id: 'OT-2025-092',
    cliente: 'Edificio Residencial Torres del Mar',
    clienteId: 3,
    activo: 'AST-010',
    activoNombre: 'Ascensor Principal Torre A',
    tipo: 'Preventivo',
    subtipo: 'Inspección Mensual',
    prioridad: 'Alta',
    estado: 'ASIGNADA',
    fechaCreacion: '2025-09-05',
    fechaProgramada: '2025-09-08',
    fechaInicio: null,
    fechaFinalizacion: null,
    horaProgramada: '14:00',
    ubicacion: 'Cartagena',
    ubicacionTrabajo: 'Torre A - Todos los pisos',
    tecnicoAsignado: 'Carlos Alberto Muñoz',
    tecnicoId: 3,
    tiempoEstimado: 2,
    tiempoReal: null,
    progreso: 0,
    observaciones: 'Inspección mensual obligatoria según normativas',
    materiales: [
      { 
        codigo: 'LUB-001', 
        nombre: 'Grasa para guías', 
        cantidadPlanificada: 1, 
        cantidadUsada: 0, 
        precioUnitario: 25000,
        unidad: 'kg'
      }
    ],
    checklist: {
      nombre: 'Inspección Mensual Ascensor',
      items: [
        {
          id: 1,
          descripcion: 'Revisión de cables de tracción',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 2,
          descripcion: 'Inspección de guías y deslizaderas',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 3,
          descripcion: 'Prueba de frenos de emergencia',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 4,
          descripcion: 'Verificación de sistemas de seguridad',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        }
      ]
    },
    multimedia: {
      fotos: [],
      videos: [],
      audios: [],
      documentos: []
    },
    instrumentos: [],
    firmaCliente: null,
    fechaFirma: null,
    nombreFirmaCliente: null,
    reporteGenerado: false
  },

  {
    id: 'OT-2025-093',
    cliente: 'Centro Comercial Bocagrande',
    clienteId: 2,
    activo: 'AST-006',
    activoNombre: 'Sistema de Iluminación LED Principal',
    tipo: 'Correctivo',
    subtipo: 'Reemplazo de componentes',
    prioridad: 'Media',
    estado: 'ASIGNADA',
    fechaCreacion: '2025-09-07',
    fechaProgramada: '2025-09-08',
    fechaInicio: null,
    fechaFinalizacion: null,
    horaProgramada: '16:30',
    ubicacion: 'Cartagena',
    ubicacionTrabajo: 'Área Principal del Mall',
    tecnicoAsignado: 'María Elena Rodríguez',
    tecnicoId: 2,
    tiempoEstimado: 1.5,
    tiempoReal: null,
    progreso: 0,
    observaciones: 'Reemplazo de luminarias LED defectuosas reportadas por administración',
    materiales: [
      { 
        codigo: 'LED-001', 
        nombre: 'Luminaria LED 50W 6500K', 
        cantidadPlanificada: 8, 
        cantidadUsada: 0, 
        precioUnitario: 85000,
        unidad: 'unidades'
      },
      { 
        codigo: 'BAL-001', 
        nombre: 'Balasto electrónico', 
        cantidadPlanificada: 4, 
        cantidadUsada: 0, 
        precioUnitario: 45000,
        unidad: 'unidades'
      }
    ],
    checklist: {
      nombre: 'Reemplazo Luminarias LED',
      items: [
        {
          id: 1,
          descripcion: 'Identificar luminarias defectuosas',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 2,
          descripcion: 'Desconexión segura del sistema',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 3,
          descripcion: 'Reemplazo de luminarias',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        },
        {
          id: 4,
          descripcion: 'Prueba de funcionamiento',
          completado: false,
          estado: null,
          observaciones: null,
          fechaCompletado: null
        }
      ]
    },
    multimedia: {
      fotos: [],
      videos: [],
      audios: [],
      documentos: []
    },
    instrumentos: [],
    firmaCliente: null,
    fechaFirma: null,
    nombreFirmaCliente: null,
    reporteGenerado: false
  }
];
