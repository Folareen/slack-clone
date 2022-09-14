import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: localStorage.getItem("workspaceId") || null,
};

const workspaceId = createSlice({
  name: "workspaceId",
  initialState,
  reducers: {
    enterWorkspace: (state, action) => {
      state.workspaceId = action.payload;
      localStorage.setItem("workspaceId", action.payload);
    },
    leaveWorkspace: (state) => {
      state.workspaceId = null;
      localStorage.removeItem("workspaceId");
    },
  },
});

export const { enterWorkspace, leaveWorkspace } = workspaceId.actions;

export default workspaceId.reducer;
