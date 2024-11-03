// requests/portfolio.ts
import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { Portfolio } from "@/interfaces/dashboardInterface";

// Define the expected structure of the API response
interface ApiResponse<T> {
  data: T;
}

// Function to fetch portfolio by ID
export const fetchPortfolioById = async (
  id: string
): Promise<Portfolio | undefined> => {
  const url = `${clientBaseServerUrl}${serverUrls.portfolioById}/${id}`;

  try {
    // Specify that the response contains a Portfolio object inside a `data` field
    const response = await apiRequest<ApiResponse<Portfolio>>(url, "GET");

    // Return the Portfolio object from the `data` field
    return response?.data?.data; // Adjust to return only the Portfolio object
  } catch (error) {
    console.log(error); // Log the error for debugging

    // Return undefined if there's an error
    return undefined;
  }
};
