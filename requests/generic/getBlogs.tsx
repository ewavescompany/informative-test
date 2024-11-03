// requests/blogs.ts

import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { apiRequest } from "../api"; // Import your standardized request interface
import { blogsInterface } from "@/interfaces/clientInterface";
// Assuming ApiResponse is exported from api.ts

// Define the expected structure of the blog data (optional, depending on your API response)

// Function to get blogs from the API
export const getBlogs = async (): Promise<any> => {
  const url = `${clientBaseServerUrl}${serverUrls.blogs}`;
  const method = "GET";
  try {
    const response = await apiRequest<blogsInterface[]>(
      url, // The API endpoint to get blogs
      method // HTTP method
    );

    return response.data; // Return just the data from the API response
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
