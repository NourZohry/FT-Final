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

export const addCard = createAsyncThunk("cards/addCard", async (dataObj) => {
  const response = await fetch(
    "https://api.trello.com/1/cards?" +
      new URLSearchParams({
        idList: dataObj.status,
        name: dataObj.name,
        desc: dataObj.desc,
      }) +
      "&key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6",
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
});

export const updateCard = createAsyncThunk("cards/updateCard", async (dataObj) => {
  const response = await fetch(
    "https://api.trello.com/1/cards/" +
      dataObj.cardId +
      "?" +
      new URLSearchParams({
        idList: dataObj.status,
        name: dataObj.name,
        desc: dataObj.desc,
      }) +
      "&key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6",
    {
      method: "PUT",
    }
  );
  const data = await response.json();
  return data;
});

export const editCardList = createAsyncThunk("cards/editCardList", async (dataObj) => {
  let cardId = dataObj[0];
  let listId = dataObj[1];
  const response = await fetch("https://api.trello.com/1/cards/" + cardId + "?idList=" + listId + "&key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6", {
    method: "PUT",
  });
  const data = await response.json();
  return data;
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (cardId) => {
  const response = await fetch("https://api.trello.com/1/cards/" + cardId + "?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6", {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
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
