"use client";
import React, { createContext, useContext, useReducer } from "react";
import { Order, OrderStatus } from "@/types";
import { toast } from "sonner";

// 1. Define actions
type OrderAction =
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_FILTER"; payload: OrderStatus | "all" }
  | { type: "UPDATE_STATUS"; payload: { status: OrderStatus; id: number } };

// 2. Define state structure
interface OrderState {
  orderList: Order[];
  filterBy: OrderStatus | "all";
}

// 3. Initial state
const initialState: OrderState = {
  orderList: [],
  filterBy: "all",
};

// 4. Reducer function
function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orderList: action.payload };
    case "ADD_ORDER":
      return { ...state, orderList: [...state.orderList, action.payload] };
    case "SET_FILTER":
      return { ...state, filterBy: action.payload };
    case "UPDATE_STATUS":
      return {
        ...state,
        orderList: state.orderList.map(
          (order) => (
            {
              ...order,
              status: order.id === action.payload.id
                ? action.payload.status
                : order.status,
            }
          ),
        ),
      };

    default:
      return state;
  }
}

// 5. Context
interface OrderContextType extends OrderState {
  dispatch: React.Dispatch<OrderAction>;
  updateStatus: (id: number, status: OrderStatus) => void;
  setOrders: (orders: Order[]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 6. Provider component
export const OrderProvider: React.FC<{ children: React.ReactNode }> = (
  { children },
) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const setOrders: OrderContextType["setOrders"] = async (orders: Order[]) => {
    dispatch({ type: "SET_ORDERS", payload: orders });
  };
  const updateStatus: OrderContextType["updateStatus"] = async (
    id: number,
    status: OrderStatus,
  ) => {
      dispatch({ type: "UPDATE_STATUS", payload: { id, status } });
      toast.success(`Status Updated to ${status}`);
  };
  const values = { ...state, dispatch, updateStatus, setOrders };

  return (
    <OrderContext.Provider value={values}>
      {children}
    </OrderContext.Provider>
  );
};

// 7. Custom hook
export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
