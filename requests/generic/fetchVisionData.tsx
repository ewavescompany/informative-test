import { apiRequest } from "@/requests/api"; // Import the apiRequest function
import { clientBaseServerUrl, serverUrls } from "@/constants/urls"; // Adjust URLs

// Function to fetch the vision data
export const fetchVisionData = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.vission}`; // URL to fetch vision data (adjust `serverUrls.vision` as necessary)
  const method = "GET"; // Assuming it’s a GET request

  try {
    // Use apiRequest to make the API call
    const response = await apiRequest(url, method);
    return response?.data; // Return the vision data
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch vision data");
  }
};
