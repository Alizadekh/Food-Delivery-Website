"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
};

export type PromoCode = {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  description: string;
  minOrder?: number;
  expiryDate: string;
};

export type CartState = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  activePromo: PromoCode | null;
  itemCount: number;
  isModalOpen: boolean;
  promoInput?: string;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_PROMO"; payload: PromoCode }
  | { type: "REMOVE_PROMO" }
  | { type: "TOGGLE_MODAL" };

type CartContextType = {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  applyPromo: (promo: PromoCode) => boolean;
  removePromo: () => void;
  getItemQuantity: (id: number) => number;
  toggleModal: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const AVAILABLE_PROMO_CODES: PromoCode[] = [
  {
    id: "1",
    code: "ORDER5",
    discount: 5,
    type: "percentage",
    description: "Get 5% off your first order",
    minOrder: 0,
    expiryDate: "2024-12-31",
  },
  {
    id: "2",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    description: "10% off for new customers",
    minOrder: 20,
    expiryDate: "2024-12-31",
  },
  {
    id: "3",
    code: "SAVE3",
    discount: 3,
    type: "fixed",
    description: "$3 off any order",
    minOrder: 15,
    expiryDate: "2024-12-31",
  },
  {
    id: "4",
    code: "FREESHIP",
    discount: 5,
    type: "fixed",
    description: "Free shipping on any order",
    minOrder: 10,
    expiryDate: "2024-12-31",
  },
];

const calculateCartTotals = (
  items: CartItem[],
  activePromo: PromoCode | null
) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (activePromo && subtotal >= (activePromo.minOrder || 0)) {
    if (activePromo.type === "percentage") {
      discount = (subtotal * activePromo.discount) / 100;
    } else {
      discount = activePromo.discount;
    }
  }

  const total = Math.max(0, subtotal - discount);

  return { subtotal, discount, total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const totals = calculateCartTotals(newItems, state.activePromo);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);

      const totals = calculateCartTotals(newItems, state.activePromo);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateCartTotals(newItems, state.activePromo);
      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        activePromo: null,
        subtotal: 0,
        discount: 0,
        total: 0,
        itemCount: 0,
        isModalOpen: false,
      };
    }

    case "APPLY_PROMO": {
      const totals = calculateCartTotals(state.items, action.payload);
      return {
        ...state,
        activePromo: action.payload,
        ...totals,
      };
    }

    case "REMOVE_PROMO": {
      const totals = calculateCartTotals(state.items, null);
      return {
        ...state,
        activePromo: null,
        ...totals,
      };
    }

    case "TOGGLE_MODAL": {
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  activePromo: null,
  subtotal: 0,
  discount: 0,
  total: 0,
  itemCount: 0,
  isModalOpen: false,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedPromo = localStorage.getItem("activePromo");

    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        cartData.forEach((item: CartItem) => {
          dispatch({ type: "ADD_ITEM", payload: item });
        });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    if (savedPromo) {
      try {
        const promoData = JSON.parse(savedPromo);
        dispatch({ type: "APPLY_PROMO", payload: promoData });
      } catch (error) {
        console.error("Error loading promo from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    if (state.activePromo) {
      localStorage.setItem("activePromo", JSON.stringify(state.activePromo));
    } else {
      localStorage.removeItem("activePromo");
    }
  }, [state.activePromo]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const applyPromo = (promo: PromoCode): boolean => {
    if (state.subtotal >= (promo.minOrder || 0)) {
      dispatch({ type: "APPLY_PROMO", payload: promo });
      return true;
    }
    return false;
  };

  const removePromo = () => {
    dispatch({ type: "REMOVE_PROMO" });
  };

  const getItemQuantity = (id: number): number => {
    const item = state.items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromo,
        removePromo,
        getItemQuantity,
        toggleModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
