export interface PurchaseOrder {
  purchaseOrderId: number;
  orderNumber: string;
  orderDate: string;
  shipDate?: string | null;
  status: number;
  statusName: string;
  vendorId: number;
  vendorName: string;
  totalProducts: number;
  subtotal: number;
  totalCount: number; // Dodane dla paginacji
}

export interface OperationResult {
  success: boolean;
  message: string;
}
