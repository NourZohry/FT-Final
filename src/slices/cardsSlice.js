import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: {},
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchCards = createAsyncThunk("cards/fetchCards", async (listId) => {
  const response = await fetch("https://api.trello.com/1/lists/" + listId + "/cards?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6");
  const data = await response.json();
  return [data, listId];
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents[action.payload[1]] = action.payload[0];
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSelected } = cardsSlice.actions;
export const getSelected = (state) => state.selected;
export const getCards = (state) => state.contents;

export default cardsSlice.reducer;
