import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Adjust the path as needed

// Function to update the service
export const updateService = async (
  formData: FormData,
  token: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editService}`; // Construct URL to update the service
  const method = "POST";

  try {
    // Use the apiRequest to send the FormData to update the service
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Since we are sending files
        Authorization: `Bearer ${token}`, // Include token in the request header for authentication
      },
    });

    return response.data; // Return the response data from the API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update the service"
    );
  }
};
