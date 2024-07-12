import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoState {
  selectedCrypto: string;
  prices: Array<{ crypto: string; price: number; timestamp: string }>;
}

const initialState: CryptoState = {
  selectedCrypto: 'bitcoin',
  prices: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload;
      localStorage.setItem('selectedCrypto', action.payload);
    },
    setPrices: (state, action: PayloadAction<Array<{ crypto: string; price: number; timestamp: string }>>) => {
      state.prices = action.payload;
      localStorage.setItem('prices', JSON.stringify(action.payload));
    },
  },
});

export const { setSelectedCrypto, setPrices } = cryptoSlice.actions;

export const store = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;