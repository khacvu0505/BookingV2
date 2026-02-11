import { getSearchBlogs } from "@/api/blogs.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BlogFilter } from "@/types";

interface FetchGetSearchBlogsResult {
  payload: {
    data: any[];
    totalPage: number;
    totalRecords: number;
  };
  filter: BlogFilter;
}

export const fetchGetSearchBlogs = createAsyncThunk<FetchGetSearchBlogsResult, BlogFilter>(
  "blogs/fetchGetSearchBlogs",
  async (data) => {
    const response = await getSearchBlogs(data as any);
    return { payload: response as any, filter: data };
  }
);
