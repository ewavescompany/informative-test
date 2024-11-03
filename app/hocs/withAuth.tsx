import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/customComponents/loader";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const locale = Cookies.get("NEXT_LOCALE") || "en";

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient) {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          window.location.href = `/${locale}/admin/login`;
        } else {
          setLoading(false);
        }
      }
    }, [isClient, locale]);

    if (loading) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <Loader size={24} />
          <span className="text-2xl font-medium">Authenticating...</span>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
