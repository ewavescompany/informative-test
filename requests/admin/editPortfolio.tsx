import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Ensure the path is correct based on your folder structure

// Function to edit the portfolio data
export const editPortfolio = async (
  formData: FormData,
  token: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.editPortfolio}`; // Your portfolio edit API endpoint
  const method = "POST"; // Use PUT or PATCH based on your API requirements

  try {
    // Use apiRequest to send the FormData for editing
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Since we're sending a file
      },
    });

    return response; // Return response data from the API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to edit portfolio"
    );
  }
};
