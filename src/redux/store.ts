import { configureStore } from '@reduxjs/toolkit';
import filesSlice from './files-slice';

export default configureStore({
    reducer: filesSlice.reducer
});
