import { apiRequest } from "@/requests/api"; // Make sure the path to apiRequest is correct
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Ensure proper URLs

// Function to update the testimonial by ID
export const updateTestimonial = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editTestomonial}`; // Adjust based on your URL structure
  const method = "POST"; // Assuming it's a POST request for updates

  try {
    // Make the API request using the standardized ApiRequest component
    const response = await apiRequest(url, method, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token
        "Content-Type": "multipart/form-data", // Ensure correct content type
      },
    });
    return response; // Return the response data
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update the testimonial");
  }
};
