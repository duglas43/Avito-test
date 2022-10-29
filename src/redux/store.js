import { configureStore } from "@reduxjs/toolkit";
import newsList from "./slices/newsListSlice";
import fullNews from "./slices/FullNewsSlice";
const store = configureStore({
  reducer: {
    newsList,
    fullNews,
  },
});
export default store;
