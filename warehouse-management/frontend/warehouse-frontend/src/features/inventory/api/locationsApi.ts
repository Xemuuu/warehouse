import { apiClient } from '@/shared/lib/api/client';
import type { LocationStats } from '../types/location.types';

export const locationsApi = {
  getLocationsStats: async (): Promise<LocationStats[]> => {
    const response = await apiClient.get<LocationStats[]>('/locations/stats');
    return response.data;
  },
};
