import { ICon } from '@interfaces';
import * as React from 'react';
export const TickBox = (props: ICon) => {
  const { width, height, size = 16, color = '#9e9e9e' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      icon-name="check-square"
      data-lucide="check-square"
      className="lucide lucide-check-square"
      {...props}
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
};
