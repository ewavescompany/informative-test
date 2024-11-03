import { apiRequest } from "@/requests/api"; // Assuming the apiRequest function is correctly set up
import { clientBaseServerUrl, serverUrls } from "@/constants/urls"; // Adjust the URLs based on your setup

// Function to fetch all testimonials
export const fetchTestimonials = async () => {
  const url = `${clientBaseServerUrl}${serverUrls.testimonials}`;
  const method = "GET";
  try {
    // Use apiRequest to send the GET request
    const response = await apiRequest(url, method);

    // Return the response data (assuming API response contains 'data')
    return response?.data?.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch testimonials");
  }
};
