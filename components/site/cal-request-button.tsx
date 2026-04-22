"use client";

import React from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "bellujrb-usebido/15min";

type CalRequestButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CalRequestButton = React.forwardRef<HTMLButtonElement, CalRequestButtonProps>(
  ({ onClick, children, ...props }, ref) => {
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const cal = await getCalApi();
      cal("modal", { calLink: CAL_LINK });
    };

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);

CalRequestButton.displayName = "CalRequestButton";
