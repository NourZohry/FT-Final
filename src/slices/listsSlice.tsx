import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface List {
  id: string;
  name: string;
}

interface ListsState {
  contents: List[];
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchLists = createAsyncThunk("lists/fetchLists", async (boardId: string) => {
  const response = await fetch("https://api.trello.com/1/boards/" + boardId + "/lists?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN);
  const data = await response.json();
  return data;
});

export const deleteList = createAsyncThunk("lists/deleteList", async (listId: string) => {

  const jsondata = JSON.stringify({ closed:true});
  const response = await fetch("https://api.trello.com/1/lists/" +listId+ "?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN,     {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: jsondata,
}
);
  const data = await response.json();
  return data;
});

// export const archiveList = createAsyncThunk("lists/archiveList", async (listId) => {
//   const response = await fetch("https://api.trello.com/1/lists/"+listId+"/closed?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN);
//   const data = await response.json();
//   return data;
// });

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.error.message;
    });
  },
});

export const getLists = (state: ListsState) => state.contents;

export default listsSlice.reducer;
