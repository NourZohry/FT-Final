import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../slices/themeSlice";
import listsSlice from '../slices/listsSlice';
import cardsSlice from '../slices/cardsSlice';
import modalSlice from '../slices/modalSlice';
import boardModalSlice from '../slices/boardModalSlice';
import customModalSlice from "../slices/customModalSlice";
import boardsSlice from '../slices/boardsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    lists: listsSlice,
    cards: cardsSlice,
    modal: modalSlice,
    boardmodal: boardModalSlice,
    custommodal: customModalSlice,
    boards: boardsSlice,
  },
});