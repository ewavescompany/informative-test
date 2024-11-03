import { apiRequest } from "@/requests/api"; // Assuming this is the correct import path
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Import necessary constants for the base server URL and endpoints

// Function to update the vision data
export const updateVisionData = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editVission}`; // Update based on your server endpoint
  const method = "POST"; // Assuming the request method is POST

  try {
    // Use apiRequest to send the request
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Since we are sending files
        Authorization: `Bearer ${token}`, // Include token in the request header for authentication
      },
    });

    return response?.data;
  } catch (error) {
    // Handle error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update vision data");
  }
};
