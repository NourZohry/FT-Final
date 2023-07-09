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
  const response = await fetch("https://api.trello.com/1/boards/" + boardId + "/lists?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6");
  const data = await response.json();
  return data;
});

export const deleteList = createAsyncThunk("lists/deleteList", async (listId: string) => {

  const jsondata = JSON.stringify({ closed:true});
  const response = await fetch("https://api.trello.com/1/lists/" +listId+ "?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6",     {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: jsondata,
}
);
  const data = await response.json();
  return data;
});

// export const archiveList = createAsyncThunk("lists/archiveList", async (listId) => {
//   const response = await fetch("https://api.trello.com/1/lists/"+listId+"/closed?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6");
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
