import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  buyPayPalTicket,
  buyStripeTicket,
  fetchEventData,
} from './ticketBuyAPI';

import { RootState } from '../../app/store';
import { FetchState, PaymentMethod } from '../../app/types';
import { getPaymentCommission } from '../../utils/getPaymentCommission';

interface BuyTicketState {
  isLoading: FetchState;
  eventId: number;
  count: number;
  paymentUrl: string;
  userName: string;
  userEmail: string;
  paymentMethod: PaymentMethod;
  price: number;
  finalPrice: number;
  availableCount: number;
  commission: number;
}

export const getEventData = createAsyncThunk(
  'ticket/getEventData',
  async (eventId: number) => await fetchEventData(eventId)
);

export const buyPayPal = createAsyncThunk(
  'ticket/buyPayPalTicket',
  async (args: {
    price: number;
    eventId: number;
    userId: number;
    countTickets: number;
  }) =>
    await buyPayPalTicket(
      args.price,
      args.eventId,
      args.userId,
      args.countTickets
    )
);

export const buyStripe = createAsyncThunk(
  'ticket/buyStripeTicket',
  async (args: {
    stripeKey: string;
    price: number;
    eventId: number;
    userId: number;
    countTickets: number;
  }) => await buyStripeTicket(args)
);

const initialState: BuyTicketState = {
  eventId: 0,
  count: 1,
  userName: '',
  userEmail: '',
  paymentMethod: 'Stripe',
  paymentUrl: '',
  price: 0,
  finalPrice: 0,
  availableCount: 0,
  isLoading: 'idle',
  commission: 0,
};

const ticketBuySlice = createSlice({
  name: 'ticketBuy',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
      const amount = action.payload * state.count;

      state.commission = getPaymentCommission(amount, state.paymentMethod);
      state.finalPrice =
        amount + getPaymentCommission(amount, state.paymentMethod);
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
      const amount = state.price * state.count;

      state.commission = getPaymentCommission(amount, state.paymentMethod);
      state.finalPrice =
        amount + getPaymentCommission(amount, state.paymentMethod);
    },
    changeBuyTicketCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
      const amount = action.payload * state.price;

      state.commission = getPaymentCommission(amount, state.paymentMethod);
      state.finalPrice =
        amount + getPaymentCommission(amount, state.paymentMethod);
    },
    changeBuyTicketEventId: (state, action: PayloadAction<number>) => {
      state.eventId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buyPayPal.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(buyPayPal.fulfilled, (state, action) => {
      state.isLoading = 'success';
      if (action.payload?.status == 200) {
        state.paymentUrl = action.payload.url;
      }
    });
    builder.addCase(buyPayPal.rejected, (state) => {
      state.isLoading = 'error';
    });

    builder.addCase(getEventData.fulfilled, (state, action) => {
      if (action.payload) {
        state.price = action.payload.ticket_price;
        state.availableCount = action.payload.available_tickets;

        const amount = action.payload.ticket_price * state.count;

        state.commission = getPaymentCommission(amount, state.paymentMethod);
        state.finalPrice =
          amount + getPaymentCommission(amount, state.paymentMethod);
      }
    });

    builder.addCase(buyStripe.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(buyStripe.fulfilled, (state) => {
      state.isLoading = 'success';
    });
    builder.addCase(buyStripe.rejected, (state) => {
      state.isLoading = 'error';
    });
  },
});

export const buyInfo = (state: RootState) => state.ticketBuy;

export const {
  changeBuyTicketCount,
  changeBuyTicketEventId,
  setUserName,
  setUserEmail,
  setPaymentMethod,
} = ticketBuySlice.actions;

export default ticketBuySlice.reducer;
