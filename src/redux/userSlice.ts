import { createSlice } from "@reduxjs/toolkit";


interface StoreState {
    userId: null | string | number;
}

const initialState: StoreState = {
    userId: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            console.log(action.payload, '/working')
            state.userId = action.payload;
            console.log(state.userId, '/working')
        },
    },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;