import { apiRequest } from "@/requests/api"; // Assuming this is the correct import path
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Import necessary constants for the base server URL and endpoints
interface ApiResponse<T> {
  data: T;
}

export const updateAbout = async (
  formData: FormData,
  token: string
): Promise<ApiResponse<any>> => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editAboutus}`;
  const method = "POST";

  try {
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update vision data");
  }
};
