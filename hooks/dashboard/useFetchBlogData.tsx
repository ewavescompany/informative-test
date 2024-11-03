import { useEffect, useState } from "react";
import { apiRequest } from "@/requests/api"; // Assuming you have an apiRequest component
import { clientBaseServerUrl, serverUrls } from "@/constants/urls";

const useFetchBlogData = (blogId: number, language: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogData, setBlogData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await apiRequest(
          `${clientBaseServerUrl}${serverUrls.blog}/${blogId}`,
          "GET"
        );

        setBlogData(response?.data?.data);
      } catch (err) {
        setError("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, language]);

  return { blogData, loading, error };
};

export default useFetchBlogData;
