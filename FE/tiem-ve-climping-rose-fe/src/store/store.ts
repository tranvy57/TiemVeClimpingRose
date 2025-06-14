import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slice/counter-slice";
import CountReducer from "./slice/counter-slice";

export const store = configureStore({
  reducer: {
    counter: CountReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
