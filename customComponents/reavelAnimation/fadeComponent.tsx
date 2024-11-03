"use client";
import React, { ReactNode } from "react";
import { Fade } from "react-awesome-reveal";

// Define the component with children, className, cascade, and triggerOnce props
function FadeComponent({
  children,
  className,
  cascade = false, // Default value is false
  triggerOnce = false, // Default value is false
}: {
  children: ReactNode;
  className?: string;
  cascade?: boolean;
  triggerOnce?: boolean;
}) {
  return (
    <Fade className={className} cascade={cascade} triggerOnce={triggerOnce}>
      {children}
    </Fade>
  );
}

export default FadeComponent;
