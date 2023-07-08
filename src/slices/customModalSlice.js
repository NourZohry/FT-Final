import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "",
  data: [],
};

export const themeSlice = createSlice({
  name: "custommodal",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.isOpen = true;
    },
    setClosed: (state) => {
      state.isOpen = false;
    },
    setModal: (state, action) => {
      state.content = action.payload;
      state.isOpen = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setOpen, setClosed, setModal, setData } = themeSlice.actions;
export const getIsOpen = (state) => state.boardmodal.isOpen;

export default themeSlice.reducer;
