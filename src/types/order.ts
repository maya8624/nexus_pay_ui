export type OrderStatus =
  | "Pending"
  | "Created"
  | "Paid"
  | "Cancelled";


export interface OrderItemResponse {
    productId: number,
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface OrderResponse {
    orderId: number;
    status: OrderStatus;
    totalAmount: number;
    idempotencyKey: string,
    items: OrderItemResponse[];
    createdAt: string
}

export interface OrderSummary {
  orderId: number;
  status: string;       // string or your OrderStatus type
  totalAmount: number;
  createdAt: string;    // ISO string
}