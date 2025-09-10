// Servicios de datos simulados centralizados
import { mockClients, mockAssets, mockWorkOrders, mockReports } from '@data/mockData'

export const services = {
  getTodayWorkOrders() {
    return Promise.resolve(mockWorkOrders)
  },
  getClients() {
    return Promise.resolve(mockClients)
  },
  getAssets() {
    return Promise.resolve(mockAssets)
  },
  getReportsByClient(clientId) {
    const reports = mockReports.filter(r => r.client_id === clientId)
    return Promise.resolve(reports)
  }
}


