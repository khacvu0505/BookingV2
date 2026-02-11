import { createSlice } from "@reduxjs/toolkit";
import { fetchGetSearchBlogs } from "./reducers";
import type { Blog, BlogFilter } from "@/types";

export interface BlogsState {
  loadingBlogs: boolean;
  listBlogs: Blog[];
  totalPages: number;
  totalRecords: number;
  filter: BlogFilter;
}

const initialState: BlogsState = {
  loadingBlogs: false,
  listBlogs: [],
  totalPages: 0,
  totalRecords: 0,
  filter: {
    Page: 1,
    pageSize: 5,
    Entity: {
      RegionFID: "",
      CateID: 0,
      Keyword: "",
      SupplierType: "",
    },
  },
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // search blogs
    builder.addCase(fetchGetSearchBlogs.fulfilled, (state, action) => {
      state.listBlogs = action.payload?.payload?.data || [];
      state.filter = action.payload.filter;
      state.totalPages = action.payload?.payload?.totalPage || 0;
      state.totalRecords = action.payload?.payload?.totalRecords || 0;
      state.loadingBlogs = false;
    });
    builder.addCase(fetchGetSearchBlogs.pending, (state) => {
      state.loadingBlogs = true;
    });
    builder.addCase(fetchGetSearchBlogs.rejected, (state) => {
      state.loadingBlogs = false;
    });
  },
});

export default blogsSlice.reducer;
