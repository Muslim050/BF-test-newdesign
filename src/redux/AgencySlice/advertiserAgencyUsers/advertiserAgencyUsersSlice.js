import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

import backendURL from 'src/utils/url'

const initialState = {
  advertiserAgencyUsers: [],
  status: 'idle',
  error: null,
}

export const fetchAdvertiserAgencyUsers = createAsyncThunk(
  'advertiserAgencyUsers/fetchAdvertiserAgencyUsers',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/advertiser/ad-agency-user/`,

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

export const addAdvertiserAgencyUsers = createAsyncThunk(
  'advertiserAgencyUsers/addAdvertiserAgency',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/advertiser/ad-agency-user/`,
        {
          advertising_agency: data.advertiserA,
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

const advertiserAgencyUsersSlice = createSlice({
  name: 'advertiserAgencyUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserAgencyUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserAgencyUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserAgencyUsers = action.payload
      })
      .addCase(fetchAdvertiserAgencyUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserAgencyUsers.fulfilled, (state, action) => {
        state.advertiserAgencyUsers.push(action.payload.data)
        state.status = 'succeeded'
      })
  },
})
// export const selectUsers = (state) => state.users.users;

export default advertiserAgencyUsersSlice.reducer
