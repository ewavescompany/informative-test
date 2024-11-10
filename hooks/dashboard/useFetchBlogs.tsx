import { useState, useEffect } from "react";
// Assuming this is your API request component
import { getBlogs } from "@/requests/generic/getBlogs";
import { BlogsState } from "@/interfaces/dashboardInterface";

const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<BlogsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs({ data: response.data });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error, setBlogs };
};

export default useFetchBlogs;
