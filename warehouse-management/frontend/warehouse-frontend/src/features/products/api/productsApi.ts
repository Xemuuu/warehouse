import { apiClient } from '@/shared/lib/api/client';
import type { Product, ProductDetails, ProductInventory, PagedResult, ProductsFilters } from '../types/product.types';

export const productsApi = {
  getProducts: async (filters?: ProductsFilters): Promise<PagedResult<Product>> => {
    const response = await apiClient.get<PagedResult<Product>>('/products', {
      params: {
        search: filters?.search,
        categoryId: filters?.categoryId,
        color: filters?.color,
        minPrice: filters?.minPrice,
        maxPrice: filters?.maxPrice,
        locationId: filters?.locationId, // ✅ DODANE
        page: filters?.page || 1,
        pageSize: filters?.pageSize || 20,
        orderBy: filters?.orderBy || 'name',
      },
    });
    return response.data;
  },

  getProductById: async (id: number): Promise<ProductDetails> => {
    const response = await apiClient.get<ProductDetails>(`/products/${id}`);
    return response.data;
  },

  getProductInventory: async (id: number): Promise<ProductInventory[]> => {
    const response = await apiClient.get<ProductInventory[]>(`/products/${id}/inventory`);
    return response.data;
  },
};
