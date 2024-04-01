import { ICon } from '@interfaces';

export const IconClock = (props: ICon) => {
  const { width = 55, height = 55 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_9_1026)">
        <path
          d="M27.748 45.3036C36.4257 45.3036 43.4604 38.269 43.4604 29.5913C43.4604 20.9136 36.4257 13.8789 27.748 13.8789C19.0703 13.8789 12.0356 20.9136 12.0356 29.5913C12.0356 38.269 19.0703 45.3036 27.748 45.3036Z"
          stroke="#2C2C2C"
          strokeWidth="2.35685"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.75 22.8594V29.5932H32.2392"
          stroke="#2C2C2C"
          strokeWidth="2.35685"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5253 9.3916L10.3525 13.8808"
          stroke="#2C2C2C"
          strokeWidth="2.35685"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38.9712 9.3916L45.1439 13.8808"
          stroke="#2C2C2C"
          strokeWidth="2.35685"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_1026">
          <rect
            width="53.871"
            height="53.871"
            fill="white"
            transform="translate(0.816406 0.410156)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
