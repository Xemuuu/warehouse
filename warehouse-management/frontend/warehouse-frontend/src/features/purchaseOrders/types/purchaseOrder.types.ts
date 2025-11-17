export interface PurchaseOrder {
  purchaseOrderId: number;
  orderNumber: string;
  orderDate: string; // ISO
  shipDate?: string | null;
  status: number;
  statusName: string;
  vendorId: number;
  vendorName: string;
  totalProducts: number;
  subtotal: number;
}

export interface OperationResult {
  success: boolean;
  message: string;
}
