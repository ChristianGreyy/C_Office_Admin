import { memo } from 'react';

import { ICon } from '@interfaces';
export const Search = memo((props: ICon) => (
  <svg
    width={props.width || '24'}
    height={props.height || '24'}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
      stroke={props.color || '#fff'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.2667 19.2667L15 15"
      stroke={props.color || '#C6CBCC'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
