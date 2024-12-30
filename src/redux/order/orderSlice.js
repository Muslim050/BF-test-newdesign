import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
// import axios from "src/utils/axiosInstance.js";
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'
import log from "eslint-plugin-react/lib/util/log.js";

const initialState = {
  order: [],
  status: 'idle',
  error: null,
  statusb: '',
  exportExcelOrder: '',
  confirmedOrders: [],
  exportConfirmed: [],
  shortListData: [],
}

export const fetchOrder = createAsyncThunk('order/fetchOrder', async () => {
  const token = Cookies.get('token')

  try {
    const response = await axios.get(`${backendURL}/order/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.data
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = 'login'
    }
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error
      if (errorMessage.detail) {
        toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
      }
    } else {
      toast.error('Ошибка при загрузке') // Общее сообщение об ошибке, если детали не доступны
    }
    throw error
  }
})

export const fetchConfirmedOrder = createAsyncThunk(
  'order/fetchConfirmedOrder',
  async () => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/order/confirmed-orders/`,
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
      throw new Error('Failed to fetch order')
    }
  },
)

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    console.log (data)
    try {
      const response = await axios.post(
        `${backendURL}/order/`,
        {
          advertiser: data.advertiserID,
          name: data.name,
          format: data.format,
          expected_start_date: data.startdate,
          expected_end_date: data.enddate,
          expected_number_of_views: data.expectedView,
          budget: data.budgett,
          promo_file: data.selectedFile[0],
          notes: data.notes,
          target_country: data.target_country,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

export const confirmPayment = createAsyncThunk(
  'order/confirmPayment',
  async ({ id }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/order/confirm-payment/`,
        {
          order_id: id,
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
      if (error.response && error.response.status === 403) {
        throw new Error('Ошибка 403: Доступ запрещен')
      }
      throw error
    }
  },
)

export const fetchShortList = createAsyncThunk(
  'order/fetchShortList',
  async ({ id }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/order/short-list/?advertiser=${id}`,
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
      if (error.response && error.response.status === 403) {
        throw new Error('Ошибка 403: Доступ запрещен')
      }
      throw error
    }
  },
)

export const fetchEditOrder = createAsyncThunk(
  'order/fetchEditOrder',
  async ({ id, data }) => {
    const token = Cookies.get('token')

    const requestData = {
      expected_number_of_views: data.expectedView,
    }

    // Проверьте, что data.selectedFile не равен null, прежде чем добавить promo_file
    if (data.selectedFile && data.selectedFile[0] !== null) {
      requestData.promo_file = data.selectedFile[0]
    }
    if (data.name && data.name !== null) {
      requestData.name = data.name
    }
    if (data.format && data.format !== null) {
      requestData.format = data.format
    }

    if (data.budgett && data.budgett !== null) {
      requestData.budget = data.budgett
    }
    if (data.startdate && data.startdate !== null) {
      requestData.expected_start_date = data.startdate
    }
    if (data.enddate && data.enddate !== null) {
      requestData.expected_end_date = data.enddate
    }
    if (data.notes && data.notes !== null) {
      requestData.notes = data.notes
    }
    requestData.target_country =
      data.target_country !== undefined ? data.target_country : ''

    try {
      const response = await axios.patch(
        `${backendURL}/order/${id}/`,
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
      throw new Error('Failed to fetch order')
    }
  },
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async ({ id }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.delete(
        `${backendURL}/order/${id}`,

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
      if (error.response && error.response.status === 403) {
        throw new Error('Failed to fetch order')
      }
      throw error
    }
  },
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderStatus: (state, action) => {
      const { orderId, status } = action.payload
      const order = state.order.find((o) => o.id === orderId)
      if (order) {
        order.status = status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.order = action.payload
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchConfirmedOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchConfirmedOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.confirmedOrders = action.payload
      })
      .addCase(fetchConfirmedOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchEditOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEditOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(fetchEditOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchShortList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchShortList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.shortListData = action.payload
      })
      .addCase(fetchShortList.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const { setOrderStatus } = orderSlice.actions

export default orderSlice.reducer
