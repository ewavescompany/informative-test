import { apiRequest } from "@/requests/api"; // Import the apiRequest function
import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls"; // Adjust based on your constants

// Function to add a new testimonial
export const addTestimonial = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.addTestomonial}`; // API endpoint for adding a testimonial

  try {
    const response = await apiRequest(url, "POST", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header if needed
        "Content-Type": "multipart/form-data", // For file upload
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to add testimonial");
  }
};
