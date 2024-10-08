import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

import backendURL from '@/utils/url'

const initialState = {
  advertiserAgency: [],
  status: 'idle',
  error: null,
}

export const fetchAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/fetchAdvertiserAgency',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/advertiser/advertising-agency/`,
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
export const addAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/addAdvertiserAgency',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/advertiser/advertising-agency/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          commission_rate: data.commission_rate,
        },
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

export const editAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/editAdvertiserAgency',
  async ({ id, data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.patch(
        `${backendURL}/advertiser/advertising-agency/${id}/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          commission_rate: data.commission_rate,
        },
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
const advertiserAgencySlice = createSlice({
  name: 'advertiserAgency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserAgency.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserAgency = action.payload
      })
      .addCase(fetchAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserAgency.fulfilled, (state, action) => {
        state.advertiserAgency.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editAdvertiserAgency.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default advertiserAgencySlice.reducer
