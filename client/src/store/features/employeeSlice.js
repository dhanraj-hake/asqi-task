import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const createEmployee = createAsyncThunk(
    "employee/createEmployee",
    async (data, { thunkApi }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"/api/employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result =  await response.json();
                toast(`${result.name} Employee created`)
                return result;
            }
            else {
                // toast.error("Error Creating Employee")
                throw new Error("Error")
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Error Creating Employee")
            throw new Error("Error")
        }
    },
)

export const getEmployees = createAsyncThunk(
    "employee/getEmployees",
    async (data) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"/api/employee");

            if (response.ok) {
                return await response.json();
            }
            else {
                toast.error("Error Creating Employee")
                throw new Error("Error")
            }
        }
        catch (err) {
            toast.error("Error Creating Employee")
            throw new Error("Error")
        }
    }
)

export const searchEmployees = createAsyncThunk(
    "employee/searchEmployees",
    async (q) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search?q=${q}`);

            if (response.ok) {
                return await response.json();
            }
            else {
                toast.error("Error Creating Employee")
                throw new Error("Error")
            }
        }
        catch (err) {
            toast.error("Error Creating Employee")
            throw new Error("Error")
        }
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        loading: false,
        error: false,
        data: null,
        errorMessage: "",

        empsLoading: false,
        empsError: false,
        emsEerrorMessage: "",
        emps: [],
    },
    extraReducers: (builder) => {
        builder.addCase(createEmployee.pending, (state, action) => {
            state.loading = true;
            state.error = false;
            state.errorMessage = "";
        })
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
            state.emps.unshift(action.payload)
        })
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = "Error";
        })

        builder.addCase(getEmployees.pending, (state, action) => {
            state.empsLoading = true;
            state.empsError = false;
            state.emsEerrorMessage = "";
        })
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.empsLoading = false;
            state.empsError = false;
            state.emps = action.payload
        })
        builder.addCase(getEmployees.rejected, (state, action) => {
            state.empsLoading = false;
            state.empsError = true;
            state.emsEerrorMessage = "Error";
        })


        builder.addCase(searchEmployees.pending, (state, action) => {
            state.empsLoading = true;
            state.empsError = false;
            state.emsEerrorMessage = "";
        })
        builder.addCase(searchEmployees.fulfilled, (state, action) => {
            state.empsLoading = false;
            state.empsError = false;
            state.emps = action.payload
        })
        builder.addCase(searchEmployees.rejected, (state, action) => {
            state.empsLoading = false;
            state.empsError = true;
            state.emsEerrorMessage = "Error";
        })
    }
})

export default employeeSlice.reducer;