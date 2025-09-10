import { create } from 'zustand'
import { mockReports } from '@data/mockData'

export const useStore = create((set, get) => ({
  user: { id: 2, name: 'Juan Pérez', role: 'technician' },
  notifications: [],
  reports: mockReports, // Inicializar con datos mock
  mobile: {
    currentOT: null,
    checklist: {},
    photos: [],
    signature: null,
  },
  setUser: (user) => set({ user }),
  addNotification: (n) => set({ notifications: [...get().notifications, n] }),
  setMobileState: (partial) => set({ mobile: { ...get().mobile, ...partial } }),
  addReport: (report) => set({ reports: [report, ...get().reports] }),
}))


