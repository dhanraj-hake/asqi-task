import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const createDepartment = createAsyncThunk(
    "department/createDepartment",
    async (data) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"/api/department", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result= await response.json();
                toast(`${result.name} Department created`)
                return result;
            }
            else {
                toast.error("Error Creating Department")
                throw new Error("Error")
            }
        }
        catch (err) {
            toast.error("Error Creating Department")
            throw new Error("Error")
        }
    }
)

export const getDepartment = createAsyncThunk(
    "department/getDepartment",
    async (data) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL+"/api/department");

            if (response.ok) {
                return await response.json();
            }
            else {
                toast.error("Error")
                throw new Error("Error")
            }
        }
        catch (err) {
            toast.error("Error")
            throw new Error("Error")
        }
    }
)


const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        loading: false,
        error: false,
        data: null,
        errorMessage: "",

        deptLoading: false,
        deptError: false,
        deptErrorMessage: "",
        depts: []
    },
    extraReducers: (builder) => {
        builder.addCase(createDepartment.pending, (state, action) => {
            state.loading = true;
            state.error = false;
            state.errorMessage = "";
        })
        builder.addCase(createDepartment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload
            state.depts.unshift(action.payload)
        })
        builder.addCase(createDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = "Error"
        })

        builder.addCase(getDepartment.pending, (state, action) => {
            state.deptLoading = true;
            state.deptError = false;
            state.deptErrorMessage = "";
        })
        builder.addCase(getDepartment.fulfilled, (state, action) => {
            state.deptLoading = false;
            state.deptError = false;
            state.depts = action.payload
        })
        builder.addCase(getDepartment.rejected, (state, action) => {
            state.deptLoading = false;
            state.deptError = true;
            state.deptErrorMessage = "Error"
        })
    }
})

export default departmentSlice.reducer;