import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
    customerBooking: [],
    providerBookings: [],
    bookings: [],
    bookingInfo: null,
    loading: false,
    error: null,
    message: null
};

// book service 
export const bookService = createAsyncThunk(
    "booking/book",
    async (bookingData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/booking/book",
                bookingData
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// get all bookings 
export const getAllBookings = createAsyncThunk(
    "bookings/all", async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(
                "http://localhost:5000/api/booking/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "fetching bookings data failed"
            );
        }
    }
);

//  update status Thunk
export const updateStatuss = createAsyncThunk(
    "booking/update_status",
    async ({ status, id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(
                `http://localhost:5000/api/booking/status/${id}`, { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update status profile"
            );
        }
    }
);

//  customer booking Thunk
export const customerBooking = createAsyncThunk(
    "booking/fetch_cutomer_bookings",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(
                "http://localhost:5000/api/booking/customer",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetched customer bookings data"
            );
        }
    }
);

// provider booking
export const providerBooking = createAsyncThunk(
    "booking/provider_all",
    async ({ bookingId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `http://localhost:5000/api/booking/provider/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Fetched provider bookings failed"
            );
        }
    }
);



//  booking Slice
const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action) => {
            const data = action.payload;
            const exists = state.bookings.find((b) => b._id === data._id);
            if (!exists) {
                state.bookings.push(data);
            }
            localStorage.setItem('booking', JSON.stringify(data))
        }
    },
    extraReducers: (builder) => {
        // book
        builder
            .addCase(bookService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookService.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.bookingInfo = action.payload.booking;
            })
            .addCase(bookService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateStatuss.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStatuss.fulfilled, (state, action) => {
                const updatedBooking = action.payload.booking;
                state.bookings = state.bookings.map(b =>
                    b._id === updatedBooking._id ? updatedBooking : b
                );
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateStatuss.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

                const { role } = action.meta.arg; // 👈 token থেকে pass করা role
                const bookings = action.payload.bookings;

                if (role === "customer") {
                    state.customerBooking = bookings;
                }
                else if (role === "provider") {
                    state.providerBookings = bookings;
                }
                else {
                    state.bookings = bookings; // admin
                }
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(customerBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(customerBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.customerBooking = action.payload.bookings;
            })
            .addCase(customerBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(providerBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(providerBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.providerBookings = action.payload.booking;
            })
            .addCase(providerBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;