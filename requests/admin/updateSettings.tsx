import { apiRequest } from "@/requests/api"; // Ensure correct path to apiRequest
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Ensure correct URLs

// Function to update settings
export async function updateSettings(data: FormData, token: string) {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editSettings}`; // Adjust based on your update endpoint
  const method = "POST"; // Assuming it's a POST request for updating stats

  try {
    // Use apiRequest to make the API call
    const response = await apiRequest(url, method, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Since we are sending files
        Authorization: `Bearer ${token}`, // Include token in the request header for authentication
      },
    });
    return response?.data; // Return the response data
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update stats");
  }
}
