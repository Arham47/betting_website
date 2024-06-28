import UserApi from '@api/user/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userApi = new UserApi();

export const fetchUserForDealerWithDepositedCash = createAsyncThunk(
  'dashboard/fetchUserWithDepositedCash',
  async (data: {  startDate: string, endDate: string, numRecords: string, page: number, searchValue: string }) => {
    const response = await userApi.getDealerDepositedCash(data);
    return response.results;
  },
)

export const fetchUserForDealerWithDepositedCredit = createAsyncThunk(
  'dashboard/fetchUserForDealerWithDepositedCredit',
  async (data: {  startDate: string, endDate: string, numRecords: string, page: number, searchValue: string }, { rejectWithValue }) => {
    try {
      const response = await userApi.getDealerDepositedCredit(data);
      if (response.message === 'Deposit Records') {
        return response.results;
      } else {
        return rejectWithValue('No data found');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);


export interface AdminState {
  depositedCredit: any;
  depositedCash: any;
}

const initialState: AdminState = {
  depositedCredit: { docs: [], error: [] },
  depositedCash: { docs: [], error: [] },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setDepositedCreditToInital: (state) => {
      // Reset depositedCredit state to initial
      state.depositedCredit = { docs: [], error: [] };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserForDealerWithDepositedCash.fulfilled, (state, action) => {
      if (action?.payload?.docs?.length > 0) {
        state.depositedCash = action.payload;
      } else {
        state.depositedCash =[]
        // state.depositedCash.error[0] = { error: "No cash deposited to users" };
      }
    });
    builder.addCase(fetchUserForDealerWithDepositedCredit.fulfilled, (state, action) => {
      if (action.payload?.docs.length > 0) {
        state.depositedCredit = action.payload;
      } else {
        state.depositedCredit =[]
        state.depositedCredit.error[0] = { error: "No credit deposited to users" };
      }
    });
  }
});

export const { setDepositedCreditToInital } = adminSlice.actions;

export default adminSlice.reducer;
