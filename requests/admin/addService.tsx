import { apiRequest } from "@/requests/api"; // Ensure correct path
import { dashboardBaseServerUrl, adminServerUrls } from "@/constants/urls";

// Function to submit the service data
export const submitService = async (formData: FormData, token: string) => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.addService}`; // Your service API endpoint
  const method = "POST";

  try {
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Assuming token is needed
      },
    });

    return response.data; // Return response data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to submit service"
    );
  }
};
