import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from 'src/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  advertiserUsers: [],
  status: 'idle',
  error: null,
}
export const fetchAdvertiserUsers = createAsyncThunk(
  'advertiserusers/fetchAdvertiserUsers',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/advertiser/user/`,

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

export const addAdvertiserUsers = createAsyncThunk(
  'advertiserusers/addAdvertiserUsers',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/advertiser/user/`,
        {
          advertiser: data.advertiser,
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          username: data.username,
          phone_number: data.phone,
          password: data.password,
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

const advertiserUsersSlice = createSlice({
  name: 'advertiser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserUsers = action.payload
      })
      .addCase(fetchAdvertiserUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserUsers.fulfilled, (state, action) => {
        state.advertiserUsers.push(action.payload.data)
        state.status = 'succeeded'
      })
  },
})
// export const selectUsers = (state) => state.users.users;

export default advertiserUsersSlice.reducer
