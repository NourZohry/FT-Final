import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Card {
  id: string;
  name: string;
  desc: string;
}

interface CardsState {
  contents: Record<string, Card[]>;
  selected: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  contents: {},
  selected: null,
  isLoading: false,
  error: null,
};

export const fetchCards = createAsyncThunk("cards/fetchCards", async (listId: string) => {
  const response = await fetch("https://api.trello.com/1/lists/" + listId + "/cards?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN);
  const data = await response.json();
  return [data, listId];
});

interface AddCardPayload {
  status: string;
  name: string;
  desc: string;
}

export const addCard = createAsyncThunk("cards/addCard", async (dataObj: AddCardPayload) => {
  const response = await fetch(
    "https://api.trello.com/1/cards?" +
      new URLSearchParams({
        idList: dataObj.status,
        name: dataObj.name,
        desc: dataObj.desc,
      }) +
      "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
});

interface UpdateCardPayload {
  cardId: string;
  status: string;
  name: string;
  desc: string;
}

export const updateCard = createAsyncThunk("cards/updateCard", async (dataObj: UpdateCardPayload) => {
  const response = await fetch(
    "https://api.trello.com/1/cards/" +
      dataObj.cardId +
      "?" +
      new URLSearchParams({
        idList: dataObj.status,
        name: dataObj.name,
        desc: dataObj.desc,
      }) +
      "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN,
    {
      method: "PUT",
    }
  );
  const data = await response.json();
  return data;
});


export const editCardList = createAsyncThunk("cards/editCardList", async (dataObj: [string, string]) => {
  let cardId = dataObj[0];
  let listId = dataObj[1];
  const response = await fetch("https://api.trello.com/1/cards/" + cardId + "?idList=" + listId + "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
    method: "PUT",
  });
  const data = await response.json();
  return data;
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (cardId: string) => {
  const response = await fetch("https://api.trello.com/1/cards/" + cardId + "?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
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
    builder.addCase(fetchCards.fulfilled, (state: any, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.contents[action.payload[1]] = action.payload[0];
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.error.message;
    });
  },
});

export const { setSelected } = cardsSlice.actions;
export const getSelected = (state: CardsState) => state.selected;
export const getCards = (state: CardsState) => state.contents;

export default cardsSlice.reducer;
