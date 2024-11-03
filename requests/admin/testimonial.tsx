import { apiRequest } from "@/requests/api"; // Ensure your path to the apiRequest function is correct
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";

// Function to fetch a testimonial by ID
export const fetchTestimonialById = async (id: string | number) => {
  const url = `${clientBaseServerUrl}${serverUrls.getTestimonialById}/${id}`;
  const method = "GET";
  try {
    const response = await apiRequest(url, method);
    console.log(response);
    return response?.data; // Return the testimonial data
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch the testimonial");
  }
};
