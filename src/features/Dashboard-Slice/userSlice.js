import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: sessionStorage.getItem("profilePic") || "/broken-image.jpg",
  username: "User",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
      sessionStorage.setItem("profilePic", action.payload); // Save to localStorage
    },
    resetProfilePic: (state) => {
      state.profilePic = "/broken-image.jpg";
      sessionStorage.removeItem("profilePic"); // Remove from localStorage
    },
  },
});

export const { setProfilePic } = userSlice.actions;
export default userSlice.reducer;
