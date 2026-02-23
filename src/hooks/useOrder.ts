import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/lib/axios";

// Get company settings (public)
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await ApiClient.get(`/client/settings`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get invoice by token (main order data)
export const useInvoice = (token: string, options?: { refetchInterval?: number }) => {
  return useQuery({
    queryKey: ["invoice", token],
    queryFn: async () => {
      const response = await ApiClient.get(`/client/invoice/${token}`);
      return response.data;
    },
    enabled: !!token,
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

// Get order status by token (for polling)
export const useOrderStatus = (token: string) => {
  return useQuery({
    queryKey: ["order-status", token],
    queryFn: async () => {
      const response = await ApiClient.get(`/client/status/${token}`);
      return response.data;
    },
    enabled: !!token,
    refetchInterval: 120000, // Refetch every 2 minutes
  });
};

// Upload payment proof
export const useUploadPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, formData }: { token: string; formData: FormData }) => {
      const response = await ApiClient.api.post(`/client/payment/${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (_, { token }) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", token] });
      queryClient.invalidateQueries({ queryKey: ["order-status", token] });
    },
  });
};

// Submit driver data
export const useSubmitDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, data }: { token: string; data: any }) => {
      const response = await ApiClient.post(`/client/driver/${token}`, data);
      return response.data;
    },
    onSuccess: (_, { token }) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", token] });
      queryClient.invalidateQueries({ queryKey: ["order-status", token] });
    },
  });
};

// Upload vehicle photo
export const useUploadVehiclePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, formData }: { token: string; formData: FormData }) => {
      const response = await ApiClient.api.post(`/client/driver/${token}/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (_, { token }) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", token] });
    },
  });
};

// Get queue status by token
export const useQueueStatus = (token: string, options?: { refetchInterval?: number }) => {
  return useQuery({
    queryKey: ["queue-status", token],
    queryFn: async () => {
      const response = await ApiClient.get(`/client/queue/${token}`);
      return response.data;
    },
    enabled: !!token,
    refetchInterval: options?.refetchInterval,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

// Get delivery note by token
export const useDeliveryNote = (token: string, options?: { refetchInterval?: number }) => {
  return useQuery({
    queryKey: ["delivery-note", token],
    queryFn: async () => {
      const response = await ApiClient.get(`/client/delivery/${token}`);
      return response.data;
    },
    enabled: !!token,
    refetchInterval: options?.refetchInterval,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
