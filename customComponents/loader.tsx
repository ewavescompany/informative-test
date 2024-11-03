import React from "react";
import { LoaderCircle } from "lucide-react";
function Loader({ size }: { size: number }) {
  return <LoaderCircle className="animate-spin" size={size} />;
}

export default Loader;
