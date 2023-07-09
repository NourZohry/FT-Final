import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../slices/themeSlice";
import listsSlice from '../slices/listsSlice';
import cardsSlice from '../slices/cardsSlice';
import customModalSlice from "../slices/customModalSlice";
import boardsSlice from '../slices/boardsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    lists: listsSlice,
    cards: cardsSlice,
    custommodal: customModalSlice,
    boards: boardsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
