import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from 'src/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  channel: [],
  channelID: [],
  status: 'idle',
  error: null,
}

export const fetchChannel = createAsyncThunk(
  'channel/fetchChannel',
  async (id, { rejectWithValue }) => {
    const token = Cookies.get('token')
    let url = new URL(`${backendURL}/publisher/channel/`)
    const params = new URLSearchParams()
    if (id) {
      params.append('publisher_id', id)
    }
    url.search = params.toString()

    try {
      const response = await axios.get(url.href, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addChannel = createAsyncThunk(
  'channel/addChannel',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/publisher/channel/`,
        {
          publisher: data.publisher,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          channel_id: data.channelId,
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

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.channel = action.payload
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channel.push(action.payload.data)
      })

    // .addCase(updateUser.fulfilled, (state, action) => {
    //   const { id, firstName, lastName, email } = action.payload;
    //   const user = state.users.find((user) => user.id === id);
    //   if (user) {
    //     user.firstName = firstName;
    //     user.lastName = lastName;
    //     user.email = email;
    //   }
    //   state.userToEdit = null;
    // })
  },
})

export default channelSlice.reducer
