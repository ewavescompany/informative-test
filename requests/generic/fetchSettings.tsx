import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "@/requests/api"; // Adjust the path as needed

export const fetchSettings = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.settings}`; // Adjust the endpoint based on your API
  const method = "GET";

  try {
    const response = await apiRequest(url, method);
    return response?.data; // Return the homepage data
  } catch (error) {
    console.error("Failed to fetch homepage data", error);
    throw error;
  }
};
