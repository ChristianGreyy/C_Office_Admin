import { memo } from 'react';

import { ICon } from '@interfaces';

export const IConArrowDown = memo(() => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.1133 7.5L10.1133 12.5L5.11328 7.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const IConArrowLeft = memo((props: ICon) => {
  const { color = '#2C2C2C', onClick } = props;
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M9.11328 17L1.11328 9L9.11328 1"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const IConArrowRight = memo((props: ICon) => {
  const { color = '#2C2C2C', onClick } = props;
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M1.11328 1L9.11328 9L1.11328 17"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
