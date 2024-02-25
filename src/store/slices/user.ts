import {createSlice} from "@reduxjs/toolkit";

interface appState {
    email: string | null | undefined
}

const initialState: appState = {
    email: localStorage.getItem("email"),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: appState, action) {
            localStorage.setItem("email", action.payload.email)
            state.email = action.payload.email
        },
        removeUser(state) {
            localStorage.removeItem("email")
            state.email = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer