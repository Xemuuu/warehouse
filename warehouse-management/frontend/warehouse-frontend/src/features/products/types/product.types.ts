export interface Product {
  productId: number;
  productName: string;
  productNumber: string;
  color: string | null;
  listPrice: number;
  standardCost: number;
  categoryName: string | null;
  subcategoryName: string | null;
  totalStock: number;
  locationNames: string | null;
  totalCount: number;
}

export interface ProductInventory {
  productId: number;
  locationId: number;
  locationName: string;
  shelf: string;
  bin: number;
  quantity: number;
  safetyStockLevel: number;
  isBelowSafetyStock: boolean;
}

export interface ProductDetails {
  productId: number;
  productName: string;
  productNumber: string;
  color: string | null;
  listPrice: number;
  standardCost: number;
  categoryName: string | null;
  subcategoryName: string | null;
  totalStock: number;
  inventory: ProductInventory[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProductsFilters {
  search?: string;
  categoryId?: number;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  locationId?: number;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}
