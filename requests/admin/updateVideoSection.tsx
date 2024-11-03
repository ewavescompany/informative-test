import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "@/requests/api"; // Adjust the path based on your setup

export const editVideoSection = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editVideoSection}`; // Adjust the endpoint
  try {
    const response = await apiRequest(url, "POST", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Since we are sending files
        Authorization: `Bearer ${token}`, // Include token in the request header for authentication
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to manage home page", error);
    throw error;
  }
};
