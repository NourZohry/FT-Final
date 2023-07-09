import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Board {
  id: string;
  name: string;
}

interface BoardsState {
  contents: Board[];
  isLoading: boolean;
  error: string | null;
  selectedBoard: Board | null;
}



const initialState = {
  contents: [],
  isLoading: false,
  error: null,
  selectedBoard: null
};

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => { 
  console.log(process.env);
  const response = await fetch("https://api.trello.com/1/members/me/boards?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN);
  const data = await response.json();
  return data;
});

export const addNewBoard = createAsyncThunk("boards/addNewBoard", async (boardName: string) => {
  const response = await fetch("https://api.trello.com/1/boards/?name=" + boardName + "&defaultLists=false&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
    method: "POST",
  });
  const data = await response.json();
  return data;
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", async (boardId: string) => {
  const response = await fetch("https://api.trello.com/1/boards/" + boardId + "?key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
});

export const editBoard = createAsyncThunk("boards/editBoard", async (dataObj: [string, string]) => {

  const response = await fetch("https://api.trello.com/1/boards/" + dataObj[0] + "?name=" + dataObj[1] + "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
    method: "PUT",
  });
  const data = await response.json();
  return data;
});

export const addListToBoard = createAsyncThunk("boards/addListToBoard", async (dataObj: [string, string]) => {
  const response = await fetch("https://api.trello.com/1/boards/" + dataObj[0] + "/lists?name=" + dataObj[1] + "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
    method: "POST",
  });
  const data = await response.json();
  return data;
});

// export const changeBoardColumns = createAsyncThunk("boards/changeBoardColumns", async (dataObj) => {
//   const response = await fetch("https://api.trello.com/1/boards/" + dataObj[0] + "?name=" + dataObj[1] + "&key=" + process.env.REACT_APP_API_KEY + "&token=" + process.env.REACT_APP_TOKEN, {
//     method: "PUT",
//   });
//   const data = await response.json();
//   return data;
// });


export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.error.message;
    });
  },
});

export const getBoards = (state: {contents: BoardsState}) => state.contents;
export const {setSelectedBoard} = boardsSlice.actions;


export default boardsSlice.reducer;
