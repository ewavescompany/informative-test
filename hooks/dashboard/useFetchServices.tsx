// hooks/useFetchServices.ts
import { useEffect, useState } from "react";
import { getServices } from "@/requests/generic/getServices";
import { serviceState } from "@/interfaces/dashboardInterface";

export const useFetchServices = () => {
  const [services, setServices] = useState<serviceState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getServices();
        setServices(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, loading, error, setServices };
};
