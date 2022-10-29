import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  newsList: [],
  newsListStatus: "", // "success" | "loading" | "failed"
};
export const fetchNewsList = createAsyncThunk(
  "newsList/fetchNewsList",
  async (params, thunkAPI) => {
    const newsReq = await axios.get(
      `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
    );
    const newsId = newsReq.data.slice(0, 100);
    const newsList = await Promise.all(
      newsId.map(async (id) => {
        const news = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );
        return news.data;
      })
    );
    return newsList;
  }
);
const newsList = createSlice({
  name: "newsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewsList.pending, (state) => {
      state.newsListStatus = "loading";
    });
    builder.addCase(fetchNewsList.fulfilled, (state, action) => {
      state.newsListStatus = "success";
      state.newsList = action.payload;
    });
    builder.addCase(fetchNewsList.rejected, (state) => {
      state.newsListStatus = "failed";
    });
  },
});
export const {} = newsList.actions;
export const selectNewsList = (state) => state.newsList;
export default newsList.reducer;
