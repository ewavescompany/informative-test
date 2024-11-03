/* eslint-disable @typescript-eslint/no-explicit-any */
// requests/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define a type for the response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: any;
  error?: string;
}

// Function to make API requests
export async function apiRequest<T>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data,
      ...config,
    });

    // If the request was successful, return success with data
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    // If there's an error, return success as false and provide an error message
    return {
      success: false,
      error: error?.response?.data?.message || error.message,
    };
  }
}
