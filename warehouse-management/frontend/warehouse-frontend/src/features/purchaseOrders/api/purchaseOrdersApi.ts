import { apiClient } from '@/shared/lib/api/client';
import type { PurchaseOrder, OperationResult } from '../types/purchaseOrder.types';

export const purchaseOrdersApi = {
  getPurchaseOrders: async (status?: number): Promise<PurchaseOrder[]> => {
    const response = await apiClient.get<PurchaseOrder[]>('/purchaseorders', {
      params: status ? { status } : undefined,
    });
    return response.data;
  },

  approvePurchaseOrder: async (id: number): Promise<OperationResult> => {
    const response = await apiClient.post<OperationResult>(`/purchaseorders/${id}/approve`);
    return response.data;
  },

  rejectPurchaseOrder: async (id: number): Promise<OperationResult> => {
    const response = await apiClient.post<OperationResult>(`/purchaseorders/${id}/reject`);
    return response.data;
  },
};
