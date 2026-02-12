import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BlogFilter } from "@/types";

export interface BlogsState {
  filter: BlogFilter;
}

const initialState: BlogsState = {
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
  reducers: {
    setFilter: (state, { payload }: PayloadAction<BlogFilter>) => {
      state.filter = payload;
    },
  },
});

export const { setFilter } = blogsSlice.actions;

export default blogsSlice.reducer;
