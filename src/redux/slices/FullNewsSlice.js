import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  news: {},
  newsStatus: "", // "success" | "loading" | "failed"
  comments: [],
  commentsStatus: "", // "success" | "loading" | "failed"
  nestedStatus: "", // "success" | "loading" | "failed"
};
export const fetchFullNews = createAsyncThunk(
  "fullNews/fetchFullNews",
  async (id, thunkAPI) => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    return data;
  }
);
export const fetchComments = createAsyncThunk(
  "fullNews/fetchComments",
  async (id, thunkAPI) => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    if (data?.kids) {
      const comments = await Promise.all(
        data.kids.map(async (id) => {
          const news = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          );
          return news.data;
        })
      );
      data["comments"] = comments;
    }
    return data;
  }
);
export const getExpandComment = createAsyncThunk(
  "fullNews/getExpandComment",
  async (id, thunkAPI) => {
    async function expandComment(id) {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );
      if (data?.kids) {
        data.comments = await Promise.all(
          data.kids.map(async (id) => {
            return await expandComment(id);
          })
        );
      }
      return data;
    }
    return expandComment(id);
  }
);
const fullNews = createSlice({
  name: "fullNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFullNews.pending, (state) => {
      state.newsStatus = "loading";
    });
    builder.addCase(fetchFullNews.fulfilled, (state, action) => {
      state.newsStatus = "success";
      state.news = action.payload;
      state.comments = action.payload.comments;
    });
    builder.addCase(fetchFullNews.rejected, (state) => {
      state.newsStatus = "failed";
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsStatus = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.commentsStatus = "success";
      state.comments = action.payload.comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.commentsStatus = "failed";
    });
    builder.addCase(getExpandComment.pending, (state) => {
      state.nestedStatus = "loading";
    });
    builder.addCase(getExpandComment.fulfilled, (state, action) => {
      state.nestedStatus = "success";
      state.comments.find(
        (comment) => comment.id === action.payload.id
      ).comments = action.payload.comments || [];
    });
    builder.addCase(getExpandComment.rejected, (state) => {
      state.nestedStatus = "failed";
    });
  },
});
export const selectFullNews = (state) => state.fullNews;
export default fullNews.reducer;
