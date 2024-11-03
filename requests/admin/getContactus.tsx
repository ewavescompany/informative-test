// requests/blogs.ts

import {
  clientBaseServerUrl,
  dashboardBaseServerUrl,
  serverUrls,
} from "@/constants/urls";
import { apiRequest } from "../api"; // Import your standardized request interface
import { ContactInfo } from "@/interfaces/dashboardInterface";
import { headers } from "next/headers";
// Assuming ApiResponse is exported from api.ts

// Define the expected structure of the blog data (optional, depending on your API response)

// Function to get blogs from the API
export const getContactus = async (token: string): Promise<any> => {
  const url = `${dashboardBaseServerUrl}${serverUrls.contactus}`;
  const method = "GET";
  try {
    const response = await apiRequest<ContactInfo[]>(
      url, // The API endpoint to get blogs
      method,
      {
        headers: { Authorization: `Bearer ${token}` },
      } // HTTP method
    );

    return response; // Return just the data from the API response
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
