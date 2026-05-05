import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  services: [],
  providerServics: [],
  singleService: null,
  populerServices: [],
  message: null,
  loading: false,
  error: null
}

//  Thunks 

// Add Service
export const addService = createAsyncThunk(
  "service/add",
  async (serviceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/services/add",
        serviceData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add service failed");
    }
  }
);

// Fetch All Services
export const fetchAllService = createAsyncThunk(
  "service/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/services/services");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch all services failed");
    }
  }
);

// Fetch All Services
export const fetchProviderAllService = createAsyncThunk(
  "service/fetchProviderAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get("http://localhost:5000/api/services/provider",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch all services failed");
    }
  }
);

// Fetch Single Service
export const fetchSingleService = createAsyncThunk(
  "service/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/services/service/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch single service failed");
    }
  }
);

// Edit Service
export const editService = createAsyncThunk(
  "service/edit",
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/services/services/${id}`,
        serviceData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Edit service failed");
    }
  }
);

// Delete Service
export const deleteService = createAsyncThunk(
  "service/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `http://localhost:5000/api/services/delete-service/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete service failed");
    }
  }
);


// Fetch Popular Services
export const populerService = createAsyncThunk(
  "service/popular",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/services/popular-services");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch popular services failed");
    }
  }
);

//  Slice 

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // add service for provider
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload.service);
        state.message = action.payload.message;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch all services
      .addCase(fetchAllService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.service;
        state.message = action.payload.message;
      })
      .addCase(fetchAllService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch all provider services
      .addCase(fetchProviderAllService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderAllService.fulfilled, (state, action) => {
        state.loading = false;
        state.providerServics = action.payload.service;
        state.message = action.payload.message;
      })
      .addCase(fetchProviderAllService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch single service
      .addCase(fetchSingleService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.loading = false;
        state.singleService = action.payload.service;
        state.message = action.payload.message;
      })
      .addCase(fetchSingleService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // edit service
      .addCase(editService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(s => s._id === action.payload.service._id);
        if (index !== -1) state.services[index] = action.payload.service;
        state.message = action.payload.message;
      })
      .addCase(editService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(s => s._id !== action.meta.arg);
        state.message = action.payload.message;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // populer services
      .addCase(populerService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(populerService.fulfilled, (state, action) => {
        state.loading = false;
        state.populerServices = action.payload.service;
        state.message = action.payload.message;
      })
      .addCase(populerService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const { clearMessage } = serviceSlice.actions;
export default serviceSlice.reducer;
