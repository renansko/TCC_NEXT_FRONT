"use server";

import { OrderResponse } from "../types";
import { OrderFormData, OrderItemFormData } from "../types";

const BASE_URL = "http://localhost:3400";

export async function createOrder(
  data: OrderFormData
): Promise<{ order: OrderResponse }> {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        dateRequested: data.dateRequested.toISOString(),
        dateDelivery: data.dateDelivery.toISOString(),
        orderNumber: Math.random().toString(36).substring(7),
        outgoingAddress: data.deliveryAddress,
      }),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error occurred" }));
      throw new Error(error.message || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getAllOrders(
  page = 1
): Promise<{ orders: OrderResponse[] }> {
  try {
    const response = await fetch(`${BASE_URL}/order?page=${page}`);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error occurred" }));
      throw new Error(error.message || "Failed to fetch orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(
  id: string
): Promise<{ order: OrderResponse }> {
  try {
    const response = await fetch(`${BASE_URL}/order-by-id/${id}`);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error occurred" }));
      throw new Error(error.message || "Failed to fetch order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}
