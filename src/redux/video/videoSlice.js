import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  videos: [],
  status: 'idle',
  error: null,
}

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/inventory/video/`,

        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addVideos = createAsyncThunk(
  'videos/addVideos',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/video/`,
        {
          channel: data.channelID,
          name: data.namevideo,
          category: data.category,
          publication_time: data.startdate,
          duration: data.timecod,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const fetchEditVideo = createAsyncThunk(
  'video/fetchEditVideo',
  async ({ id, data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    const requestData = { ...data }

    try {
      const response = await axios.patch(
        `${backendURL}/inventory/video/${id}/`,
        requestData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const DeleteVideo = createAsyncThunk(
  'video/DeleteVideo',
  async ({ id }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.delete(
        `${backendURL}/inventory/video/${id}/`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      throw new Error('Failed to fetch order')
    }
  },
)(
  // export const deleteInventory = createAsyncThunk(
  //   "inventory/deleteInventory",
  //   async ({ id }) => {
  //     console.log("data", id);
  //     const token = Cookies.get
  'token',
)

//     try {
//       const response = await axios.delete(
//         `${backendURL}/inventory/${id}`,

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         throw new Error("Failed to fetch order");
//       }
//       throw error;
//     }
//   }
// );

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.videos = action.payload
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addVideos.fulfilled, (state, action) => {
        state.videos.push(action.payload.data)
        state.status = 'succeeded'
      })
      .addCase(fetchEditVideo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEditVideo.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(fetchEditVideo.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})
export const selectUsers = (state) => state.users.users

export default videoSlice.reducer
