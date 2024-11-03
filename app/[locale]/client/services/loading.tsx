import PageLoader from "@/customComponents/pageLoader";
import React from "react";

function loading() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  );
}

export default loading;
