import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employeeSlice';
import departmentReducer from './features/departmentSlice';

const store = configureStore({
    reducer: {
        employee : employeeReducer,
        department : departmentReducer
    },
});

export default store;