import { apiClient } from '@/shared/lib/api/client';
import type { PurchaseOrder } from '../types/purchaseOrder.types';

export const purchaseOrdersApi = {
  getPurchaseOrders: async (status?: number, page = 1, pageSize = 10): Promise<PurchaseOrder[]> => {
    const response = await apiClient.get<PurchaseOrder[]>('/purchaseorders', {
      params: { status, page, pageSize },
    });
    return response.data;
  },

  // ✅ Dodano brakującą metodę approvePurchaseOrder
  approvePurchaseOrder: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/purchaseorders/${id}/approve`);
    return response.data;
  },

  // ✅ Dodano brakującą metodę rejectPurchaseOrder
  rejectPurchaseOrder: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/purchaseorders/${id}/reject`);
    return response.data;
  },
};
