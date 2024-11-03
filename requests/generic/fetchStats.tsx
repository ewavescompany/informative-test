import { apiRequest } from "@/requests/api"; // Ensure correct path to apiRequest
import { clientBaseServerUrl, serverUrls } from "@/constants/urls"; // Ensure correct URLs

// Function to fetch stats
async function fetchStats() {
  const url = `${clientBaseServerUrl}${serverUrls.stats}`; // Adjust based on your endpoint for stats
  const method = "GET"; // Assuming it's a GET request

  try {
    // Use apiRequest to make the API call
    const response = await apiRequest(url, method);
    return response?.data?.data[0]; // Return the stats data
  } catch (error) {
    // Handle any errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch stats");
  }
}

export default fetchStats;
