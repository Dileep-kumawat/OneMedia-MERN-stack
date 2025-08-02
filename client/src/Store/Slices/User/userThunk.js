import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginUserThunk = createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
        console.log("hello")
    },
)