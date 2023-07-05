import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../slices/themeSlice";
import listsSlice from '../slices/listsSlice';
import cardsSlice from '../slices/cardsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    lists: listsSlice,
    cards: cardsSlice,
  },
});