import { useState, useEffect } from "react";
import { fetchTestimonials } from "@/requests/generic/fetchTestimonials";
import { Testimonial } from "@/interfaces/dashboardInterface";

export const useFetchTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading state
        const data = await fetchTestimonials();
        console.log(data); // Fetch testimonials from API
        setTestimonials(data); // Assuming the response contains 'data'
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchData();
  }, []);

  return { testimonials, loading, error, setTestimonials };
};
