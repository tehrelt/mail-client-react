import {createSlice} from "@reduxjs/toolkit";

interface appState {
    email: string | null | undefined
}

const initialState: appState = {
    email: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: appState, action) {
            state.email = action.payload.email
        },
        removeUser(state) {
            state.email = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer