import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  advertisers: [],
  status: 'idle',
  error: null,
}

export const fetchAdvertiser = createAsyncThunk(
  'advertiser/fetchAdvertiser',
  async ({ id } = {}, { rejectWithValue }) => {
    // Указываем, что параметр может быть не предоставлен
    const token = Cookies.get('token')
    try {
      const url = id
        ? `${backendURL}/advertiser/?channel_id=${id}`
        : `${backendURL}/advertiser/`
      const response = await axios.get(url, {
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

export const addAdvertiser = createAsyncThunk(
  'advertiser/addAdvertiser',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/advertiser/`,
        {
          advertising_agency: data.agency,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          cpm_preroll: data.cpm_preroll,
          cpm_preroll_uz: data.cpm_preroll_uz,
          cpm_tv_preroll: data.cpm_tv_preroll,
          cpm_tv_preroll_uz: data.cpm_tv_preroll_uz,
          cpm_top_preroll: data.cpm_top_preroll,
          cpm_top_preroll_uz: data.cpm_top_preroll_uz,
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

export const removeAdvertiser = createAsyncThunk(
  'advertiser/removeAdvertiser',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.delete(
        `${backendURL}/advertiser/${data.id}`,

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

export const editAdvertiser = createAsyncThunk(
  'advertiser/editAdvertiser',
  async ({ id, data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.patch(
        `${backendURL}/advertiser/${id}/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          cpm_preroll: data.cpm_preroll,
          cpm_preroll_uz: data.cpm_preroll_uz,
          cpm_top_preroll: data.cpm_top_preroll,
          cpm_top_preroll_uz: data.cpm_top_preroll_uz,
          cpm_tv_preroll: data.cpm_tv_preroll,
          cpm_tv_preroll_uz: data.cpm_tv_preroll_uz,
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

const advertiserSlice = createSlice({
  name: 'advertiser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertisers = action.payload
      })
      .addCase(fetchAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiser.fulfilled, (state, action) => {
        state.advertisers.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(removeAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(removeAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(editAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default advertiserSlice.reducer
