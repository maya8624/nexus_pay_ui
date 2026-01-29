import api from "../services/apiClient";
import type { OrderResponse } from "../types/order";

export const getOrderById = async (orderId: number): Promise<OrderResponse> => {
    const response = await api.get<OrderResponse>(`/api/order/${orderId}`)
    return response.data;
}

export const getOrders = async (): Promise<OrderResponse[]> => {
  const response = await api.get<OrderResponse[]>("/api/order/orders");
  return response.data;
};