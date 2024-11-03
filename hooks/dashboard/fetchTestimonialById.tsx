import { useState, useEffect } from "react";

import { Testimonial } from "@/interfaces/dashboardInterface";
import { fetchTestimonialById } from "@/requests/admin/testimonial";

export const useFetchTestimonial = (id: string | number) => {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTestimonialById(id);
        setTestimonial(data.data); // Adjust if the API response has different structure
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { testimonial, loading, error };
};
