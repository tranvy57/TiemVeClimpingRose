import { IPainting } from "@/types/implements/painting";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICartItem } from "@/types/implements/cart-item";

interface CheckoutState {
  selectedCartItems: ICartItem[];
  totalPaintingsPrice: number;
  deliveryCost: number;
  totalPrice: number;
}

const initialState: CheckoutState = {
  selectedCartItems: [],
  totalPaintingsPrice: 0,
  deliveryCost: 0,
  totalPrice: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<CheckoutState>) => {
      return action.payload;
    },
    clearCheckoutData: () => initialState,
  },
});

export const { setCheckoutData, clearCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
