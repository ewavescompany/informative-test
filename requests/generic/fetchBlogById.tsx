import { apiRequest } from "@/requests/api";
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";

export const fetchBlogById = async (id: string) => {
  const url = `${clientBaseServerUrl}${serverUrls.blogById}/${id}`;

  try {
    const response = await apiRequest(url, "GET");
    
    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch blog");
  }
}; 