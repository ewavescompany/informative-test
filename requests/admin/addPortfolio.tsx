import { adminServerUrls, dashboardBaseServerUrl } from "@/constants/urls";
import { apiRequest } from "../api"; // Ensure the path is correct based on your folder structure

// Function to submit the portfolio data
export const submitPortfolio = async (
  formData: FormData,
  token: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const url = `${dashboardBaseServerUrl}${adminServerUrls.addPortfolio}`; // Your portfolio API endpoint
  const method = "POST";

  try {
    // Use apiRequest to send the FormData
    const response = await apiRequest(url, method, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Since we're sending a file
      },
    });

    return response; // Return response data from the API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("-----------------------------", error);
    throw new Error(
      error.response?.data?.message || "Failed to submit portfolio"
    );
  }
};
