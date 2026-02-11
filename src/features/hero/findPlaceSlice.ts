import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tab {
  id: number;
  name: string;
  icon: string;
}

export interface FindPlaceState {
  tabs: Tab[];
  currentTab: string;
}

const initialState: FindPlaceState = {
  tabs: [
    { id: 1, name: "Khách sạn", icon: "icon-bed" },
    { id: 2, name: "Tours", icon: "icon-destination" },
  ] as Tab[],
  currentTab: "Khách sạn",
};

export const findPlaceSlice = createSlice({
  name: "find-place",
  initialState,
  reducers: {
    addCurrentTab: (state, { payload }: PayloadAction<string>) => {
      state.currentTab = payload;
    },
  },
});

export const { addCurrentTab } = findPlaceSlice.actions;
export default findPlaceSlice.reducer;
