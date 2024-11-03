// requests/portfolios.ts

import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "../api";
import { Portfolio } from "@/interfaces/dashboardInterface";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getPortfolios = async (): Promise<ApiResponse<Portfolio[]>> => {
  const url = `${clientBaseServerUrl}${serverUrls.portfolio}`;
  
  try {
    const response = await apiRequest<ApiResponse<Portfolio[]>>(url, "GET");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Failed to fetch portfolios"
    };
  }
};
