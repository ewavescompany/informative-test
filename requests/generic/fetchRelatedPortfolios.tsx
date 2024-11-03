import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";
import { Portfolio } from "@/interfaces/dashboardInterface";

interface ApiResponse<T> {
  data: T;
}

export const fetchRelatedPortfolios = async (
  id: string
): Promise<Portfolio[] | undefined> => {
  const url = `${clientBaseServerUrl}${serverUrls.relatedPortfolios}/${id}`;

  try {
    const response = await apiRequest<ApiResponse<Portfolio[]>>(url, "GET");

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
