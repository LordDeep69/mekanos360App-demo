// src/store/globalStore.js
// Store global para manejar el estado de la aplicación en tiempo real

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  employeesData,
  clientsDataComplete,
  assetsDataComplete,
  inventoryDataComplete,
  reportsDataComplete,
  planningDataComplete,
  appGlobalState
} from '../data/globalMockData';
import { updatedWorkOrdersData } from '../data/updatedWorkOrdersFixed';

const useGlobalStore = create(
  devtools(
    persist(
      (set, get) => ({
        // ==================== ESTADO INICIAL ====================
        employees: employeesData,
        clients: clientsDataComplete,
        assets: assetsDataComplete,
        workOrders: updatedWorkOrdersData,
        inventory: inventoryDataComplete,
        reports: reportsDataComplete,
        planning: planningDataComplete,
        appState: appGlobalState,
  // Control de vista: móvil o escritorio
  isMobileView: false,
        
        // Estado para notificaciones en tiempo real
        notifications: [],
        
        // Estado para la aplicación móvil
        mobileState: {
          currentTechnician: null,
          currentOT: null,
          activeChecklist: null,
          checklistProgress: 0
        },

        // ==================== ACCIONES DE CLIENTES ====================
        addClient: (client) => {
          set((state) => ({
            clients: [
              ...state.clients,
              {
                ...client,
                id: Math.max(...state.clients.map(c => c.id)) + 1,
                fechaRegistro: new Date().toISOString().split('T')[0],
                estadoCuenta: 'Al día'
              }
            ]
          }));
        },

        updateClient: (id, updatedClient) => {
          set((state) => ({
            clients: state.clients.map(client =>
              client.id === id ? { ...client, ...updatedClient } : client
            )
          }));
        },

        // ==================== ACCIONES DE ÓRDENES DE TRABAJO ====================
        // Acción para cambiar vista móvil/escritorio
        setIsMobileView: (value) => {
          set(() => ({ isMobileView: !!value }));
        },

        // Acción para alternar vista móvil/escritorio
        toggleMobileView: () => {
          set((state) => ({ isMobileView: !state.isMobileView }));
        },

        updateWorkOrder: (id, updates) => {
          set((state) => {
            const updatedWorkOrders = state.workOrders.map(wo =>
              wo.id === id ? { ...wo, ...updates } : wo
            );
            
            // Agregar notificación si cambió el estado
            const workOrder = updatedWorkOrders.find(wo => wo.id === id);
            let newNotifications = [...state.notifications];
            
            if (updates.estado && updates.estado !== state.workOrders.find(wo => wo.id === id)?.estado) {
              newNotifications.push({
                id: `not-${Date.now()}`,
                tipo: 'info',
                titulo: `OT ${id} actualizada`,
                mensaje: `Estado cambiado a: ${updates.estado}`,
                fecha: new Date().toISOString(),
                leida: false
              });
            }

            return {
              workOrders: updatedWorkOrders,
              notifications: newNotifications
            };
          });
        },

        completeWorkOrder: (id, completionData) => {
          set((state) => {
            const workOrder = state.workOrders.find(wo => wo.id === id);
            if (!workOrder) return state;

            const updatedWorkOrder = {
              ...workOrder,
              estado: 'COMPLETADA',
              fechaFinalizacion: new Date().toISOString(),
              tiempoReal: completionData.tiempoReal || workOrder.tiempoEstimado,
              progreso: 100,
              checklist: completionData.checklist || workOrder.checklist,
              multimedia: completionData.multimedia || workOrder.multimedia,
              firmaCliente: completionData.firmaCliente,
              fechaFirma: completionData.fechaFirma || new Date().toISOString(),
              observaciones: completionData.observaciones || workOrder.observaciones
            };

            // Generar reporte automáticamente
            const newReport = {
              id: `RPT-${new Date().getFullYear()}-${String(state.reports.length + 1).padStart(3, '0')}`,
              titulo: `Reporte de Mantenimiento - ${workOrder.activoNombre}`,
              tipo: 'Mantenimiento',
              subtipo: workOrder.subtipo,
              cliente: workOrder.cliente,
              clienteId: workOrder.clienteId,
              activo: workOrder.activo,
              ot: workOrder.id,
              tecnico: workOrder.tecnicoAsignado,
              fechaGeneracion: new Date().toISOString(),
              fechaTrabajo: workOrder.fechaInicio,
              duracion: completionData.tiempoReal || workOrder.tiempoEstimado,
              estado: 'Finalizado',
              resumenEjecutivo: completionData.resumenEjecutivo || `Mantenimiento ${workOrder.tipo.toLowerCase()} completado exitosamente.`,
              trabajosRealizados: workOrder.checklist?.items?.filter(item => item.completado).map(item => item.descripcion) || [],
              materialesUsados: workOrder.materiales?.filter(m => m.cantidadUsada > 0) || [],
              observaciones: completionData.observaciones || 'Trabajo completado sin novedades',
              recomendaciones: completionData.recomendaciones || [],
              proximoMantenimiento: completionData.proximoMantenimiento,
              valorTotal: (workOrder.materiales?.reduce((total, material) => 
                total + (material.cantidadUsada * (material.precioUnitario || 0)), 0) || 0),
              firmaCliente: completionData.nombreFirmaCliente || 'Cliente',
              calificacionServicio: completionData.calificacionServicio || 5,
              evidencias: {
                fotos: completionData.multimedia?.fotos?.length || 0,
                videos: completionData.multimedia?.videos?.length || 0,
                audios: completionData.multimedia?.audios?.length || 0,
                documentos: completionData.multimedia?.documentos?.length || 0
              }
            };

            // Actualizar inventario con materiales consumidos
            let updatedInventory = [...state.inventory];
            workOrder.materiales?.forEach(material => {
              if (material.cantidadUsada > 0) {
                const inventoryIndex = updatedInventory.findIndex(item => item.codigo === material.codigo);
                if (inventoryIndex !== -1) {
                  updatedInventory[inventoryIndex] = {
                    ...updatedInventory[inventoryIndex],
                    cantidad: updatedInventory[inventoryIndex].cantidad - material.cantidadUsada,
                    fechaUltimoMovimiento: new Date().toISOString().split('T')[0],
                    reservado: Math.max(0, (updatedInventory[inventoryIndex].reservado || 0) - material.cantidadUsada)
                  };
                  
                  // Agregar movimiento al inventario
                  updatedInventory[inventoryIndex].movimientos = [
                    {
                      fecha: new Date().toISOString().split('T')[0],
                      tipo: 'Salida',
                      cantidad: material.cantidadUsada,
                      motivo: workOrder.id,
                      documento: workOrder.id
                    },
                    ...(updatedInventory[inventoryIndex].movimientos || [])
                  ];
                }
              }
            });

            // Agregar notificación de completación
            const notification = {
              id: `not-${Date.now()}`,
              tipo: 'success',
              titulo: `OT ${id} completada`,
              mensaje: `${workOrder.tecnicoAsignado} completó el trabajo en ${workOrder.cliente}`,
              fecha: new Date().toISOString(),
              leida: false
            };

            return {
              workOrders: state.workOrders.map(wo => wo.id === id ? updatedWorkOrder : wo),
              reports: [newReport, ...state.reports],
              inventory: updatedInventory,
              notifications: [notification, ...state.notifications]
            };
          });
        },

        assignTechnician: (otId, technicianId, technicianName) => {
          set((state) => ({
            workOrders: state.workOrders.map(wo =>
              wo.id === otId
                ? {
                    ...wo,
                    tecnicoAsignado: technicianName,
                    tecnicoId: technicianId,
                    estado: 'ASIGNADA'
                  }
                : wo
            )
          }));
        },

        // ==================== ACCIONES DE INVENTARIO ====================
        updateInventoryItem: (codigo, updates) => {
          set((state) => ({
            inventory: state.inventory.map(item =>
              item.codigo === codigo ? { ...item, ...updates } : item
            )
          }));
        },

        consumeInventoryItem: (codigo, cantidad, motivo, documento) => {
          set((state) => {
            const updatedInventory = state.inventory.map(item => {
              if (item.codigo === codigo) {
                const newMovimiento = {
                  fecha: new Date().toISOString().split('T')[0],
                  tipo: 'Salida',
                  cantidad: cantidad,
                  motivo: motivo,
                  documento: documento
                };
                
                return {
                  ...item,
                  cantidad: Math.max(0, item.cantidad - cantidad),
                  fechaUltimoMovimiento: new Date().toISOString().split('T')[0],
                  movimientos: [newMovimiento, ...(item.movimientos || [])]
                };
              }
              return item;
            });

            return { inventory: updatedInventory };
          });
        },

        reserveInventoryItem: (codigo, cantidad, motivo) => {
          set((state) => ({
            inventory: state.inventory.map(item =>
              item.codigo === codigo
                ? {
                    ...item,
                    reservado: (item.reservado || 0) + cantidad,
                    fechaUltimoMovimiento: new Date().toISOString().split('T')[0]
                  }
                : item
            )
          }));
        },

        // ==================== ACCIONES MÓVILES ====================
        setCurrentTechnician: (technician) => {
          set((state) => ({
            mobileState: {
              ...state.mobileState,
              currentTechnician: technician
            }
          }));
        },

        startWorkOrder: (otId) => {
          const now = new Date().toISOString();
          set((state) => {
            const workOrder = state.workOrders.find(wo => wo.id === otId);
            if (!workOrder) return state;

            return {
              workOrders: state.workOrders.map(wo =>
                wo.id === otId
                  ? {
                      ...wo,
                      estado: 'EJECUTANDO',
                      fechaInicio: now
                    }
                  : wo
              ),
              mobileState: {
                ...state.mobileState,
                currentOT: otId,
                activeChecklist: workOrder.checklist,
                checklistProgress: 0
              }
            };
          });
        },

        updateChecklistItem: (otId, itemId, updates) => {
          set((state) => {
            const updatedWorkOrders = state.workOrders.map(wo => {
              if (wo.id === otId && wo.checklist) {
                const updatedItems = wo.checklist.items.map(item =>
                  item.id === itemId ? { ...item, ...updates } : item
                );
                
                const completedItems = updatedItems.filter(item => item.completado).length;
                const progress = (completedItems / updatedItems.length) * 100;

                return {
                  ...wo,
                  checklist: {
                    ...wo.checklist,
                    items: updatedItems
                  },
                  progreso: Math.round(progress)
                };
              }
              return wo;
            });

            // Actualizar progreso en el estado móvil
            const currentWO = updatedWorkOrders.find(wo => wo.id === otId);
            const newProgress = currentWO ? currentWO.progreso : 0;

            return {
              workOrders: updatedWorkOrders,
              mobileState: {
                ...state.mobileState,
                checklistProgress: newProgress,
                activeChecklist: currentWO?.checklist
              }
            };
          });
        },

        // ==================== ACCIONES DE REPORTES ====================
        addReport: (report) => {
          set((state) => ({
            reports: [
              {
                ...report,
                id: `RPT-${new Date().getFullYear()}-${String(state.reports.length + 1).padStart(3, '0')}`,
                fechaGeneracion: new Date().toISOString()
              },
              ...state.reports
            ]
          }));
        },

        // ==================== ACCIONES DE NOTIFICACIONES ====================
        addNotification: (notification) => {
          set((state) => ({
            notifications: [
              {
                ...notification,
                id: `not-${Date.now()}`,
                fecha: new Date().toISOString(),
                leida: false
              },
              ...state.notifications
            ]
          }));
        },

        markNotificationAsRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map(notification =>
              notification.id === id ? { ...notification, leida: true } : notification
            )
          }));
        },

        // ==================== ACCIONES DE BÚSQUEDA Y FILTROS ====================
        getWorkOrdersByTechnician: (technicianName) => {
          const { workOrders } = get();
          return workOrders.filter(wo => wo.tecnicoAsignado === technicianName);
        },

        getWorkOrdersByClient: (clientId) => {
          const { workOrders } = get();
          return workOrders.filter(wo => wo.clienteId === clientId);
        },

        getWorkOrdersByStatus: (status) => {
          const { workOrders } = get();
          return workOrders.filter(wo => wo.estado === status);
        },

        getAssetsByClient: (clientId) => {
          const { assets } = get();
          return assets.filter(asset => asset.clienteId === clientId);
        },

        getLowStockItems: () => {
          const { inventory } = get();
          return inventory.filter(item => item.cantidad <= item.cantidadMinima);
        },

        getRecentReports: (days = 30) => {
          const { reports } = get();
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - days);
          
          return reports.filter(report => 
            new Date(report.fechaGeneracion) >= cutoffDate
          );
        },

        // ==================== ESTADÍSTICAS Y MÉTRICAS ====================
        getStatistics: () => {
          const state = get();
          
          const otsPendientes = state.workOrders.filter(wo => wo.estado === 'PLANIFICADA' || wo.estado === 'ASIGNADA').length;
          const otsEnProceso = state.workOrders.filter(wo => wo.estado === 'EN RUTA' || wo.estado === 'EJECUTANDO').length;
          const otsCompletadas = state.workOrders.filter(wo => wo.estado === 'COMPLETADA').length;
          const tecnicosDisponibles = state.employees.filter(emp => emp.disponible).length;
          const inventarioCritico = state.inventory.filter(item => item.cantidad <= item.cantidadMinima).length;
          const alertasActivas = state.notifications.filter(not => !not.leida).length;

          return {
            ...state.appState.estadisticas,
            otPendientes: otsPendientes,
            otEnProceso: otsEnProceso,
            otsCompletadas: otsCompletadas,
            tecnicosDisponibles: tecnicosDisponibles,
            inventarioCritico: inventarioCritico,
            alertasActivas: alertasActivas,
            clientesActivos: state.clients.filter(c => c.estado === 'Activo').length,
            activosGestionados: state.assets.length
          };
        },

        // ==================== RESET Y UTILIDADES ====================
        resetToInitialState: () => {
          set({
            employees: employeesData,
            clients: clientsDataComplete,
            assets: assetsDataComplete,
            workOrders: updatedWorkOrdersData,
            inventory: inventoryDataComplete,
            reports: reportsDataComplete,
            planning: planningDataComplete,
            appState: appGlobalState,
            notifications: [],
            mobileState: {
              currentTechnician: null,
              currentOT: null,
              activeChecklist: null,
              checklistProgress: 0
            }
          });
        }
      }),
      {
        name: 'mekanos-global-store',
        version: 1,
      }
    ),
    {
      name: 'Mekanos Global Store'
    }
  )
);

export default useGlobalStore;