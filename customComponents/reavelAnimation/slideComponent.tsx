"use client";
import React, { ReactNode } from "react";
import { Slide } from "react-awesome-reveal";

// Define the component with children and direction props
function SlideComponent({
  children,
  dir = "left",
  duration,
  className,
  cascade = false, // Default value is false
  triggerOnce = true, // Default direction to "left"
  delay,
}: {
  children: ReactNode;
  dir?: "left" | "right" | "up" | "down";
  className?: string; // Explicitly define the valid directions
  cascade?: boolean;
  triggerOnce?: boolean;
  duration?: number;
  delay?: number;
}) {
  return (
    <Slide
      duration={duration}
      delay={delay}
      className={className}
      direction={dir}
      cascade={cascade}
      triggerOnce={triggerOnce}
    >
      {children}
    </Slide>
  );
}

export default SlideComponent;
