// requests/services.ts
import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";

// Function to fetch service by ID
export const fetchServiceById = async (id: string) => {
  const url = `${clientBaseServerUrl}${serverUrls.serviceById}/${id}`;

  try {
    const response = await apiRequest(url, "GET");

    return response?.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service");
  }
};
