import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add testimonial thunk
export const addTestimonals = createAsyncThunk(
  "testimonial/add",
  async (testiData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/testimonals/add",
        testiData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Adding testimonial failed"
      );
    }
  }
);

// Fetch testimonials for a service
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetch",
  async (serviceId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/testimonals/${serviceId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching testimonials failed"
      );
    }
  }
);

// edit testimonial thunk
export const editTestimonals = createAsyncThunk(
  "testimonial/edit",
  async ({ rating, comment, id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/testimonals/edit/${id}`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Adding testimonial failed"
      );
    }
  }
);

// delete testimonial thunk
export const deleteTestimonals = createAsyncThunk(
  "testimonial/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `http://localhost:5000/api/testimonals/delete/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Adding testimonial failed"
      );
    }
  }
);

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
  message: null
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add testimonial
    builder
      .addCase(addTestimonals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTestimonals.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // state.testimonials = action.payload.testimonial;
      })
      .addCase(addTestimonals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch testimonials
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.testimonial;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // edit testimonials
    builder
      .addCase(editTestimonals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTestimonals.fulfilled, (state, action) => {
        state.loading = false;
        // পুরনো testimonial list-এ update করো
        const updated = action.payload.testimonial;
        state.testimonials = state.testimonials.map((t) =>
          t._id === updated._id ? updated : t
        );
      })

      .addCase(editTestimonals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // delete testimonials
    builder
      .addCase(deleteTestimonals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonals.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.id; // backend থেকে deleted testimonial ID পাঠাও
        state.testimonials = state.testimonials.filter((t) => t._id !== deletedId);
        state.message = action.payload.message;
      })

      .addCase(deleteTestimonals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;
