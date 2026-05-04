import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Api url
const API_URL = "http://localhost:5000/api"


// create conversation
export const createConversation = createAsyncThunk(
    "conversation/create", async ({ customerId, providerId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/conversations/create`, { customerId, providerId })
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// get conversation
export const getConversation = createAsyncThunk(
    "conversation/get", async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/conversations/${userId}`)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// send message
export const sendMessage = createAsyncThunk(
    "messages/send", async (messageData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/messages/send`, messageData)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// send image
export const sendImage = createAsyncThunk(
    "messages/image", async (messageData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/messages/image`, messageData)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// get all messages
export const getAllMessages = createAsyncThunk(
    "messages/all", async (conversationId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/messages/${conversationId}`)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// seen message
export const seenMessage = createAsyncThunk(
    "messages/seen", async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/messages/seen`, data)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)

        }

    }
)

// delete message
export const deleteMessage = createAsyncThunk(
    "messages/delete", async ({ messageId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/messages/${messageId}`)
            return response.data

        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response?.data || error.message)
        }

    }
)



// initialState
const initialState = {
    loading: false,
    error: null,
    success: false,
    messages: [],
    conversations: [],
    onlineUsers: []
}


// chatslice
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // get conversation
            .addCase(getConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.conversations = action.payload.conversations;
                localStorage.setItem("conversations", JSON.stringify(action.payload.conversations))
            })
            .addCase(getConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // send message
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const exist = state.messages.find((msg) => msg._id === action.payload.message._id)
                if (!exist) {
                    state.messages.push(action.payload.message)
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // send message
            .addCase(sendImage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendImage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const exist = state.messages.find((msg) => msg._id === action.payload._id)
                if (!exist) {
                    const newMessage = action.payload.message || action.payload.data;
                }
            })
            .addCase(sendImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // get all messages
            .addCase(getAllMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.messages = action.payload.messages;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // seen message
            .addCase(seenMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(seenMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.messages = state.messages.map((mesg) => mesg._id === action.payload._id ? { ...mesg, seen: true } : mesg)
            })
            .addCase(seenMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })

            // delete message
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.messages = state.messages.filter((message) => message._id !== action.payload._id)
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.success = false
            })
    }
})


export default chatSlice.reducer;