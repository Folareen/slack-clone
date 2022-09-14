import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: null,
};

const workspaceId = createSlice({
  name: "workspaceId",
  initialState,
  reducers: {
    enterWorkspace: (state, action) => {
      state.workspaceId = action.payload;
    },
    leaveWorkspace: (state) => {
      state.workspaceId = null;
    },
  },
});

export const { enterWorkspace, leaveWorkspace } = workspaceId.actions;

export default workspaceId.reducer;
