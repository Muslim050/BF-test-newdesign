import axiosInstance from "@/api/api.js";

export const handleRequest = async (method, url, data = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data.data;
  } catch (error) {
    throw error.response;
  }
};
