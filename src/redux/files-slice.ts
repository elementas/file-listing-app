import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import File from '../interfaces/file';
import State from '../interfaces/state';

const initialState: State = [];

export default createSlice({
    name: 'files',
    initialState,
    reducers: {
        update: (state: State, action: PayloadAction<File[]>) => {
            return [...action.payload];
        }
    }
});
