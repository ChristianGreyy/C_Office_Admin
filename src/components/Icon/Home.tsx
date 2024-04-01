import { ICon } from '@interfaces';

export const IconHome = (props: ICon) => {
  const { width = 78, height = 78 } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="39" cy="39" r="39" fill="#726FE7" />
      <g clip-path="url(#clip0_1227_4019)">
        <path
          d="M22.6932 38.3399H17.8457L39.6593 16.5264L61.4728 38.3399H56.6254"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.6943 38.3396V55.3057C22.6943 56.5913 23.205 57.8243 24.1141 58.7334C25.0232 59.6424 26.2562 60.1532 27.5418 60.1532H51.7791C53.0647 60.1532 54.2977 59.6424 55.2067 58.7334C56.1158 57.8243 56.6265 56.5913 56.6265 55.3057V38.3396"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.3877 60.1535V45.6111C32.3877 44.3255 32.8984 43.0925 33.8075 42.1835C34.7166 41.2744 35.9495 40.7637 37.2352 40.7637H42.0826C43.3682 40.7637 44.6012 41.2744 45.5103 42.1835C46.4194 43.0925 46.9301 44.3255 46.9301 45.6111V60.1535"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1227_4019">
          <rect
            width="58.1695"
            height="58.1695"
            fill="white"
            transform="translate(10.5752 9.25488)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
