// requests/blogs.ts

import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest, ApiResponse } from "../api"; // Import your standardized request interface
import { Service } from "@/interfaces/dashboardInterface";
// Assuming ApiResponse is exported from api.ts

// Define the expected structure of the blog data (optional, depending on your API response)

// Function to get blogs from the API
export const getServices = async (): Promise<ApiResponse<Service[]>> => {
  const url = `${clientBaseServerUrl}${serverUrls.services}`;
  console.log(url); // Your blog creation API endpoint
  const method = "GET";
  try {
    const response = await apiRequest<Service[]>(
      url, // The API endpoint to get blogs
      method // HTTP method
    );

    return response; // Return the API response
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
